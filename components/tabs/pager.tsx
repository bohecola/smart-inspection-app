import type { TabMenu } from './menus'
import React, { useRef } from 'react'
import { View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { TabsMenu } from './menus'

interface TabPagerProps {
  initialTab?: number
  tabs: TabMenu[]
  children: React.ReactNode[]
  className?: string
  onTabChange?: (item: TabMenu, index: number) => void
}

export function TabPager({ tabs, children, initialTab = 0, onTabChange, className }: TabPagerProps) {
  const pagerRef = useRef<PagerView>(null)
  const tabsMenuRef = useRef<React.ComponentRef<typeof TabsMenu>>(null)

  const onChange = (item: TabMenu, index: number) => {
    pagerRef.current?.setPage(index)
    onTabChange?.(item, index)
  }

  const onPageSelected = (e: any) => {
    const index = e.nativeEvent.position
    const currentTab = tabs[index]

    tabsMenuRef.current?.setActiveTab(currentTab)
    onTabChange?.(currentTab, index)
  }

  return (
    <View className={`flex-1 bg-background-50 ${className}`}>
      <TabsMenu
        ref={tabsMenuRef}
        tabs={tabs}
        initialTab={initialTab}
        onTabChange={onChange}
      />

      <PagerView
        ref={pagerRef}
        initialPage={initialTab}
        style={{ flex: 1 }}
        onPageSelected={onPageSelected}
      >

        {children.map((child, index) => (
          <View key={index} className="flex-1">
            {child}
          </View>
        ))}
      </PagerView>
    </View>
  )
}
