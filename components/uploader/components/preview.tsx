import type { FilePreviewRendererProps, UploaderPreviewProps } from '../types'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { CircleX, PlayIcon, XIcon } from 'lucide-react-native'
import { View } from 'react-native'
import { Icon } from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { Pressable } from '@/components/ui/pressable'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'
import { useUploaderContext } from '../context'
import { getFilePreviewType } from '../helper'

// 文件预览渲染器
function FilePreviewRenderer({ item, type }: FilePreviewRendererProps) {
  // 根据文件类型渲染文件预览
  switch (type) {
    // 图片文件
    case 'image':
      return (
        <Image
          className="w-full h-full"
          source={item.url}
          alt={item.fileName}
        />
      )
    // 视频文件
    case 'video':
      return (
        <>
          <Image
            className="w-full h-full"
            source={item.thumbnailUrl}
            alt={item.fileName}
          />
          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 w-8 h-8 bg-black/80 rounded-full items-center justify-center">
            <Icon as={PlayIcon} size="xs" className="text-white" />
          </View>
        </>
      )
    // Word文件
    case 'word':
      return (
        <AntDesign name="file-word" size={24} color="blue" />
      )
    // Excel文件
    case 'excel':
      return (
        <AntDesign name="file-excel" size={24} color="green" />
      )
    // PPT文件
    case 'ppt':
      return (
        <AntDesign name="file-ppt" size={24} color="red" />
      )
    // PDF文件
    case 'pdf':
      return (
        <AntDesign name="file-pdf" size={24} color="purple" />
      )
    // 文本文件
    case 'text':
      return (
        <AntDesign name="file-text" size={24} color="gray" />
      )
    // 压缩文件
    case 'compressed':
      return (
        <MaterialCommunityIcons name="zip-box-outline" size={24} color="gray" />
      )
    // 其他文件
    case 'other':
      return (
        <AntDesign name="file-unknown" size={24} color="gray" />
      )
  }
}

// 文件预览组件
export function UploaderPreview(props: UploaderPreviewProps) {
  const { isDisabled } = useUploaderContext()

  const { item, onPress, onDelete } = props

  // 获取文件预览类型
  const filePreviewType = getFilePreviewType(item.ext)

  return (
    <Pressable onPress={onPress}>
      <View className="relative w-20 h-20 mr-2 mb-2 items-center justify-center bg-background-100">
        {/* 文件预览缩略 */}
        <FilePreviewRenderer
          type={filePreviewType}
          item={item}
        />

        {/* 文件名 */}
        {filePreviewType !== 'image' && (
          <Text
            className="absolute bottom-0 p-1 w-full text-center text-xs text-white bg-black/80"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {decodeURIComponent(item.fileName)}
          </Text>
        )}

        {/* 文件上传状态 */}
        {['uploading', 'failed'].includes(item.status) && (
          <View className="absolute top-0 right-0 w-full h-full items-center justify-center gap-1 bg-gray-700/90">
            {item.status === 'uploading' && <Spinner size="small" color="gray" />}
            {item.status === 'failed' && <Icon as={CircleX} size="md" className="text-white stroke-1" />}
            <Text
              className="text-white text-xs"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.message}
            </Text>
          </View>
        )}

        {/* 删除按钮 */}
        {item.status !== 'uploading' && item.deletable && !isDisabled && (
          <Pressable
            className="absolute top-0 right-0 p-1 w-5 h-5 bg-black/80 items-center justify-center"
            onPress={onDelete}
          >
            <Icon as={XIcon} size="xs" className="text-white" />
          </Pressable>
        )}
      </View>
    </Pressable>
  )
}
