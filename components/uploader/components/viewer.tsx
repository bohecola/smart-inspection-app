import type { ImageSource } from 'react-native-image-viewing/dist/@types'
import type { FilePreviewType, UploaderFileListItem } from '../types'
import CryptoJS from 'crypto-js'
import { useRouter } from 'expo-router'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { ImagePreview } from '@/components/image-preview'
import { encryptBase64 } from '@/utils/security'
import { useGlobSettings } from '@/utils/settings'
import { getFilePreviewType } from '../helper'

export interface ViewerRef {
  open: (options: OpenOptions) => void
  close: () => void
}

interface ViewerProps {
  images?: ImageSource[]
}

interface OpenOptions {
  item: UploaderFileListItem
}

export const Viewer = forwardRef<ViewerRef, ViewerProps>((props, ref) => {
  // 路由
  const router = useRouter()
  // 预览地址
  const { previewUrl } = useGlobSettings()
  // 图片列表
  const { images } = props
  // 是否显示
  const [visible, setVisible] = useState(false)
  // 文件预览类型
  const [type, setType] = useState<FilePreviewType>(undefined)
  // 配置项
  const [openOptions, setOpenOptions] = useState<OpenOptions>({
    item: undefined,
  })

  // 打开
  const open = (options: OpenOptions) => {
    // 配置
    setOpenOptions(options)
    // 文件项
    const { item } = options
    // 设置文件类型
    const previewType = getFilePreviewType(item.ext)
    setType(previewType)

    // 图片、视频预览
    if (previewType === 'image' || previewType === 'video') {
      return setVisible(true)
    }

    // 文档、压缩文件、其他预览
    const uri = `${previewUrl}?url=${encodeURIComponent(encryptBase64(CryptoJS.enc.Utf8.parse(item.url)))}&t=${Date.now()}`
    router.push({
      pathname: `/web-screen/[uri]`,
      params: {
        uri,
        title: item.fileName,
      },
    })
  }

  // 关闭
  const close = () => setVisible(false)

  // 内容渲染
  const renderContent = () => {
    if (type === 'image') {
      return (
        <ImagePreview
          images={images}
          imageIndex={images.findIndex((e: any) => e.uri === openOptions.item?.url)}
          visible={visible}
          onRequestClose={close}
        />
      )
    }

    return null
  }

  // API
  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  return (
    visible
      ? (
          <View>
            {renderContent()}
          </View>
        )
      : null
  )
})
