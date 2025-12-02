import type { SubmitHandler } from 'react-hook-form'
import type { RecordForm } from './helper'
import type { ProductTaskRecordResultVO } from '@/api/ptms/task/productTask/types'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { isNil } from 'lodash-es'
import { CalendarIcon, UserIcon } from 'lucide-react-native'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { doExecute, getProductTaskRecordById, getProductTaskRecordTemp } from '@/api/ptms/task/productTask'
import { MyButton } from '@/components/button'
import { CameraDeco } from '@/components/camera-deco'
import { Cell, CellGroup } from '@/components/cell'
import { useDialog } from '@/components/dialog'
import { FieldRenderer } from '@/components/field-renderer'
import { FormItem } from '@/components/form'
import { ImagePicker } from '@/components/image-picker'
import { useAppToast } from '@/components/toast'
import { ButtonText } from '@/components/ui/button'
import { DATA_TYPE_MAP } from '@/enums'
import { useLoading } from '@/hooks'
import { useUserStore } from '@/store/user'
import { recordSchema, useIsAddOrEditRoute } from './helper'

export default function RecordUpsert() {
  const router = useRouter()
  const toast = useAppToast()
  const currentDate = dayjs().format('YYYY-MM-DD')
  const navigation = useNavigation()
  const shouldBypassGuard = useRef(false)

  const { id, recordId } = useLocalSearchParams() as Record<string, string>
  const { info } = useUserStore()
  const { isAdd } = useIsAddOrEditRoute()
  const { showLoading, hideLoading } = useLoading()
  const { showConfirmDialog } = useDialog()

  const [loading, setLoading] = useState(false)

  // 表单
  const { control, watch, getValues, handleSubmit } = useForm<RecordForm>({
    // 初始化表单数据
    defaultValues: async () => {
      setLoading(true)
      try {
        // 拉取远程模版
        const { data } = isAdd
          ? await getProductTaskRecordTemp(id)
          : await getProductTaskRecordById(recordId)
        // 初始化相机是否可以拍摄状态
        data.recordResultList = data.recordResultList.map((item) => {
          const isCameraRequired = item.capture === 'Y'
          const isFilesNotEmpty = !isNil(item.files) && item.files !== ''
          return {
            ...item,
            cameraActive: isCameraRequired || isFilesNotEmpty,
          }
        })
        // 新增时初始化执行人、执行日期
        if (isAdd) {
          Object.assign(data, { operator: info.nickName, operateDate: currentDate })
        }
        return data
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

  // 列表
  const { fields, update } = useFieldArray({ control, name: 'recordResultList', keyName: '_key' })

  // 状态
  const status = watch('status')
  // 执行人
  const operator = watch('operator')
  // 执行日期
  const operateDate = watch('operateDate')
  // 禁用
  const isDisabled = useMemo(() => status === '1', [status])

  // 相机图标点击
  function onCameraPress(_: ProductTaskRecordResultVO, index: number) {
    // 禁用
    if (isDisabled) {
      return
    }
    // 获取当前任务项
    const currentItem = getValues('recordResultList')[index]
    // 必须拍摄
    if (currentItem.capture === 'Y') {
      return toast.show(`当前任务项不能取消拍摄`)
    }
    // 可选拍摄
    if (!isNil(currentItem.files) && currentItem.files !== '') {
      return toast.show(`若要取消拍摄，请先删除【${currentItem?.description}】下的拍摄文件 `)
    }
    // 更新相机是否可以拍摄状态
    update(index, {
      ...currentItem,
      cameraActive: !currentItem.cameraActive,
    })
  }

  // 请求
  async function doExecuteRequest({ data, status, loadingText }: { data: RecordForm, status: string, loadingText: string }) {
    showLoading(loadingText)
    const { msg } = await doExecute({ ...data, status })
      .finally(hideLoading)
    toast.success(msg)
  }

  // 保存
  const onSave: SubmitHandler<RecordForm> = async (data) => {
    shouldBypassGuard.current = true
    await doExecuteRequest({ data, status: '0', loadingText: '保存中...' })
    router.back()
  }

  // 提交
  const onSubmit: SubmitHandler<RecordForm> = async (data) => {
    shouldBypassGuard.current = true
    await doExecuteRequest({ data, status: '1', loadingText: '提交中...' })
    router.back()
  }

  // 监听返回
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      // 跳过
      if (shouldBypassGuard.current || getValues('status') === '1') {
        shouldBypassGuard.current = false
        return navigation.dispatch(e.data.action)
      }
      // 阻止默认行为
      (e as any)?.preventDefault()
      // 提示保存
      try {
        await showConfirmDialog({ description: '是否保存后再返回？' })
          .then(async () => {
            await handleSubmit(data => doExecuteRequest({ data, status: '0', loadingText: '保存中...' }))()
          })
          .catch(() => {})
      }
      finally {
        navigation.dispatch(e.data.action)
      }
    })
    return unsubscribe
  }, [navigation])

  return (
    <View className="flex-1 bg-background-50 gap-2 pb-safe">
      {loading
        ? <ActivityIndicator className="mt-4" />
        : (
            <>
              <ScrollView>
                {/* 执行人信息 */}
                <CellGroup inset className="py-4">
                  <Cell icon={UserIcon} title="执行人" value={operator}></Cell>
                  <Cell icon={CalendarIcon} title="执行日期" value={dayjs(operateDate).format('YYYY-MM-DD')}></Cell>
                </CellGroup>

                {/* 任务项列表 */}
                <View className="px-4 gap-3">
                  {fields.map((item, index) => {
                    return (
                      <View
                        key={item.itemId}
                        className="p-4 bg-background-0 rounded-lg gap-2"
                      >
                        {/* 表单项 */}
                        <Controller
                          control={control}
                          name={`recordResultList.${index}.result`}
                          render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <FormItem
                              label={`${index + 1}. ${item.description}`}
                              isInvalid={!!error}
                              errorText={error?.message}
                              isDisabled={isDisabled}
                              labelSuffix={(
                                <View className="flex-row items-center gap-2">
                                  {/* 相机图标 */}
                                  <CameraDeco
                                    disabled={item.capture === 'Y'}
                                    active={item.cameraActive}
                                    onPress={() => onCameraPress(item, index)}
                                  />
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
                                isDisabled={isDisabled}
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

              {!isDisabled && (
                <View className="mt-auto px-4 flex-row gap-2">
                  <MyButton
                    className="flex-1"
                    variant="outline"
                    onPress={handleSubmit(onSave)}
                  >
                    <ButtonText>保存</ButtonText>
                  </MyButton>

                  <MyButton
                    className="flex-1"
                    onPress={handleSubmit(onSubmit)}
                  >
                    <ButtonText>提交</ButtonText>
                  </MyButton>
                </View>
              )}
            </>
          )}
    </View>
  )
}
