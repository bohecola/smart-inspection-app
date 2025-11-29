import type { ImagePickerAsset } from 'expo-image-picker'
import type { UploaderFileListItem, UploaderRef } from '@/components/uploader/types'
import { launchCameraAsync } from 'expo-image-picker'
import { CameraIcon, ImageIcon, VideoIcon } from 'lucide-react-native'
import { useRef, useState } from 'react'
import { View } from 'react-native'
import { useAppToast } from '@/components/toast'
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetIcon, ActionsheetItem, ActionsheetItemText } from '@/components/ui/actionsheet'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { Uploader } from '@/components/uploader'
import { cn } from '@/utils'
import { queryCameraPermission, toUploadAsset } from './helper'

export interface ImagePickerProps {
  value?: string
  valueType?: 'string' | 'array'
  limit?: number
  autoUpload?: boolean
  onTakeMediaSuccess?: (value: ImagePickerAsset[]) => void
  onChange?: (value: string | string[]) => void
}

export function ImagePicker(props: ImagePickerProps) {
  const {
    value,
    limit = 10,
    autoUpload = false,
    valueType = 'string',
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
  async function handleTakePhoto() {
    // 查询相机权限
    const hasPermission = await queryCameraPermission()

    // 未授权
    if (!hasPermission) {
      return handleClose()
    }

    // 打开相机
    const { assets, canceled } = await launchCameraAsync({
      mediaTypes: 'images',
      aspect: [1, 1],
      quality: 1,
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

    // 拍摄成功回调
    onTakeMediaSuccess?.(assets)

    // 关闭弹窗
    handleClose()

    // 自动上传
    if (autoUpload) {
      const [image] = assets
      const uploadAsset = toUploadAsset(image)
      uploaderRef.current?.uploadFile([uploadAsset])
    }
  }

  // 拍摄视频
  async function handleTakeVideo() {
    // 查询相机权限
    const hasPermission = await queryCameraPermission()

    // 未授权
    if (!hasPermission) {
      return handleClose()
    }

    // 打开相机
    const { assets, canceled } = await launchCameraAsync({
      mediaTypes: 'videos',
      quality: 1,
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

    // 拍摄成功回调
    onTakeMediaSuccess?.(assets)

    // 关闭弹窗
    handleClose()

    // 自动上传
    if (autoUpload) {
      const [video] = assets
      const uploadAsset = toUploadAsset(video)
      uploaderRef.current?.uploadFile([uploadAsset])
    }
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
              onChange={onUploaderChange}
              onFileListChange={onUploaderFileListChange}
            />
          )
        : null}

      <Pressable onPress={() => setShowActionsheet(true)}>
        {({ pressed }) => (
          <View className={cn(
            'w-20 h-20 border rounded border-outline-200 items-center justify-center',
            pressed ? 'bg-outline-100' : '',
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
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}
