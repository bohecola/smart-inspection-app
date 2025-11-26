import type { PatorlTaskVO } from '@/api/ptms/task/patorlTask/types'
import type { Variant } from '@/components/tag'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { View } from 'react-native'
import { LinearGradientTag } from '@/components/tag'
import { Card } from '@/components/ui/card'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { selectDictLabel } from '@/utils'

export function Item({ item, product_task_state }: { item: PatorlTaskVO, product_task_state: DictDataOption[] }) {
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

  function handleItemPress(item: PatorlTaskVO) {
    router.push(`/inspec/${item.id}`)
  }

  return (
    <Pressable onPress={() => handleItemPress(item)}>
      {({ pressed }) => (
        <Card className={`flex-row gap-1 w-full ${pressed ? 'bg-background-100' : ''}`}>
          <View className="flex-[3]">
            <Text>{item.name}</Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <LinearGradientTag variant={variant}>
              {selectDictLabel(product_task_state, item.status)}
            </LinearGradientTag>
          </View>
        </Card>
      )}
    </Pressable>
  )
}
