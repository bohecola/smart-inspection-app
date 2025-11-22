import type { GestureResponderEvent } from 'react-native'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '@/components/ui/text'

export interface TabMenu<T = any> {
  title: string
  name: string
  data?: T
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
      <Text className={isActive ? 'font-bold text-typography-900' : 'text-typography-500'}>
        {data.title}
      </Text>

      {isActive && (
        <View className="absolute bottom-0 w-2/5 h-1 rounded-full bg-primary-950" />
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
