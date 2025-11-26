import type { ProductTaskVO } from '@/api/ptms/task/productTask/types'
import dayjs from 'dayjs'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { debounce } from 'lodash-es'
import { PlusIcon } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { getProductTaskInfo } from '@/api/ptms/task/productTask'
import { Empty } from '@/components/empty'
import { LinearGradientTag } from '@/components/tag'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { selectDictLabel, useDict } from '@/utils'

export default function ProdDetail() {
  const router = useRouter()

  const { id } = useLocalSearchParams() as Record<string, string>

  const { product_task_cycel } = useDict('product_task_cycel')

  const [detail, setDetail] = useState<ProductTaskVO>(null)
  const [loading, setLoading] = useState(false)

  async function fetchData(id: string) {
    setLoading(true)
    const { data } = await getProductTaskInfo(id)

    setDetail(data)
    setLoading(false)
  }

  const handleHeaderRightPress = debounce(() => {
    router.push(`/prod/${id}/add-record`)
  }, 300)

  useEffect(() => {
    fetchData(id)
  }, [])

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

      <View className="p-2 flex-1 bg-background-50 pb-safe">
        {loading
          ? <ActivityIndicator />
          : (
              <View className="gap-2">
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

                    <Text className="ml-auto py-1 px-2 bg-blue-500/20 text-blue-500 text-sm">
                      {selectDictLabel(product_task_cycel, detail?.cycel)}
                    </Text>
                  </View>
                </Card>

                <Text className="my-1 pl-2 text-typography-600">任务执行记录</Text>

                <FlatList
                  data={detail?.taskRecordList}
                  keyExtractor={item => item.id}
                  className="gap-2"
                  ListEmptyComponent={<Empty />}
                  renderItem={({ item }) => (
                    <Pressable>
                      {({ pressed }) => (
                        <Card className={`shadow-hard-1 gap-5 ${pressed ? 'bg-background-100' : ''}`}>
                          <View className="flex-row gap-3 items-baseline">
                            <Text>{item.operator}</Text>

                            <Text className="font-bold">{dayjs(item.operateDate).format('YYYY-MM-DD')}</Text>

                            <LinearGradientTag
                              variant={item.status === '0' ? 'blue' : 'green'}
                              className="ml-auto"
                            >
                              {item.status === '0' ? '进行中' : '已完成'}
                            </LinearGradientTag>
                          </View>
                        </Card>
                      )}
                    </Pressable>
                  )}
                />
              </View>
            )}
      </View>
    </>
  )
}
