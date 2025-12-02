import type { ProductTaskVO } from '@/api/ptms/task/productTask/types'
import type { Variant } from '@/components/tag'
import { useRouter } from 'expo-router'
import { debounce } from 'lodash-es'
import { useMemo } from 'react'
import { View } from 'react-native'
import { LinearGradientTag } from '@/components/tag'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn, selectDictLabel } from '@/utils'

export function Item({ item, product_task_state }: { item: ProductTaskVO, product_task_state: DictDataOption[] }) {
  const router = useRouter()
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

  const handleItemPress = debounce(() => {
    router.push(`/prod/${item.id}`)
  }, 300)

  return (
    <Pressable onPress={handleItemPress}>
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
