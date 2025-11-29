import type { SubmitHandler } from 'react-hook-form'
import type { RecordForm } from './helper'
import type { ProductTaskRecordResultVO } from '@/api/ptms/task/productTask/types'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { isNil } from 'lodash-es'
import { CalendarIcon, UserIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { doExecute, getProductTaskRecordTemp } from '@/api/ptms/task/productTask'
import { MyButton } from '@/components/button'
import { CameraDeco } from '@/components/camera-deco'
import { Cell, CellGroup } from '@/components/cell'
import { FieldRenderer } from '@/components/field-renderer'
import { FormItem } from '@/components/form'
import { ImagePicker } from '@/components/image-picker'
import { useAppToast } from '@/components/toast'
import { Text } from '@/components/ui/text'
import { DATA_TYPE_MAP } from '@/enums'
import { useUserStore } from '@/store/user'
import { recordSchema, useIsAddOrEditRoute } from './helper'

export default function RecordUpsert() {
  const router = useRouter()

  const { id } = useLocalSearchParams() as Record<string, string>

  const { info } = useUserStore()

  const { isAdd } = useIsAddOrEditRoute()

  const { show, success } = useAppToast()

  const currentDate = dayjs().format('YYYY-MM-DD')

  const [loading, setLoading] = useState(false)

  const { control, getValues, handleSubmit } = useForm<RecordForm>({
    // 初始化表单数据
    defaultValues: async () => {
      setLoading(true)
      try {
        if (isAdd) {
          // 拉取远程模版
          const { data } = await getProductTaskRecordTemp(id)
          // 初始化相机是否可以拍摄状态
          const recordResultList = data.recordResultList.map(item => ({
            ...item,
            cameraActive: item.capture === 'Y',
          }))
          // 初始化执行人、执行日期、任务项列表
          Object.assign(data, { operator: info.nickName, operateDate: currentDate, recordResultList })
          return data
        }
      }
      catch (error) {
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    },
    resolver: zodResolver(recordSchema),
    mode: 'onSubmit',
  })

  // 任务项列表
  const { fields, update } = useFieldArray({ control, name: 'recordResultList' })

  // 保存
  const onSave: SubmitHandler<RecordForm> = async (data) => {
    const { msg } = await doExecute({ ...data, status: '0' })
    success(msg)
    router.back()
  }

  // 提交
  const onSubmit: SubmitHandler<RecordForm> = async (data) => {
    const { msg } = await doExecute({ ...data, status: '1' })
    success(msg)
    router.back()
  }

  // 相机图标点击
  const onCameraPress = (item: ProductTaskRecordResultVO, index: number) => {
    // 必须拍摄
    if (item.capture === 'Y') {
      return show(`当前任务项不能取消拍摄`)
    }

    // 可选拍摄
    const currentItem = getValues('recordResultList')[index]
    if (!isNil(currentItem.files) && currentItem.files !== '') {
      return show(`若要取消拍摄，请先删除【${currentItem?.description}】下的拍摄文件 `)
    }

    // 更新相机是否可以拍摄状态
    update(index, { ...item, cameraActive: !item.cameraActive })
  }

  return (
    <View className="flex-1 bg-background-50 gap-2 pb-safe">
      {loading
        ? <ActivityIndicator className="mt-4" />
        : (
            <>
              <ScrollView>
                {/* 执行人信息 */}
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

                {/* 任务项列表 */}
                <View className="px-4 gap-3">
                  {fields.map((item, index) => {
                    return (
                      <View
                        key={item.itemId}
                        className="p-4 bg-background-0 rounded-lg gap-2"
                      >
                        {/* 任务项内容 */}
                        <Controller
                          control={control}
                          name={`recordResultList.${index}.result`}
                          render={({ field: { value, onChange }, fieldState: { error } }) => (
                            // 表单项
                            <FormItem
                              label={`${index + 1}. ${item.description}`}
                              isInvalid={!!error}
                              errorText={error?.message}
                              labelSuffix={(
                                <View className="flex-row items-center gap-2">
                                  {/* 相机图标 */}
                                  <CameraDeco
                                    disabled={item.capture === 'Y'}
                                    active={item.cameraActive}
                                    onPress={() => onCameraPress(item, index)}
                                  />

                                  <Text></Text>
                                </View>
                              )}
                              helperText={item.dataType === '2' ? '是否正常' : undefined}
                            >
                              <FieldRenderer
                                type={DATA_TYPE_MAP[item.dataType]}
                                value={value}
                                data={item}
                                onChange={onChange}
                              />
                            </FormItem>
                          )}
                        />

                        {/* 相机拍摄 */}
                        {item.cameraActive && (
                          <Controller
                            control={control}
                            name={`recordResultList.${index}.files`}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <FormItem
                                isInvalid={!!error}
                                errorText={error?.message}
                              >
                                <ImagePicker
                                  value={value}
                                  onChange={onChange}
                                  autoUpload
                                />
                              </FormItem>
                            )}
                          />
                        )}
                      </View>
                    )
                  })}
                </View>
              </ScrollView>

              <View className="mt-auto px-4 flex-row gap-2">
                <MyButton
                  className="flex-1"
                  variant="outline"
                  onPress={handleSubmit(onSave)}
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
