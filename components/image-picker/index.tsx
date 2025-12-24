import type { ImagePickerAsset, MediaType } from 'expo-image-picker'
import type { UploaderFileListItem, UploaderRef } from '@/components/uploader/types'
import { useFormControlContext } from '@gluestack-ui/core/form-control/creator'
import dayjs from 'dayjs'
import { launchCameraAsync } from 'expo-image-picker'
import { isNil } from 'lodash-es'
import { CameraIcon, FileUp, ImageIcon, VideoIcon } from 'lucide-react-native'
import { useRef, useState } from 'react'
import { View } from 'react-native'
import { useAppToast } from '@/components/toast'
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetIcon, ActionsheetItem, ActionsheetItemText } from '@/components/ui/actionsheet'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { Uploader } from '@/components/uploader'
import { alertToSettings, useLoading } from '@/hooks'
import { cn } from '@/utils'
import { getLocationAsync, requestLocationPermission } from '@/utils/locationService'
import { queryCameraPermission, toUploadAsset } from './helper'

export interface ImagePickerProps {
  value?: string
  valueType?: 'string' | 'array'
  limit?: number
  autoUpload?: boolean
  isDisabled?: boolean
  autoLocation?: boolean
  allowFileSelect?: boolean
  onTakeMediaSuccess?: (value: ImagePickerAsset[]) => void
  onChange?: (value: string | string[]) => void
}

export function ImagePicker(props: ImagePickerProps) {
  const { isDisabled: isFormControlDisabled, isInvalid } = useFormControlContext()

  const { showLoading, hideLoading } = useLoading()

  const {
    value,
    limit = 10,
    autoUpload = false,
    valueType = 'string',
    isDisabled = isFormControlDisabled,
    autoLocation = false,
    allowFileSelect = false,
    onTakeMediaSuccess,
    onChange,
  } = props

  // 上传器
  const uploaderRef = useRef<UploaderRef>(null)

  // 提示
  const toast = useAppToast()

  // 是否显示操作栏
  const [showActionsheet, setShowActionsheet] = useState(false)

  // 文件列表
  const [uploadFileList, setUploadFileList] = useState<UploaderFileListItem[]>([])

  // 关闭弹窗
  function handleClose() {
    setShowActionsheet(false)
  }

  // 上传器文件列表改变事件
  function onUploaderFileListChange(value: UploaderFileListItem[]) {
    setUploadFileList(value)
  }

  // 拍摄照片
  async function handleTakeMedia(mediaType: MediaType) {
    // 查询相机权限
    const hasPermission = await queryCameraPermission()

    // 未授权
    if (!hasPermission) {
      return handleClose()
    }

    // 打开相机
    const { assets, canceled } = await launchCameraAsync({
      mediaTypes: mediaType,
      aspect: [1, 1],
      quality: 0.5,
      exif: true,
    })

    // 取消拍摄
    if (canceled) {
      return handleClose()
    }

    // 数量校验
    if (assets.length + uploadFileList.length > limit) {
      handleClose()
      return toast.warning(`最多拍摄上传 ${limit} 个文件`)
    }

    // 定位
    if (autoLocation) {
      // 请求定位权限
      const hasLocationPermission = await requestLocationPermission()

      if (!hasLocationPermission) {
        return alertToSettings('位置')
      }
    }

    // 拍摄成功回调
    onTakeMediaSuccess?.(assets)

    // 关闭弹窗
    handleClose()

    // 自动上传
    if (autoUpload) {
      const [image] = assets
      const uploadAsset = toUploadAsset(image)

      // 上传文件时传递定位数据
      if (autoLocation) {
        showLoading('获取定位中...')
        const { coords } = await getLocationAsync()

        if (isNil(coords)) {
          hideLoading()
          return toast.show('定位获取失败，请重新拍摄上传')
        }

        const fileDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const fileLng = coords.longitude
        const fileLat = coords.latitude
        const extra = { fileDate, fileLng, fileLat }
        hideLoading()
        return uploaderRef.current?.uploadFile([uploadAsset], extra)
      }

      // 上传文件
      uploaderRef.current?.uploadFile([uploadAsset])
    }
  }

  // 拍摄照片
  const handleTakePhoto = () => handleTakeMedia('images')

  // 拍摄视频
  const handleTakeVideo = () => handleTakeMedia('videos')

  // 选择文件
  const handleSelectFile = async () => {
    uploaderRef.current?.selectFiles({
      success: handleClose,
    })
  }

  // 文件上传 Change 事件
  function onUploaderChange(value: string | string[]) {
    onChange?.(value)
  }

  return (
    <>
      {autoUpload
        ? (
            <Uploader
              ref={uploaderRef}
              value={value}
              showUploadButton={false}
              showTip={false}
              valueType={valueType}
              isDisabled={isDisabled}
              onChange={onUploaderChange}
              onFileListChange={onUploaderFileListChange}
            />
          )
        : null}

      <View className="w-20 h-20">
        <Pressable disabled={isDisabled} onPress={() => setShowActionsheet(true)}>
          {({ pressed }) => (
            <View className={cn(
              'w-full h-full border rounded border-outline-200 items-center justify-center',
              pressed ? 'bg-outline-100' : '',
              isDisabled ? 'bg-outline-50' : '',
              isInvalid ? 'border-error-700' : '',
            )}
            >
              <Icon as={CameraIcon} size="xl" className="text-outline-400 stroke-[1.5px]" />
              <Text className="text-xs text-outline-400 mt-1">拍摄上传</Text>
              <Text className="text-xs text-outline-400 mt-1">
                (
                {uploadFileList.length}
                /
                {limit}
                )
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleTakePhoto}>
            <ActionsheetIcon className="stroke-background-700" as={ImageIcon} />
            <ActionsheetItemText>拍摄照片</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleTakeVideo}>
            <ActionsheetIcon className="stroke-background-700" as={VideoIcon} />
            <ActionsheetItemText>拍摄视频</ActionsheetItemText>
          </ActionsheetItem>
          {allowFileSelect
            ? (
                <ActionsheetItem onPress={handleSelectFile}>
                  <ActionsheetIcon className="stroke-background-700" as={FileUp} />
                  <ActionsheetItemText>选择文件</ActionsheetItemText>
                </ActionsheetItem>
              )
            : null}
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}
