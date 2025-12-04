import type { TextInputSubmitEditingEvent } from 'react-native'
import type { ProductTaskQuery, ProductTaskVO } from '@/api/ptms/task/productTask/types'
import type { TabMenu } from '@/components/tabs'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { listProductTask } from '@/api/ptms/task/productTask'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { TabsMenu } from '@/components/tabs'
import { Divider } from '@/components/ui/divider'
import { useList } from '@/hooks/list'
import { useDict } from '@/utils'
import { Item } from './components/Item'

export default function Prod() {
  const router = useRouter()
  const params = useLocalSearchParams()
  // Tab 列表
  const tabs: TabMenu<string>[] = [
    { title: '可执行', name: 'can-execute', data: '0' },
    { title: '待执行', name: 'pending-execute', data: '1' },
    { title: '已完成', name: 'completed', data: '2' },
  ]

  // 当前 Tab
  const [currentTab, setCurrentTab] = useState(tabs[0])

  // FlatList 引用
  const flatListRef = useRef<FlatList<ProductTaskVO>>(null)

  // 字典数据
  const { product_task_state } = useDict('product_task_state')

  // 初始查询参数
  const initialQuery: ProductTaskQuery = {
    pageSize: 15,
    pageNum: 1,
    planType: '0',
    taskType: '0',
    keyword: undefined,
    padStatus: currentTab.data,
  }

  // 列表
  const { query, data, loading, refreshing, hasMore, error, loadMore, reload, onRefresh, setQuery } = useList<ProductTaskVO, ProductTaskQuery>({
    initialQuery,
    request: listProductTask,
  })

  // Tab 切换
  const onTabChange = (item: TabMenu, _: number) => {
    // 设置当前标签
    setCurrentTab(item)
    // 设置查询参数
    setQuery({ ...query, padStatus: item.data })
  }

  // 搜索框编辑后点击完成
  const onSubmitEditing = (e: TextInputSubmitEditingEvent) => {
    reload()
  }

  const onChangeText = (text: string) => {
    setQuery({ ...query, keyword: text })
  }

  const onLoad = () => loadMore()

  const handleItemPress = (item: ProductTaskVO) => {
    router.push(`/prod/${item.id}`)
  }

  // 监听状态变化
  useEffect(() => {
    reload()
  }, [query.keyword, query.padStatus])

  useEffect(() => {
    // 检查是否有刷新信号
    if (params.refreshSignal === 'true') {
      // 回到顶部
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
      // 刷新
      onRefresh()
      // 清除参数
      router.setParams({ refreshSignal: undefined })
    }
  }, [params.refreshSignal])

  return (
    <View className="flex-1 bg-background-50 pb-safe">
      <View className="px-4 py-2 bg-background-0">
        <MyInput
          prefixIcon={Search}
          returnKeyType="done"
          variant="rounded"
          placeholder="请输入工作计划/工作任务/任务类别"
          value={query.keyword}
          onChangeText={onChangeText}
          isDisabled={loading || refreshing}
          onSubmitEditing={onSubmitEditing}
        />
      </View>

      <Divider />

      <TabsMenu tabs={tabs} onTabChange={onTabChange} />

      <FlatList
        ref={flatListRef}
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
