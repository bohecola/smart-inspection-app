import type { DataPatorlTaskInfoVO, PatorlTaskContentVO } from '@/api/ptms/task/patorlTask/types'
import type { TabMenu } from '@/components/tabs'
import dayjs from 'dayjs'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { getPatorlTaskInfo } from '@/api/ptms/task/patorlTask'
import { Empty } from '@/components/empty'
import { TabsMenu } from '@/components/tabs'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'
import { ContentItem } from './components/ContentItem'

export default function InspecDetail() {
  const router = useRouter()

  const { id } = useLocalSearchParams() as Record<string, string>

  const [tabs, setTabs] = useState<TabMenu<string>[]>([
    { title: '未开始', name: 'not-started', data: '0', badge: 0, badgeClassName: 'bg-red-500' },
    { title: '进行中', name: 'in-progress', data: '1', badge: 0, badgeClassName: 'bg-blue-500' },
    { title: '已完成', name: 'completed', data: '2', badge: 0, badgeClassName: 'bg-green-500' },
  ])

  const [currentTab, setCurrentTab] = useState<TabMenu<string>>(tabs[0])

  const [detail, setDetail] = useState<DataPatorlTaskInfoVO>(null)
  const [loading, setLoading] = useState(false)

  const currentList = useMemo(() => {
    return detail?.taskContentList?.filter(item => item.status === currentTab.data) ?? []
  }, [detail, currentTab])

  // 获取任务详情
  async function fetchData(id: string) {
    setLoading(true)
    const { data } = await getPatorlTaskInfo(id)

    const contentList = data.taskContentList ?? []
    const notStartList = contentList.filter(item => item.status === '0')
    const inProgressList = contentList.filter(item => item.status === '1')
    const completedList = contentList.filter(item => item.status === '2')

    setTabs([
      { title: '未开始', name: 'not-started', data: '0', badge: notStartList.length, badgeClassName: 'bg-red-500' },
      { title: '进行中', name: 'in-progress', data: '1', badge: inProgressList.length, badgeClassName: 'bg-blue-500' },
      { title: '已完成', name: 'completed', data: '2', badge: completedList.length, badgeClassName: 'bg-green-500' },
    ])

    setDetail(data)
    setLoading(false)
  }

  // Tab 切换
  const onTabChange = (item: TabMenu, _: number) => {
    setCurrentTab(item)
  }

  // 任务执行记录点击
  function handleItemPress(Item: PatorlTaskContentVO) {
    router.push(`/inspec/${id}/${Item.name}`)
  }

  // 获取任务详情
  useFocusEffect(
    useCallback(() => {
      fetchData(id)
    }, [id]),
  )

  return (
    <View className="p-4 flex-1 bg-background-50 pb-safe">
      {loading
        ? <ActivityIndicator />
        : (
            <View className="flex-1 gap-2">
              <Card className="shadow-hard-1 gap-4">
                <Text className="text-xl font-bold ">{detail?.psname ?? detail?.deptName}</Text>
                <Text>{detail?.name}</Text>
                <View className="flex-row justify-between items-baseline">
                  <Text className="font-bold">
                    {`${detail?.year} 年`}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="border px-1 text-sm text-cyan-500 border-cyan-500">始</Text>
                    <Text>{dayjs(detail?.planStartDate).format('YYYY-MM-DD')}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="border px-1 text-sm text-teal-500 border-teal-500">终</Text>
                    <Text>{dayjs(detail?.planEndDate).format('YYYY-MM-DD')}</Text>
                  </View>
                </View>
                <View className="flex-row">
                  <Text className="text-sm">
                    备注：
                    {detail?.remark}
                  </Text>
                </View>
              </Card>

              <TabsMenu tabs={tabs} onTabChange={onTabChange} />

              <FlatList
                data={currentList}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <Divider className="bg-outline-100" />}
                renderItem={({ item }) => (
                  <ContentItem item={item} onPress={handleItemPress} />
                )}
                ListEmptyComponent={<Empty className="mt-10" />}
              />
            </View>
          )}
    </View>
  )
}
