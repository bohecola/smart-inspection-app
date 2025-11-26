import { View } from 'react-native'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'

interface Props {
  text?: string
}

export function Empty({ text = '暂无数据' }: Props) {
  const emptyImage = require('@/assets/images/custom-empty-image.png')

  return (
    <View className="flex-1 items-center justify-center">
      <Image source={emptyImage} className="w-24 h-24 object-contain" alt="暂无数据图片" />
      <Text className="mt-3 text-typography-500">{text}</Text>
    </View>
  )
}
