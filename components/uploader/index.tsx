import type { ViewerRef } from './components/viewer'
import type { UploadAsset, UploaderFileListItem, UploaderProps, UploaderRef } from './types'
import { getDocumentAsync } from 'expo-document-picker'
import { getThumbnailAsync } from 'expo-video-thumbnails'
import { isArray, isNil } from 'lodash-es'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { upload } from '@/api/comm'
import { delOss, listByIds } from '@/api/system/oss'
import { getFilenameExt } from '@/utils'
import { useAppToast } from '../toast'
import { HelperText } from './components/helper-text'
import { UploaderPreview } from './components/preview'
import { UploadButton } from './components/upload-button'
import { Viewer } from './components/viewer'
import { allTypeEnum, getValue, isImageType, isVideoType } from './helper'

export const Uploader = forwardRef<UploaderRef, UploaderProps>((props, ref) => {
  const {
    value,
    valueType = 'string',
    multiple = true,
    limit = 10,
    fileType = allTypeEnum,
    mimeType = '*/*',
    auto = true,
    showTip = false,
    showUploadButton = true,
    onChange,
    onFileListChange,
    onSelectFiles,
  } = props

  // 提示
  const toast = useAppToast()

  // 文件列表
  const [fileList, setFileList] = useState<UploaderFileListItem[]>([])

  // 通知更新
  useEffect(() => {
    const value = getValue(fileList, valueType)
    onChange?.(value)
    onFileListChange?.(fileList)
  }, [fileList])

  // 图片列表
  const images = useMemo(() => {
    return fileList
      .filter(item => isImageType(item.ext))
      .map(item => ({ uri: item.url }))
  }, [fileList])

  // 文件预览器
  const viewerRef = useRef<ViewerRef>(null)

  // 选择文件
  async function handleSelectFiles() {
    // 打开文件管理器选择文件
    const { assets, canceled } = await getDocumentAsync({
      type: mimeType,
      multiple,
    })

    // 取消选择
    if (canceled) {
      return
    }

    // 数量校验
    const isOverLimit = assets.length + fileList.length > limit
    if (isOverLimit) {
      return toast.warning(`最多上传 ${limit} 个文件`)
    }

    // 文件类型校验
    const isTypeError = assets.some(e => !fileType.includes(getFilenameExt(e.name) as any))
    if (isTypeError) {
      return toast.warning(`请上传 ${fileType.join('、')} 等格式文件`)
    }

    // 选择文件回调
    onSelectFiles?.(assets)

    // 上传文件
    if (auto) {
      await handleUploadFile(assets)
    }
  }

  // 上传文件
  async function handleUploadFile(assets: UploadAsset[]) {
    // 转换文件列表
    const newFiles = assets.map(item => ({
      fileName: item.name,
      url: item.uri,
      ossId: undefined,
      status: 'uploading',
      message: '上传中...',
      deletable: true,
      ext: getFilenameExt(item.name),
    } as UploaderFileListItem))

    // 更新文件状态
    setFileList(prevList => [...prevList, ...newFiles])

    // 上传文件
    for (const item of assets) {
      // 查找要更新状态的文件对象
      const fileItem = newFiles.find(e => e.url === item.uri)

      // 文件对象不存在 => 跳过
      if (!fileItem) {
        continue
      }

      // 创建 FormData 对象
      const formData = new FormData()

      // 添加文件到 FormData 对象
      formData.append('file', {
        uri: item.uri,
        name: item.name,
        type: item.mimeType,
      } as unknown as Blob)

      try {
        // 上传文件
        const { data } = await upload(formData)

        // 缩略图地址
        let thumbnailUrl: string

        // 获取视频缩略图
        if (isVideoType(fileItem.ext)) {
          const { uri } = await getThumbnailAsync(item.uri, { time: 0 })
          thumbnailUrl = uri
        }

        // 成功 => 更新文件状态
        setFileList((prevList) => {
          const newList = prevList.map((e) => {
            // 找到要更新状态的文件对象
            if (e.url === fileItem.url) {
              // 更新文件状态
              return {
                ...e,
                url: data.url,
                ossId: data.ossId,
                fileName: data.fileName,
                status: 'done' as const,
                message: '',
                thumbnailUrl,
              }
            }
            return e
          })
          return newList
        })
      }
      catch (error) {
        // 失败 => 更新文件状态
        setFileList((prevList) => {
          const newList = prevList.map((e) => {
            // 找到要更新状态的文件对象
            if (e.url === fileItem.url) {
              // 更新文件状态
              return {
                ...e,
                status: 'failed' as const,
                message: '上传失败',
              }
            }
            return e
          })
          return newList
        })
        toast.error(`文件 ${fileItem.fileName} 上传失败，请您重新上传`)
        console.error('Upload File Failed', error)
      }
    }
  }

  // 删除文件
  async function handleDeleteFile(item: UploaderFileListItem, index: number) {
    try {
      // 移除文件
      setFileList(prev => prev.filter((_, i) => i !== index))

      item.ossId
        // OSS 删除
        ? await delOss(item.ossId).then(() => toast.success('文件删除成功'))
        // 仅本地删除
        : toast.info('文件移除成功')
    }
    catch (error) {
      setFileList((prev) => {
        // 删除失败 => 恢复文件
        prev.splice(index, 0, item)
        const newList = [...prev]
        return newList
      })
      toast.error('文件删除失败')
      console.log('Delete File Failed', error)
    }
  }

  // 预览文件
  function handlePreviewFile(item: UploaderFileListItem) {
    if (item.status === 'uploading' || item.status === 'failed') {
      return
    }

    // 打开预览器
    viewerRef.current?.open({ item })
  }

  // 回显
  async function view() {
    if (isNil(value) || value === '') {
      return
    }

    const ids = isArray(value) ? value.join(',') : value
    const { data } = await listByIds(ids)
    const list: UploaderFileListItem[] = []

    for (const e of data) {
      const ext = getFilenameExt(e.originalName)

      let thumbnailUrl: string

      if (isVideoType(ext)) {
        const { uri } = await getThumbnailAsync(e.url, { time: 0 })
        thumbnailUrl = uri
      }

      list.push({
        fileName: e.originalName,
        url: e.url,
        ossId: e.ossId,
        status: 'done',
        message: '',
        deletable: true,
        ext,
        thumbnailUrl,
      })
    }

    setFileList(list)
  }

  // 回显
  useEffect(() => {
    view()
  }, [])

  // 暴露方法
  useImperativeHandle(ref, () => ({
    uploadFile: (assets: UploadAsset[]) => handleUploadFile(assets),
  }))

  return (
    <View>
      {/* 文件列表 */}
      <View className="flex-row flex-wrap">
        {fileList.map((item, index) => (
          <UploaderPreview
            key={item.ossId ?? item.url}
            item={item}
            onDelete={() => handleDeleteFile(item, index)}
            onPress={() => handlePreviewFile(item)}
          />
        ))}
      </View>

      {/* 上传按钮 */}
      {showUploadButton && <UploadButton onPress={handleSelectFiles} />}

      {/* 提示信息 */}
      {showTip && <HelperText fileType={fileType} />}

      {/* 文件预览器 */}
      <Viewer ref={viewerRef} images={images} />
    </View>
  )
},
)
