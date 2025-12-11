import type { BugForm } from './helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { getDeviceInfo } from '@/api/ptms/base/deviceInfo'
import { addBug } from '@/api/ptms/bug/bugInfo'
import { MyButton } from '@/components/button'
import { MyDatePicker } from '@/components/date-picker'
import { FormItem } from '@/components/form'
import { MyInput } from '@/components/input'
import { MyInputNumber } from '@/components/input-number'
import { MySelect } from '@/components/select'
import { MySwitch } from '@/components/switch'
import { useAppToast } from '@/components/toast'
import { TreeSelect } from '@/components/tree-select'
import { ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { useLoading, useNavigationBeforeRemoveGuard } from '@/hooks'
import { selectDictLabel, useDict } from '@/utils'
import { bugSchema, useBugCategoryList, useDevList, usePowerList } from './helper'

export default function BugUpsert() {
  // 路由
  const router = useRouter()
  // 提示
  const toast = useAppToast()
  // 加载
  const { showLoading, hideLoading } = useLoading()
  // 字典
  const { device_type, bug_level, bug_personliable } = useDict('device_type', 'bug_level', 'bug_personliable')
  // 电站列表
  const { powerOptions } = usePowerList()
  // 故障类别列表
  const { bugCategoryOptions, fetchBugCategoryList } = useBugCategoryList()
  // 设备列表
  const { devList, devTree, fetchDevList } = useDevList()
  // 表单
  const { control, handleSubmit, watch, setValue, getValues } = useForm<BugForm>({
    defaultValues: {
      id: undefined,
      description: '',
      psId: undefined,
      devId: undefined,
      devName: undefined,
      bugAddr: undefined,
      devType: '99',
      bugCategory: '',
      level: '',
      finder: '',
      findtime: '',
      personliable: '',
      hstep: 'N',
      noworkbattery: undefined,
      status: '0',
    },
    resolver: zodResolver(bugSchema),
  })

  // 设备类型
  const devType = watch('devType')

  // 设备类型变化 => 重新获取故障类别列表
  useEffect(() => {
    if (devType) {
      fetchBugCategoryList(devType)
    }
  }, [devType])

  // 电站 id
  const psId = watch('psId')

  // 电站选择变化 => 重新获取设备列表
  function onPsIdChange(value: string) {
    if (psId === value) {
      return
    }

    setValue('devId', undefined)
    setValue('devType', '99')
    setValue('devName', undefined)
    setValue('bugAddr', undefined)
    setValue('bugCategory', '')

    // 设备类型
    const devType = getValues('devType')
    // 重置故障类别列表
    fetchBugCategoryList(devType)
    // 获取设备列表
    fetchDevList(value)
  }

  // 设备选择变化 => 设置设备名称
  async function onDevItemsChange(items: any[]) {
    // 清空故障类别
    setValue('bugCategory', '')
    // 设备项
    const [dev] = items
    // 设备详情
    const { data } = await getDeviceInfo(dev.id)
    // 设置设备类型
    setValue('devType', data.type)
    setValue('devName', data.name)
    setValue('bugAddr', data.installPos)
    // 获取设备对应的故障类别
    await fetchBugCategoryList(data.type)
  }

  // 导航离开确认
  const { shouldPass } = useNavigationBeforeRemoveGuard({
    onConfirm: handleSubmit((data) => {
      return onSubmit(data)
    }),
  })

  // 提交
  async function onSubmit(data: BugForm) {
    if (isEmpty(data.bugAddr) && isEmpty(data.devId)) {
      return toast.warning('设备和缺陷位置必须填写一项')
    }

    shouldPass.current = true

    showLoading('提交中...')
    const { msg } = await addBug(data).finally(hideLoading)
    toast.success(msg)
    router.back()
  }

  return (
    <View className="flex-1 bg-background-50 pb-safe">
      <ScrollView>
        <View className="p-4">
          <Card className="gap-3">
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem label="缺陷故障描述" isInvalid={!!error} errorText={error?.message} isRequired>
                  <Textarea>
                    <TextareaInput
                      placeholder="请输入"
                      value={value}
                      onChangeText={onChange}
                    />
                  </Textarea>
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="psId"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem label="电站" isInvalid={!!error} errorText={error?.message} isRequired>
                  <MySelect
                    selectedValue={value}
                    onChange={onChange}
                    onValueChange={onPsIdChange}
                    options={powerOptions}
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="devId"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="设备" isInvalid={!!error} errorText={error?.message}>
                  <TreeSelect
                    title="选择设备"
                    value={value}
                    onChange={onChange}
                    data={devTree}
                    rawData={devList}
                    emptyText="请先选择电站"
                    onItemsChange={onDevItemsChange}
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="bugAddr"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem label="缺陷位置" isInvalid={!!error} errorText={error?.message}>
                  <MyInput
                    value={value}
                    onChangeText={onChange}
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="devType"
              render={({ field: { value }, fieldState: { error } }) => (
                <FormItem label="设备类型" isInvalid={!!error} errorText={error?.message} isRequired>
                  <Text>{selectDictLabel(device_type, value)}</Text>
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="bugCategory"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="故障类别" isInvalid={!!error} errorText={error?.message} isRequired>
                  <MySelect
                    selectedValue={value}
                    onChange={onChange}
                    options={bugCategoryOptions}
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="level"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="缺陷级别" isInvalid={!!error} errorText={error?.message} isRequired>
                  <MySelect
                    selectedValue={value}
                    onChange={onChange}
                    options={bug_level}
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="finder"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="发现人" isInvalid={!!error} errorText={error?.message} isRequired>
                  <MyInput
                    value={value}
                    onChangeText={onChange}
                    trim
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="findtime"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="发现时间" isInvalid={!!error} errorText={error?.message} isRequired>
                  <MyDatePicker
                    value={value}
                    mode="datetime"
                    onChange={onChange}
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="personliable"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="责任方" isInvalid={!!error} errorText={error?.message} isRequired>
                  <MySelect
                    selectedValue={value}
                    onValueChange={onChange}
                    options={bug_personliable}
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="hstep"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="是否部门监督" isInvalid={!!error} errorText={error?.message}>
                  <MySwitch
                    value={value}
                    onChange={onChange}
                    activeValue="Y"
                    inactiveValue="N"
                    showValueText
                  />
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name="noworkbattery"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="影响发电功率(kW)" isInvalid={!!error} errorText={error?.message}>
                  <MyInputNumber
                    value={value}
                    onChangeText={onChange}
                  />
                </FormItem>
              )}
            />
          </Card>
        </View>
      </ScrollView>

      <View className="mt-auto px-4 flex-row gap-2">
        <MyButton
          className="flex-1"
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>提交</ButtonText>
        </MyButton>
      </View>
    </View>
  )
}
