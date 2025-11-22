import type { ColorValue } from 'react-native'
import type { ProductTaskQuery, ProductTaskVO } from '@/api/ptms/task/productTask/types'
import type { TabMenu } from '@/components/tabs'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
import { useEffect, useMemo, useState } from 'react'
import { FlatList, Pressable, RefreshControl, View } from 'react-native'
import { listProductTask } from '@/api/ptms/task/productTask'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { TabsMenu } from '@/components/tabs'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { useList } from '@/hooks/list'
import { selectDictLabel, useDict } from '@/utils'

function Item({ item, product_task_state }: { item: ProductTaskVO, product_task_state: DictDataOption[] }) {
  const router = useRouter()
  const colors = useMemo<[ColorValue, ColorValue]>(() => {
    switch (item.status) {
      case '1':
      case '2':
        return ['#1cbbb4', '#0081ff']
      case '3':
      case '4':
        return ['#8dc63f', '#39b54a']
    }
  }, [item.status])

  function handleItemPress(item: ProductTaskVO) {
    router.push(`/prod/${item.id}`)
  }

  return (
    <Pressable onPress={() => handleItemPress(item)}>
      {({ pressed }) => (
        <Card className={`flex-row gap-1 w-full ${pressed ? 'bg-background-100' : ''}`}>
          <View className="flex-[3]">
            <Text>{item.name}</Text>
          </View>
          <View className="flex-1 justify-center items-center">

            <LinearGradient style={{ borderRadius: 100 }} colors={colors} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}>
              <View className="rounded-full px-2 py-1">
                <Text className="text-white">{selectDictLabel(product_task_state, item.status)}</Text>
              </View>
            </LinearGradient>
          </View>
        </Card>
      )}
    </Pressable>
  )
}

export default function Prod() {
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
  const initialQuery: ProductTaskQuery = {
    pageSize: 10,
    pageNum: 1,
    planType: '0',
    taskType: '0',
    keyword: undefined,
    padStatus: currentTab.data,
  }

  // 列表
  const { query, data, loading, refreshing, hasMore, error, load, onRefresh, setQuery, resetListState } = useList<ProductTaskVO, ProductTaskQuery>({
    initialQuery,
    request: listProductTask,
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
          placeholder="请输入工作计划/工作任务/任务类别"
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
