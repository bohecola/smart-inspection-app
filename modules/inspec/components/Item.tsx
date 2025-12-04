import type { PatorlTaskVO } from '@/api/ptms/task/patorlTask/types'
import type { Variant } from '@/components/tag'
import { useMemo } from 'react'
import { View } from 'react-native'
import { LinearGradientTag } from '@/components/tag'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn, selectDictLabel } from '@/utils'

interface Props {
  item: PatorlTaskVO
  product_task_state: DictDataOption[]
  onPress: (item: PatorlTaskVO) => void
}

export function Item({ item, product_task_state, onPress }: Props) {
  const variant = useMemo<Variant>(() => {
    switch (item.status) {
      case '1':
      case '2':
        return 'blue'
      case '3':
      case '4':
        return 'green'
    }
  }, [item.status])

  const handlePress = () => {
    onPress(item)
  }

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View className={cn(
          'w-full min-h-16 p-4 bg-background-0 rounded-md flex-row items-center gap-1',
          pressed ? 'bg-background-100' : '',
        )}
        >
          <View className="flex-[3]">
            <Text>{item.name}</Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <LinearGradientTag variant={variant}>
              <Text className="text-white">
                {selectDictLabel(product_task_state, item.status)}
              </Text>
            </LinearGradientTag>
          </View>
        </View>
      )}
    </Pressable>
  )
}
