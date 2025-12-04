import { View } from 'react-native'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'

interface Props {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Empty({ text = '暂无数据', size = 'md', className }: Props) {
  const emptyImage = require('@/assets/images/custom-empty-image.png')

  return (
    <View className={cn('flex-1 items-center justify-center', className)}>
      <Image
        source={emptyImage}
        className={cn(
          'object-contain',
          size === 'sm'
            ? 'w-16 h-16'
            : size === 'lg'
              ? 'w-32 h-32'
              : 'w-24 h-24',
        )}
        alt="暂无数据图片"
      />
      <Text className="mt-3 text-typography-500">{text}</Text>
    </View>
  )
}
