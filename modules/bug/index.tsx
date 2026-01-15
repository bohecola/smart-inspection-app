import type { BugInfoVO } from '@/api/ptms/bug/bugInfo/types'
import { useInfiniteScroll } from 'ahooks'
import { Stack, useRouter } from 'expo-router'
import { PlusIcon, Search } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { listBug } from '@/api/ptms/bug/bugInfo'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { MyRefreshControl } from '@/components/refresh-control'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { useUserStore } from '@/store/user'
import { useDict, useEventBus } from '@/utils'
import { Item } from './components/item'

interface Data { list: BugInfoVO[], total: number }

export default function Bug() {
  // 路由
  const router = useRouter()
  // 电站id
  const { psId } = useUserStore()
  // 字典数据
  const { bug_state } = useDict('bug_state')
  // 关键词
  const [keyword, setKeyword] = useState<string>(undefined)
  // 每页条数
  const PAGE_SIZE = 15
  // 列表数据
  const { data, loading, loadingMore, noMore, error, loadMore, reload } = useInfiniteScroll<Data>(async (d) => {
    const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
    const { rows, total } = await listBug({
      psId,
      keyword,
      pageNum: page,
      pageSize: PAGE_SIZE,
    })
    return {
      list: rows,
      total,
    }
  }, {
    manual: true,
    isNoMore: d => d && d.list.length >= d.total,
  })
  // 关键词 Change
  function onChangeText(text: string) {
    setKeyword(text)
  }
  // 关键词 Submit
  function onSubmitEditing() {
    reload()
  }
  // 新增
  function handleHeaderRightPress() {
    router.push('/bug/add')
  }
  // 点击缺陷项
  function handleItemPress(item: BugInfoVO) {
    router.push(`/bug/${item.id}/handle`)
  }
  // 列表刷新
  useEventBus('bug:list:refresh', () => {
    reload()
  })

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={handleHeaderRightPress}>
              <Icon size="xl" as={PlusIcon} />
            </Pressable>
          ),
        }}
      />

      <View className="flex-1 bg-background-50 pb-safe">
        <View className="px-4 py-2 bg-background-0">
          <MyInput
            prefixIcon={Search}
            returnKeyType="done"
            variant="rounded"
            placeholder="请输入"
            value={keyword}
            onChangeText={onChangeText}
            isDisabled={loading || loadingMore}
            onSubmitEditing={onSubmitEditing}
          />
        </View>

        <FlatList
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          className="p-4"
          data={data?.list}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <Item
              item={item}
              bug_state={bug_state}
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
    </>
  )
}
