import type { PatorlTaskContentVO } from '@/api/ptms/task/patorlTask/types'
import { View } from 'react-native'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'

interface Props {
  item: PatorlTaskContentVO
  className?: string
  onPress: (item: PatorlTaskContentVO) => void
}

export function ContentItem({ item, className, onPress }: Props) {
  const handlePress = () => {
    onPress(item)
  }

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View className={cn('p-4 bg-background-0', className, pressed ? 'bg-background-100' : '')}>
          <Text className="font-bold">{item.name}</Text>
        </View>
      )}
    </Pressable>
  )
}
