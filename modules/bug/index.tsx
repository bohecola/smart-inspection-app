import type { BugInfoVO, BugQuery } from '@/api/ptms/bug/bugInfo/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Stack, useRouter } from 'expo-router'
import { PlusIcon, Search } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { listBug } from '@/api/ptms/bug/bugInfo'
import { MyInput } from '@/components/input'
import { ListFooterComponent, Separator } from '@/components/list'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { useDict } from '@/utils'
import { Item } from './components/item'

export default function Bug() {
  // 路由
  const router = useRouter()
  // 字典数据
  const { bug_state } = useDict('bug_state')
  // 查询参数
  const [query, setQuery] = useState<BugQuery>({
    pageSize: 15,
    keyword: undefined,
  })
  // 列表查询
  const { data, isLoading, isRefetching, isError, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['bug'],
    queryFn: async ({ pageParam = 1 }) => {
      const { rows, total } = await listBug({ ...query, pageNum: pageParam })
      return { rows, total, currentPage: pageParam }
    },
    getNextPageParam: (lastPage) => {
      const { total, currentPage } = lastPage
      // 总页数
      const totalPages = Math.ceil(total / query.pageSize)
      // 下一页
      const nextPage = currentPage + 1
      // 如果下一页小于等于总页数，则返回下一页
      if (nextPage <= totalPages) {
        return nextPage
      }
      // 否则返回有更多页了
      return undefined
    },
    initialPageParam: 1,
  })

  const list = useMemo(() => {
    return data?.pages.flatMap(page => page.rows) ?? []
  }, [data])

  function handleHeaderRightPress() {
    router.push('/bug/add')
  }

  function onChangeText(text: string) {
    setQuery({ ...query, keyword: text })
  }

  function onSubmitEditing() {
    refetch()
  }

  function handleItemPress(item: BugInfoVO) {
    console.log('item', item)
  }

  async function onLoad() {
    return fetchNextPage()
  }

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
            value={query.keyword}
            onChangeText={onChangeText}
            isDisabled={isLoading}
            onSubmitEditing={onSubmitEditing}
          />
        </View>

        <FlatList
          onEndReached={onLoad}
          onEndReachedThreshold={0.2}
          className="p-4"
          data={list}
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
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          )}
          ListFooterComponent={(
            <ListFooterComponent
              loading={isLoading}
              error={isError}
              hasMore={hasNextPage}
              load={onLoad}
            />
          )}
        />
      </View>
    </>
  )
}
