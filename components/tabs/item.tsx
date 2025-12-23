import type { GestureResponderEvent } from 'react-native'
import type { TabMenu } from './menus'
import { isNil } from 'lodash-es'
import { View } from 'react-native'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'

export interface TabMenuItemProps {
  data: TabMenu
  isActive: boolean
  onPress: (event: GestureResponderEvent) => void
}

// 标签项
export function TabMenuItem({ data, isActive, onPress }: TabMenuItemProps) {
  return (
    <Pressable
      className="flex-1"
      onPress={onPress}
    >
      <View className="h-full flex-row items-center justify-center gap-1 relative">
        <Text className={cn(
          isActive
            ? 'font-bold text-typography-700'
            : 'text-typography-500',
        )}
        >
          {data.title}
        </Text>

        {!isNil(data.badge) && (
          <View className={cn(
            'rounded-full w-4 h-4 items-center justify-center',
            data.badgeClassName,
          )}
          >
            <Text className="text-white text-xs">{data.badge}</Text>
          </View>
        )}

        {isActive && (
          <View className={cn(
            'absolute bottom-0 h-1 rounded-full bg-primary-600',
            isNil(data.badge)
              ? 'w-2/5'
              : 'w-1/2',
          )}
          />
        )}
      </View>

    </Pressable>
  )
}

// 标签项
export function TabMenuRoundedItem({ data, isActive, onPress }: TabMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
    >
      <View className={cn(
        'py-2 px-3 flex-row items-center justify-center gap-1 border rounded-full',
        isActive
          ? 'border-primary-500 '
          : 'border-outline-200',
      )}
      >
        <Text className={cn(
          'text-sm',
          isActive
            ? 'text-primary-500'
            : 'text-typography-500',
        )}
        >
          {data.title}
        </Text>

        {!isNil(data.badge) && (
          <View className={cn(
            'rounded-full w-4 h-4 items-center justify-center',
            data.badgeClassName,
          )}
          >
            <Text className="text-white text-xs">{data.badge}</Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}
