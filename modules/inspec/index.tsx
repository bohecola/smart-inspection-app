import type { PatorlTaskVO } from '@/api/ptms/task/patorlTask/types'
import type { TabMenu } from '@/components/tabs'
import { useInfiniteScroll } from 'ahooks'
import { useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
import { useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { listPatorlTask } from '@/api/ptms/task/patorlTask'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { MyRefreshControl } from '@/components/refresh-control'
import { TabsMenu } from '@/components/tabs'
import { useDict, useEventBus } from '@/utils'
import { Item } from './components/Item'

// 数据类型
interface Data {
  list: PatorlTaskVO[]
  total: number
}

// Tab 列表
const tabs: TabMenu<string>[] = [
  { title: '可执行', name: 'can-execute', data: '0' },
  { title: '待执行', name: 'pending-execute', data: '1' },
  { title: '已完成', name: 'completed', data: '2' },
]

export default function Inspec() {
  // FlatList 引用
  const flatListRef = useRef<FlatList<PatorlTaskVO>>(null)
  // 路由
  const router = useRouter()
  // 字典数据
  const { product_task_state } = useDict('product_task_state')
  // 查询参数
  const [query, setQuery] = useState({
    keyword: undefined,
    padStatus: tabs[0].data,
  })
  // 每页条数
  const PAGE_SIZE = 15
  // 取消请求
  const abortController = useRef<AbortController>(null)
  // 列表数据
  const { data, loading, loadingMore, noMore, error, loadMore, reload } = useInfiniteScroll<Data>(async (d) => {
    abortController.current = new AbortController()
    const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
    const { rows, total } = await listPatorlTask({ ...query, pageNum: page, pageSize: PAGE_SIZE }, { signal: abortController.current.signal })
    return {
      list: rows,
      total,
    }
  }, {
    manual: true,
    reloadDeps: [query.padStatus],
    isNoMore: d => d && d.list.length >= d.total,
    onBefore: () => {
      abortController.current?.abort()
      abortController.current = new AbortController()
    },
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
  const handleItemPress = (item: PatorlTaskVO) => {
    router.push(`/inspec/${item.id}`)
  }

  // 列表刷新
  useEventBus('inspec:list:refresh', () => {
    // 回到顶部
    goToTop()
    // 刷新
    reload()
  })

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
          isDisabled={loading || loadingMore}
          onSubmitEditing={onSubmitEditing}
        />
      </View>

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
          <MyRefreshControl
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
