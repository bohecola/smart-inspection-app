import type { BugInfoVO } from '@/api/ptms/bug/bugInfo/types'
import type { Variant } from '@/components/tag'
import { useMemo } from 'react'
import { View } from 'react-native'
import { LinearGradientTag } from '@/components/tag'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn, selectDictLabel } from '@/utils'

interface Props {
  item: BugInfoVO
  bug_state: DictDataOption[]
  onPress: (item: BugInfoVO) => void
}

export function Item({ item, bug_state, onPress }: Props) {
  const variant = useMemo<Variant>(() => {
    switch (item.status) {
      case '0':
        return 'red'
      case '1':
        return 'blue'
      case '2':
        return 'orange'
      case '3':
        return 'purple'
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
          <View className="flex-[3] flex-row items-center justify-between gap-2">
            <Text>{`【${item.devName ?? item.bugAddr}】${item.description}`}</Text>
          </View>
          {item.opinions && <Text className="px-1 border text-red-500 border-red-500">驳</Text>}
          <View className="flex-1 justify-center items-center">
            <LinearGradientTag variant={variant}>
              <Text className="text-white">
                {selectDictLabel(bug_state, item.status)}
              </Text>
            </LinearGradientTag>
          </View>
        </View>
      )}
    </Pressable>
  )
}
