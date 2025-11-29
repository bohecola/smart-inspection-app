import { View } from 'react-native'
import { CloseIcon, Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'

interface ImageViewHeaderProps {
  imageIndex?: number
  totalCount?: number
  onClosePress?: () => void
}

export default function ImageViewHeader(props: ImageViewHeaderProps) {
  const { imageIndex, totalCount, onClosePress } = props

  return (
    <View className="relative pt-safe h-24 items-center justify-between">

      <View className="flex-1 items-center justify-center flex-row">
        <Text>{imageIndex + 1}</Text>
        <Text>/</Text>
        <Text>{totalCount}</Text>
      </View>

      <Pressable
        className="absolute right-3 bottom-6 translate-y-1/2 p-1 w-8 h-8 bg-gray-700/80 rounded-full items-center justify-center"
        onPress={onClosePress}
      >
        <Icon
          as={CloseIcon}
          size="md"
          className="text-typography-400"
        />
      </Pressable>
    </View>

  )
}
