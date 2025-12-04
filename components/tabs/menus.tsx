import type { GestureResponderEvent } from 'react-native'
import { isNil } from 'lodash-es'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'

export interface TabMenu<T = any> {
  title: string
  name: string
  data?: T
  badge?: number | string
  badgeClassName?: string
}

export interface TabMenuItemProps {
  data: TabMenu
  isActive: boolean
  onPress: (event: GestureResponderEvent) => void
}

export function TabMenuItem({ data, isActive, onPress }: TabMenuItemProps) {
  return (
    <Pressable
      className="flex-1 items-center justify-center relative"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-1">
        <Text className={isActive ? 'font-bold text-typography-900' : 'text-typography-500'}>
          {data.title}
        </Text>

        {!isNil(data.badge) && (
          <View className={cn('rounded-full w-4 h-4 items-center justify-center', data.badgeClassName)}>
            <Text className="text-white text-xs">{data.badge}</Text>
          </View>
        )}
      </View>

      {isActive && (
        <View className={cn('absolute bottom-0 h-1 rounded-full bg-primary-950', isNil(data.badge) ? 'w-2/5' : 'w-1/2')} />
      )}
    </Pressable>
  )
}

export interface TabsMenuProps {
  tabs: TabMenu[]
  initialTab?: number
  onTabChange: (item: TabMenu, index: number) => void
}

export interface TabsMenuRef {
  setActiveTab: (tab: TabMenu) => void
}

export const TabsMenu = forwardRef<TabsMenuRef, TabsMenuProps>(({ tabs, initialTab = 0, onTabChange }, ref) => {
  const [activeTab, setActiveTab] = useState(tabs[initialTab].name)

  const onTabMenuPress = (item: TabMenu, index: number) => {
    if (activeTab === item.name) {
      return
    }

    setActiveTab(item.name)
    onTabChange(item, index)
  }

  useImperativeHandle(ref, () => ({
    setActiveTab: (tab: TabMenu) => setActiveTab(tab.name),
  }))

  return (
    <View className="flex-row h-12 bg-background-0">
      {tabs.map((tab, index) => (
        <TabMenuItem
          key={index}
          data={tab}
          isActive={activeTab === tab.name}
          onPress={() => onTabMenuPress(tab, index)}
        />
      ))}
    </View>
  )
})
