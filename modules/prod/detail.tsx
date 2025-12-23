import type { ProductTaskRecordVO, ProductTaskVO } from '@/api/ptms/task/productTask/types'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { isNil } from 'lodash-es'
import { ListCheck, PlusIcon } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { dealDoneTask, getProductTaskInfo } from '@/api/ptms/task/productTask'
import { MyActivityIndicator } from '@/components/activity-indicator'
import { useDialog } from '@/components/dialog'
import { Empty } from '@/components/empty'
import { Separator } from '@/components/list'
import { LinearGradientTag } from '@/components/tag'
import { useAppToast } from '@/components/toast'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { useLoading } from '@/hooks'
import { eventBus, selectDictLabel, useDict, useEventBus } from '@/utils'

export default function ProdDetail() {
  const router = useRouter()
  const toast = useAppToast()
  const { id } = useLocalSearchParams() as Record<string, string>
  const { showLoading, hideLoading } = useLoading()
  const { showConfirmDialog } = useDialog()
  const { product_task_cycel } = useDict('product_task_cycel')
  const [detail, setDetail] = useState<ProductTaskVO>(null)

  // 获取数据
  const { loading, refresh } = useRequest(() => getProductTaskInfo(id), {
    onSuccess: ({ data }) => {
      setDetail(data)
    },
  })

  // 新增
  function handleHeaderRightPress() {
    if (isNil(detail)) {
      return toast.show('获取任务详情失败')
    }

    // 逐月
    if (detail.cycel === '0') {
      const isAlreadyExistMonthRecord = detail.taskRecordList?.length > 0
      if (isAlreadyExistMonthRecord) {
        return toast.warning('逐月执行周期下，本月已有记录')
      }
    }

    // 逐日
    if (detail.cycel === '1') {
      const currentDate = dayjs().format('YYYY-MM-DD')
      const isAlreadyExistTodayRecord = detail.taskRecordList?.some((item) => {
        const operateDate = dayjs(item.operateDate).format('YYYY-MM-DD')
        return operateDate === currentDate
      })

      if (isAlreadyExistTodayRecord) {
        return toast.warning('逐日执行周期下，今日已有记录')
      }
    }

    router.push(`/prod/${id}/add-record`)
  }

  // 任务执行记录点击
  function handleRecordPress(item: ProductTaskRecordVO) {
    // 已提交（查看）
    if (item.status === '1') {
      return router.push(`/prod/${id}/view-record?recordId=${item.id}`)
    }
    // 已保存（进行中）
    if (item.status === '0') {
      return router.push(`/prod/${id}/edit-record?recordId=${item.id}`)
    }
  }

  // 完成任务
  async function handleCompletePress() {
    if (isNil(detail)) {
      return toast.show('获取任务详情失败')
    }
    // 逐月不提交
    if (detail.cycel === '0') {
      return
    }
    // 存在未提交记录
    const hasUnsubmitted = detail.taskRecordList?.some(item => item.status === '0')
    if (hasUnsubmitted) {
      return toast.warning('当前任务下存在未提交的执行记录')
    }
    // 提示用户确认
    await showConfirmDialog({ description: '确认要完成该任务吗？' })
      .then(async () => {
        showLoading('正在提交数据...')
        const { msg } = await dealDoneTask(detail.id)
        toast.success(msg)
        // 通知列表刷新
        eventBus.emit('prod:list:refresh')
        // 返回列表页
        router.back()
      })
      .catch(() => {})
      .finally(hideLoading)
  }

  // 详情刷新
  useEventBus('prod:detail:refresh', () => {
    refresh()
    // 通知列表刷新
    eventBus.emit('prod:list:refresh')
  })

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable disabled={loading} onPress={handleHeaderRightPress}>
              <Icon size="xl" as={PlusIcon} />
            </Pressable>
          ),
        }}
      />

      <View className="p-4 flex-1 bg-background-50 pb-safe">
        {loading
          ? <MyActivityIndicator />
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
                    <Text className="ml-auto py-1 px-2 bg-blue-500/20 text-blue-500 text-sm">
                      {selectDictLabel(product_task_cycel, detail?.cycel)}
                    </Text>
                  </View>

                  {detail?.cycel === '1' && detail?.status === '2' && (
                    <View className="flex-row justify-end">
                      <Button
                        action="positive"
                        className="rounded-full"
                        onPress={handleCompletePress}
                      >
                        <ButtonIcon className="text-white" as={ListCheck} />
                        <ButtonText className="text-white">完成</ButtonText>
                      </Button>
                    </View>
                  )}

                </Card>

                <Text className="my-1 pl-2 text-typography-600">任务执行记录</Text>

                <FlatList
                  data={detail?.taskRecordList}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={Separator}
                  ListEmptyComponent={<Empty />}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => handleRecordPress(item)}>
                      {({ pressed }) => (
                        <Card className={`shadow-hard-1 gap-5 ${pressed ? 'bg-background-100' : ''}`}>
                          <View className="flex-row gap-3 items-baseline">
                            <Text>{item.operator}</Text>

                            <Text className="font-bold">{dayjs(item.operateDate).format('YYYY-MM-DD')}</Text>

                            <LinearGradientTag
                              variant={item.status === '0' ? 'blue' : 'green'}
                              className="ml-auto"
                            >
                              <Text className="text-white">
                                {item.status === '0' ? '进行中' : '已完成'}
                              </Text>
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
