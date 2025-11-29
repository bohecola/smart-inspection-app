import type { ImageSource } from 'react-native-image-viewing/dist/@types'
import type { FilePreviewType, UploaderFileListItem } from '../types'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { ImagePreview } from '@/components/image-preview'
import { useAppToast } from '@/components/toast'
import { getFilePreviewType } from '../helper'

interface ViewerProps {
  images?: ImageSource[]
}

export interface ViewerRef {
  open: (options: OpenOptions) => void
  close: () => void
}

interface OpenOptions {
  item: UploaderFileListItem
}

export const Viewer = forwardRef<ViewerRef, ViewerProps>((props, ref) => {
  const { images } = props

  // 提示
  const toast = useAppToast()

  // 是否显示
  const [visible, setVisible] = useState(false)

  // 文件预览类型
  const [type, setType] = useState<FilePreviewType>(undefined)

  // 打开选项
  const [openOptions, setOpenOptions] = useState<OpenOptions>({
    item: undefined,
  })

  // 打开
  function open(options: OpenOptions) {
    const { item } = options

    // 获取文件预览类型
    const previewType = getFilePreviewType(item.ext)

    if (previewType !== 'image') {
      return toast.info(`预览功能正在开发中~`)
    }

    setType(previewType)
    // 设置打开选项
    setOpenOptions(options)
    // 设置显示
    setVisible(true)
  }

  // 关闭
  function close() {
    setVisible(false)
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
            {type === 'image'
              ? (
                  <ImagePreview
                    images={images}
                    imageIndex={images.findIndex((e: any) => e.uri === openOptions.item?.url)}
                    visible={visible}
                    onRequestClose={close}
                  />
                )
              : null}
          </View>
        )
      : null
  )
})
