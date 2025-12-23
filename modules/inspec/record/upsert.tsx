import type { RecordForm } from './helper'
import type { PatrolTaskRecordResultVO } from '@/api/ptms/task/patorlTask/types'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { groupBy, isNil } from 'lodash-es'
import { CalendarIcon, MapPinned, UserIcon } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { doPatorlTaskExecute, getPatorlTaskRecordByContentId } from '@/api/ptms/task/patorlTask'
import { MyAccordionItem } from '@/components/accordion'
import { MyActivityIndicator } from '@/components/activity-indicator'
import { MyButton } from '@/components/button'
import { CameraDeco } from '@/components/camera-deco'
import { Cell, CellGroup } from '@/components/cell'
import { FieldRenderer } from '@/components/field-renderer'
import { FormItem } from '@/components/form'
import { ImagePicker } from '@/components/image-picker'
import { useAppToast } from '@/components/toast'
import { Accordion } from '@/components/ui/accordion'
import { ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { DATA_TYPE_MAP } from '@/enums'
import { useLoading, useNativeLocation, useNavigationBeforeRemoveGuard } from '@/hooks'
import { useUserStore } from '@/store/user'
import { eventBus } from '@/utils'
import { getLocationAsync } from '@/utils/locationService'
import { recordSchema, useIsAddOrEditRoute } from './helper'

export default function InspecRecordUpsert() {
  const router = useRouter()
  const toast = useAppToast()
  const { info } = useUserStore()
  const { contentId, parentObjectName } = useLocalSearchParams() as Record<string, string>
  const { isAdd } = useIsAddOrEditRoute()
  const { showLoading, hideLoading } = useLoading()

  const [loading, setLoading] = useState(false)
  // 打开表单时间
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
  // 表单
  const { control, watch, getValues, handleSubmit } = useForm<RecordForm>({
    // 初始化表单数据
    defaultValues: async () => {
      setLoading(true)
      try {
        // 拉取远程模版
        const { data } = await getPatorlTaskRecordByContentId(contentId)

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
          Object.assign(data, { operator: info.nickName, starttime: currentDate })
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

  // 位置
  const { latitudeRef, longitudeRef } = useNativeLocation()

  // 分组列表
  const grouped = useMemo(() => {
    const arr = fields.map((item, index) => ({ ...item, index }))
    return groupBy(arr, 'objectName')
  }, [fields])

  // 监听返回
  const { shouldPass } = useNavigationBeforeRemoveGuard({
    shouldSkip: () => getValues('status') === '1',
    onConfirm: handleSubmit((data) => {
      return onSave(data)
    }),
  })

  // 状态
  const status = watch('status')
  // 执行人
  const operator = watch('operator')
  // 执行日期
  const starttime = watch('starttime')
  // 禁用
  const isDisabled = useMemo(() => status === '1', [status])
  // 相机图标点击
  function onCameraPress(_: PatrolTaskRecordResultVO, index: number) {
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
    let location: string[] = [String(longitudeRef.current), String(latitudeRef.current)]

    if (isNil(latitudeRef.current) || isNil(longitudeRef.current)) {
      showLoading('正在重新获取定位...')
      const { coords } = await getLocationAsync()

      if (isNil(coords)) {
        toast.show('定位获取失败，请重试')
        return hideLoading()
      }

      location = [String(coords.longitude), String(coords.latitude)]
      hideLoading()
    }

    showLoading(loadingText)
    const { msg } = await doPatorlTaskExecute({
      ...data,
      status,
      location,
    })
      .finally(hideLoading)
    toast.success(msg)
    // 通知内容刷新
    eventBus.emit('inspec:content:refresh')
    // 返回内容
    router.back()
  }

  // 保存
  async function onSave(data: RecordForm) {
    shouldPass.current = true
    await doExecuteRequest({ data, status: '0', loadingText: '保存中...' })
  }

  // 提交
  async function onSubmit(data: RecordForm) {
    shouldPass.current = true
    await doExecuteRequest({ data, status: '1', loadingText: '提交中...' })
  }

  return (
    <View className="flex-1 bg-background-50 gap-2 pb-safe">
      {loading
        ? <MyActivityIndicator className="mt-4" />
        : (
            <>
              <ScrollView>
                {/* 执行人信息 */}
                <CellGroup inset className="py-4">
                  <Cell icon={UserIcon} title="执行人" value={operator} />
                  <Cell icon={CalendarIcon} title="执行日期" value={dayjs(starttime).format('YYYY-MM-DD')} />
                  <Cell icon={MapPinned} title="设备" value={decodeURIComponent(parentObjectName)} />
                </CellGroup>

                {/* 任务项列表 */}
                <View className="px-4 gap-3">
                  <Accordion type="multiple" isCollapsible={true} defaultValue={Object.keys(grouped)}>
                    {Object
                      .entries(grouped)
                      .map(([objectName, items], _i) => (
                        <View key={objectName}>
                          <MyAccordionItem value={objectName} title={objectName}>
                            {items.map((item, _ii) => {
                              return (
                                <View
                                  key={item.itemId}
                                  className="bg-background-0 rounded-lg gap-2"
                                >
                                  {/* 表单项 */}
                                  <Controller
                                    control={control}
                                    name={`recordResultList.${item.index}.result`}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                      <FormItem
                                        label={`${_ii + 1}.【${item.projectName}】${item.description}`}
                                        isInvalid={!!error}
                                        errorText={error?.message}
                                        isDisabled={isDisabled}
                                        labelSuffix={(
                                          <CameraDeco
                                            disabled={item.capture === 'Y'}
                                            active={item.cameraActive}
                                            onPress={() => onCameraPress(item, item.index)}
                                          />
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
                                      name={`recordResultList.${item.index}.files`}
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
                                            autoLocation
                                          />
                                        </FormItem>
                                      )}
                                    />
                                  )}

                                  {_ii !== items.length - 1 && <Divider className="my-4" />}
                                </View>
                              )
                            })}
                          </MyAccordionItem>
                          {_i !== Object.entries(grouped).length - 1 && <Divider />}
                        </View>
                      ))}
                  </Accordion>
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
