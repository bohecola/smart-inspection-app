import type { SubmitHandler } from 'react-hook-form'
import type { RecordForm } from './form'
import type { ProductTaskRecordResultVO } from '@/api/ptms/task/productTask/types'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'
import { isEmpty } from 'lodash-es'
import { CalendarIcon, UserIcon } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { getProductTaskRecordTemp } from '@/api/ptms/task/productTask'
import { MyButton } from '@/components/button'
import { Cell, CellGroup } from '@/components/cell'
import { FormItem } from '@/components/form'
import { MyInputNumber } from '@/components/input-number'
import { useAppToast } from '@/components/toast'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { useUserStore } from '@/store/user'
import CameraDeco from '../components/camera-deco'
import { recordSchema, useIsAddOrEditRoute } from './form'

export default function RecordUpsert() {
  const { id } = useLocalSearchParams() as Record<string, string>

  const { info } = useUserStore()

  const { isAdd } = useIsAddOrEditRoute()

  const { show } = useAppToast()

  const currentDate = dayjs().format('YYYY-MM-DD')

  const [loading, setLoading] = useState(false)

  const { control, formState: { errors }, register, trigger, handleSubmit } = useForm<RecordForm>({
    defaultValues: async () => {
      setLoading(true)
      const { data } = await getProductTaskRecordTemp(id)
        .finally(() => setLoading(false))

      const recordResultList = data.recordResultList.map(item => ({
        ...item,
        cameraActive: item.capture === 'Y',
      }))

      Object.assign(data, { operator: info.nickName, operateDate: currentDate, recordResultList })

      return data
    },
    resolver: zodResolver(recordSchema),
    mode: 'all',
  })

  const { fields, append, remove, update } = useFieldArray({ control, name: 'recordResultList' })

  // 提交
  const onSubmit: SubmitHandler<RecordForm> = (data) => {
    console.log('提交数据', data)
  }

  // 相机图标点击
  const onCameraPress = (item: ProductTaskRecordResultVO, index: number) => {
    if (item.capture === 'Y') {
      return show('当前任务必须进行拍摄')
    }

    update(index, { ...item, cameraActive: !item.cameraActive })
  }

  useEffect(() => {

  }, [])

  return (
    <View className="flex-1 bg-background-50 gap-2 pb-safe">
      {loading
        ? <ActivityIndicator />
        : (
            <>
              <ScrollView>
                <CellGroup inset className="py-4">
                  <Controller
                    control={control}
                    name="operator"
                    render={({ field: { value } }) => (
                      <Cell icon={UserIcon} title="执行人" value={value}></Cell>
                    )}
                  />

                  <Controller
                    control={control}
                    name="operateDate"
                    render={({ field: { value } }) => (
                      <Cell icon={CalendarIcon} title="执行日期" value={value}></Cell>
                    )}
                  />
                </CellGroup>

                <View className="px-4 gap-3">
                  {fields.map((item, index) => {
                    return (
                      <Controller
                        key={item.itemId}
                        control={control}
                        name={`recordResultList.${index}.result`}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <FormItem
                            label={`${index + 1}. ${item.description}`}
                            className=" p-4 bg-background-0 rounded-lg"
                            isInvalid={!!error}
                            errorText={error?.message}
                            labelSuffix={(
                              <CameraDeco
                                disabled={item.capture === 'Y'}
                                active={item.cameraActive}
                                onPress={() => onCameraPress(item, index)}
                              />
                            )}
                          >
                            {item.dataType === '0' && (
                              <Textarea>
                                <TextareaInput
                                  placeholder={isEmpty(item.remark) ? `请输入${item.description}` : item.remark}
                                  value={value}
                                />
                              </Textarea>
                            )}
                            {item.dataType === '1' && (
                              <MyInputNumber
                                placeholder={item.remark}
                                value={value}
                                onChangeText={onChange}

                              />
                            )}
                          </FormItem>
                        )}
                      />
                    )
                  })}
                </View>
              </ScrollView>

              <View className="mt-auto px-4 flex-row gap-2">
                <MyButton
                  className="flex-1"
                  variant="outline"
                  onPress={handleSubmit(onSubmit)}
                >
                  保存
                </MyButton>

                <MyButton
                  className="flex-1"
                  onPress={handleSubmit(onSubmit)}
                >
                  提交
                </MyButton>
              </View>
            </>
          )}
    </View>
  )
}
