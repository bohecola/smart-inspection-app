import type { PatorlTaskQuery, PatorlTaskVO } from '@/api/ptms/task/patorlTask/types'
import type { TabMenu } from '@/components/tabs'
import { useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { listPatorlTask } from '@/api/ptms/task/patorlTask'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { TabsMenu } from '@/components/tabs'
import { useList } from '@/hooks/list'
import { useDict } from '@/utils'
import { Item } from './components/Item'

export default function Inspec() {
  const router = useRouter()

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
    pageSize: 15,
    pageNum: 1,
    keyword: undefined,
    padStatus: currentTab.data,
  }

  // 列表
  const { query, data, loading, refreshing, hasMore, error, loadMore, reload, onRefresh, setQuery } = useList<PatorlTaskVO, PatorlTaskQuery>({
    initialQuery,
    request: listPatorlTask,
  })

  // Tab 切换
  const onTabChange = (item: TabMenu, _: number) => {
    // 设置当前标签
    setCurrentTab(item)
    // 设置查询参数
    setQuery({ ...query, padStatus: item.data, pageNum: 1 })
  }

  const onChangeText = (text: string) => {
    setQuery({ ...query, keyword: text })
  }

  // 点击完成
  const onSubmitEditing = () => {
    reload()
  }

  const onLoad = () => loadMore()

  // 点击任务项
  const handleItemPress = (item: PatorlTaskVO) => {
    router.push(`/inspec/${item.id}`)
  }

  // 监听状态变化
  useEffect(() => {
    reload()
  }, [query.keyword, query.padStatus])

  return (
    <View className="flex-1 bg-background-50 pb-safe">
      <View className="bg-background-0 px-4 py-2 border-b border-background-200">
        <MyInput
          prefixIcon={Search}
          returnKeyType="done"
          variant="rounded"
          placeholder="请输入工作计划/工作任务"
          value={query.keyword}
          onChangeText={onChangeText}
          isDisabled={loading || refreshing}
          onSubmitEditing={onSubmitEditing}
        />
      </View>

      <TabsMenu tabs={tabs} onTabChange={onTabChange} />

      <FlatList
        onEndReached={onLoad}
        onEndReachedThreshold={0.2}
        className="p-4"
        data={data}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Item
            item={item}
            product_task_state={product_task_state}
            onPress={handleItemPress}
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
            load={onLoad}
          />
        )}
      />
    </View>
  )
}
