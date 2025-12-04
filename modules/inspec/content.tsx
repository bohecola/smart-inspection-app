import type { LinearGradientBoxVariant } from './components/LinearGradientBox'
import type { PatorlTaskContentVO } from '@/api/ptms/task/patorlTask/types'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { isEmpty, toLower } from 'lodash-es'
import { Search } from 'lucide-react-native'
import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { getContentByContentName } from '@/api/ptms/task/patorlTask'
import { Empty } from '@/components/empty'
import { MyInput } from '@/components/input'
import { Card } from '@/components/ui/card'
import { Grid, GridItem } from '@/components/ui/grid'
import { Text } from '@/components/ui/text'
import { LinearGradientBox } from './components/LinearGradientBox'

export default function InspecRecordContent() {
  const router = useRouter()
  const { id, contentName } = useLocalSearchParams() as Record<string, string>
  const legends: { label: string, variant: LinearGradientBoxVariant }[] = [
    { label: '未开始', variant: 'red' },
    { label: '进行中', variant: 'blue' },
    { label: '已完成', variant: 'green' },
  ]

  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<PatorlTaskContentVO[]>([])
  const [searchList, setSearchList] = useState<PatorlTaskContentVO[]>([])

  // 获取数据
  async function fetchData() {
    setLoading(true)
    const { data } = await getContentByContentName({
      taskId: id,
      contentName,
    })
    setList(data)
    setSearchList(data)
    setLoading(false)
  }

  // 搜索结果
  const searchResult = useMemo(() => {
    if (isEmpty(keyword)) {
      return list
    }
    return list.filter((item) => {
      return toLower(item.objectName).includes(toLower(keyword))
    })
  }, [list, keyword])

  // 搜索框编辑后点击完成
  function onSubmitEditing() {
    setSearchList(searchResult)
  }

  // 点击 item
  function handleItemPress(item: PatorlTaskContentVO) {
    switch (item.status) {
      case '0':
        router.push(`/inspec/${id}/${contentName}/add-record?contentId=${item.id}&parentObjectName=${encodeURIComponent(item.objectName)}`)
        break
      case '1':
        router.push(`/inspec/${id}/${contentName}/edit-record?contentId=${item.id}&parentObjectName=${encodeURIComponent(item.objectName)}`)
        break
      case '2':
        router.push(`/inspec/${id}/${contentName}/view-record?contentId=${item.id}&parentObjectName=${encodeURIComponent(item.objectName)}`)
        break
      default:
        break
    }
  }

  // 获取数据
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [contentName]),
  )

  return (
    <View className="p-4 flex-1 bg-background-50 pb-safe">
      {/* 图例 */}
      <Card className="gap-3">
        <View className="flex-row justify-around">
          {legends.map((legend, index) => (
            <View
              key={index}
              className="flex-row items-center gap-2"
            >
              <LinearGradientBox
                variant={legend.variant}
                className="w-4 h-4"
              />
              <Text className="text-sm text-typography-500">{legend.label}</Text>
            </View>
          ))}
        </View>

        <MyInput
          className="bg-background-50 border-0"
          variant="rounded"
          size="sm"
          prefixIcon={Search}
          placeholder="请输入"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={onSubmitEditing}
        />
      </Card>

      {loading
        ? <ActivityIndicator className="mt-3" />
        : (
            <ScrollView>
              <Card className="mt-3 flex-row flex-wrap">
                {!isEmpty(searchList)
                  ? (
                      <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
                        {searchList.map(item => (
                          <GridItem key={item.objectId} _extra={{ className: 'col-span-1' }}>
                            <LinearGradientBox
                              className="p-4 items-center justify-center"
                              variant={
                                item.status === '1'
                                  ? 'blue'
                                  : item.status === '2'
                                    ? 'green'
                                    : 'red'
                              }
                              onPress={() => handleItemPress(item)}
                            >
                              <Text className="text-center font-bold">
                                {item.objectName}
                              </Text>
                            </LinearGradientBox>
                          </GridItem>
                        ))}
                      </Grid>
                    )
                  : <Empty />}
              </Card>
            </ScrollView>
          )}
    </View>
  )
}
