import type { ProductTaskVO } from '@/api/ptms/task/productTask/types'
import type { TabMenu } from '@/components/tabs'
import { useInfiniteScroll } from 'ahooks'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { listProductTask } from '@/api/ptms/task/productTask'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { TabsMenu } from '@/components/tabs'
import { Divider } from '@/components/ui/divider'
import { useDict } from '@/utils'
import { Item } from './components/Item'

// 数据类型
interface Data {
  list: ProductTaskVO[]
  total: number
}

// Tab 列表
const tabs: TabMenu<string>[] = [
  { title: '可执行', name: 'can-execute', data: '0' },
  { title: '待执行', name: 'pending-execute', data: '1' },
  { title: '已完成', name: 'completed', data: '2' },
]

export default function Prod() {
  const router = useRouter()
  // 路由参数
  const { refreshSignal } = useLocalSearchParams() as Record<string, string>
  // FlatList 引用
  const flatListRef = useRef<FlatList<ProductTaskVO>>(null)
  // 字典数据
  const { product_task_state } = useDict('product_task_state')
  // 查询参数
  const [query, setQuery] = useState({
    planType: '0',
    taskType: '0',
    keyword: undefined,
    padStatus: tabs[0].data,
  })
  // 每页条数
  const PAGE_SIZE = 15
  // 列表数据
  const { data, loading, loadingMore, noMore, error, loadMore, reload } = useInfiniteScroll<Data>(async (d) => {
    const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
    const { rows, total } = await listProductTask({ ...query, pageNum: page, pageSize: PAGE_SIZE })
    return {
      list: rows,
      total,
    }
  }, {
    manual: true,
    reloadDeps: [query.padStatus],
    isNoMore: d => d && d.list.length >= d.total,
  })
  // 回到顶部
  const goToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }
  // Tab 切换
  const onTabChange = (item: TabMenu, _: number) => {
    // 设置查询参数
    setQuery({ ...query, padStatus: item.data })
  }
  // 关键词 Change
  const onChangeText = (text: string) => {
    setQuery({ ...query, keyword: text })
  }
  // 关键词 Submit
  const onSubmitEditing = () => {
    reload()
  }
  // 点击任务项
  const handleItemPress = (item: ProductTaskVO) => {
    router.push(`/prod/${item.id}`)
  }
  // 刷新
  useEffect(() => {
    // 检查是否有刷新信号
    if (refreshSignal === 'true') {
      // 回到顶部
      goToTop()
      // 刷新
      reload()
      // 清除参数
      router.setParams({ refreshSignal: undefined })
    }
  }, [refreshSignal])

  useEffect(() => {
    console.log(!!error)
  }, [error])
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
          isDisabled={loadingMore}
          onSubmitEditing={onSubmitEditing}
        />
      </View>

      <Divider />

      <TabsMenu tabs={tabs} onTabChange={onTabChange} />

      <FlatList
        ref={flatListRef}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        className="p-4"
        data={data?.list}
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
            refreshing={loading}
            onRefresh={reload}
          />
        )}
        ListFooterComponent={(
          <ListFooterComponent
            loading={loadingMore}
            error={!!error}
            hasMore={!noMore}
            load={loadMore}
          />
        )}
      />
    </View>
  )
}
