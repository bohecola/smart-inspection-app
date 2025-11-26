import type { PatorlTaskQuery, PatorlTaskVO } from '@/api/ptms/task/patorlTask/types'
import type { TabMenu } from '@/components/tabs'
import { Search } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { listPatorlTask } from '@/api/ptms/task/patorlTask'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { TabsMenu } from '@/components/tabs'
import { useList } from '@/hooks/list'
import { useDict } from '@/utils'
import { Item } from './components/item'

export default function Inspec() {
  // Tab 列表
  const tabs: TabMenu<string>[] = [
    { title: '可执行', name: 'can-execute', data: '0' },
    { title: '待执行', name: 'pending-execute', data: '1' },
    { title: '已完成', name: 'completed', data: '2' },
  ]

  // 当前 Tab
  const [currentTab, setCurrentTab] = useState(tabs[0])

  // 字典数据
  const { product_task_state } = useDict('product_task_state')

  // 初始查询参数
  const initialQuery: PatorlTaskQuery = {
    pageSize: 10,
    pageNum: 1,
    keyword: undefined,
    padStatus: currentTab.data,
  }

  // 列表
  const { query, data, loading, refreshing, hasMore, error, load, onRefresh, setQuery, resetListState } = useList<PatorlTaskVO, PatorlTaskQuery>({
    initialQuery,
    request: listPatorlTask,
  })

  // Tab 切换
  const onTabChange = (item: TabMenu, _: number) => {
    // 重置列表状态
    resetListState()
    // 设置当前标签
    setCurrentTab(item)
    // 设置查询参数
    setQuery({ ...query, padStatus: item.data, pageNum: 1 })
  }

  // 点击完成
  const onSubmitEditing = () => {
    resetListState()
    load()
  }

  // 监听输入变化
  const onChangeText = (text: string) => {
    setQuery({ ...query, keyword: text, pageNum: 1 })
  }

  // 监听状态变化
  useEffect(() => {
    load()
  }, [query.padStatus])

  return (
    <View className="flex-1 bg-background-50 pb-safe">
      <View className="bg-background-0 px-4 py-2 border-b border-background-200">
        <MyInput
          prefixIcon={Search}
          returnKeyType="done"
          variant="rounded"
          placeholder="请输入工作计划/工作任务"
          value={query.keyword}
          isDisabled={loading || refreshing}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </View>

      <TabsMenu tabs={tabs} onTabChange={onTabChange} />

      <FlatList
        onEndReached={load}
        onEndReachedThreshold={0.2}
        className="p-4"
        data={data}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Item
            item={item}
            product_task_state={product_task_state}
          />
        )}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
        ListFooterComponent={(
          <ListFooterComponent
            loading={loading}
            error={error}
            hasMore={hasMore}
            load={load}
          />
        )}
      />
    </View>
  )
}
