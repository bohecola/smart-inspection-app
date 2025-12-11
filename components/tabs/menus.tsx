import { forwardRef, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { cn } from '@/utils'
import { TabMenuItem, TabMenuRoundedItem } from './item'

export interface TabMenu<T = any> {
  title: string
  name: string
  data?: T
  badge?: number | string
  badgeClassName?: string
}

export interface TabsMenuProps {
  tabs: TabMenu[]
  initialTab?: number
  className?: string
  isRoundedItem?: boolean
  onTabChange: (item: TabMenu, index: number) => void
}

export interface TabsMenuRef {
  setActiveTab: (tab: TabMenu) => void
}

// 标签菜单
export const TabsMenu = forwardRef<TabsMenuRef, TabsMenuProps>(({ tabs, initialTab = 0, className, isRoundedItem = false, onTabChange }, ref) => {
  const [activeTab, setActiveTab] = useState(tabs[initialTab]?.name)

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
    <View className={cn('flex-row items-center h-12 bg-background-0', isRoundedItem ? 'justify-around' : '', className)}>
      {tabs.map((tab, index) => (
        isRoundedItem
          ? (
              <TabMenuRoundedItem
                key={index}
                data={tab}
                isActive={activeTab === tab.name}
                onPress={() => onTabMenuPress(tab, index)}
              />
            )
          : (
              <TabMenuItem
                key={index}
                data={tab}
                isActive={activeTab === tab.name}
                onPress={() => onTabMenuPress(tab, index)}
              />
            )
      ))}
    </View>
  )
})
