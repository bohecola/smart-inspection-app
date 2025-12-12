import type { FieldError } from 'react-hook-form'
import type { HandleForm } from './helper'
import type { BugMaterialVO, DataBugVO } from '@/api/ptms/bug/bugInfo/types'
import type { TabMenu } from '@/components/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { isArray, isEmpty, isNil } from 'lodash-es'
import { PlusIcon, Trash2 } from 'lucide-react-native'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { finishBug, firstBugSave, getBugInfo, secondBugSave } from '@/api/ptms/bug/bugInfo'
import { MyAccordionItem } from '@/components/accordion'
import { MyButton } from '@/components/button'
import { Cell, CellGroup } from '@/components/cell'
import { MyDatePicker } from '@/components/date-picker'
import { useDialog } from '@/components/dialog'
import { FormItem } from '@/components/form'
import { ImagePicker } from '@/components/image-picker'
import { MyInput } from '@/components/input'
import { MyInputNumber } from '@/components/input-number'
import { TabsMenu } from '@/components/tabs'
import { useAppToast } from '@/components/toast'
import { Accordion } from '@/components/ui/accordion'
import { ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { useLoading } from '@/hooks'
import { cn, selectDictLabel, useDict } from '@/utils'
import { handleSchema } from './helper'

// 大步骤
const tabs: TabMenu[] = [
  { title: '第一步', name: 'first-step' },
  { title: '第二步', name: 'second-step' },
]

export default function BugHandle() {
  // 路由
  const router = useRouter()
  // 提示
  const toast = useAppToast()
  // 弹窗
  const { showConfirmDialog } = useDialog()
  // 加载
  const { showLoading, hideLoading } = useLoading()
  // 参数
  const { id } = useLocalSearchParams() as Record<string, string>
  // 字典
  const { device_type, bug_level, bug_personliable, sys_yes_no, bug_state } = useDict('device_type', 'bug_level', 'bug_personliable', 'sys_yes_no', 'bug_state')
  // 状态
  const [loading, setLoading] = useState(false)
  // 详情
  const [detail, setDetail] = useState<DataBugVO>(null)
  // 当前大步骤
  const [currentTab, setCurrentTab] = useState(tabs[0])
  // 当前消缺步骤
  const [currentFixTab, setCurrentFixTab] = useState<TabMenu>(null)

  // 表单
  const { control, formState: { errors }, getValues, trigger, reset } = useForm<HandleForm>({
    defaultValues: {
      fixList: [],
      secondStep: {
        bugId: id,
        status: undefined,
        process: undefined,
        analysis: undefined,
        finishtime: undefined,
        bugMaterialList: [],
      },
    },
    resolver: zodResolver(handleSchema),
  })

  // 消缺表单列表
  const { fields } = useFieldArray({ control, name: 'fixList', keyName: '_key' })

  // 物料表单
  const { fields: materialFields, append, remove } = useFieldArray({ control, name: 'secondStep.bugMaterialList', keyName: '_key' })

  // 消缺步骤
  const fixTabs: TabMenu[] = useMemo(() => {
    const data = fields?.map((e) => {
      return {
        title: e.typeName,
        name: e.type,
      }
    })
    setCurrentFixTab(data[0])
    return data
  }, [fields])

  // 是否禁用
  const isDisabled = useMemo(() => {
    const { status } = detail ?? {}
    return ['2', '3', '4'].includes(status)
  }, [detail])

  // 按钮文本
  const buttonText = useMemo(() => {
    if (currentTab.name === 'first-step') {
      if (['0', '2'].includes(currentFixTab?.name)) {
        return '提交审核'
      }
    }
    return '保存'
  }, [currentTab, currentFixTab])

  // 是否显示底部提交按钮
  const showButton = useMemo(() => {
    if (isDisabled) {
      return false
    }

    if (currentTab.name === 'first-step') {
      const [first, _, last] = getValues('fixList')
      // 消缺前 => 审核通过 => 不显示按钮
      if (currentFixTab?.name === '0' && first?.approveResult === '1') {
        return false
      }
      // 投运前 => 审核通过 => 不显示按钮
      if (currentFixTab?.name === '2' && last?.approveResult === '1') {
        return false
      }
      return true
    }
    return true
  }, [currentTab, currentFixTab, detail, isDisabled])

  // 是否展示完成按钮
  const showCompleteButton = useMemo(() => {
    const { bugDealList = [] } = detail ?? {}
    if (isDisabled) {
      return false
    }
    if (isEmpty(bugDealList)) {
      return false
    }
    if (detail?.hstep === 'N') {
      return true
    }
    // 消缺前、投运前都审核通过 => 展示完成按钮
    const [first, _, last] = bugDealList
    const show = [first, last].every(e => e?.approveResult === '1')
    return show
  }, [detail?.bugDealList, detail, isDisabled])

  // 获取详情
  const getDetail = async () => {
    setLoading(true)
    const { data } = await getBugInfo(id)
    const { id: bugId, status, process, analysis, finishtime, bugMaterialList = [], bugDealList = [] } = data ?? {}
    // 设置详情
    setDetail(data)
    // 重置表单
    reset({
      // 设置第一步表单
      fixList: bugDealList,
      // 设置第二步表单
      secondStep: { bugId, status, process, analysis, finishtime, bugMaterialList },
    })
    setLoading(false)
  }

  // 大步骤切换
  const onTabChange = (item: TabMenu, _: number) => {
    setCurrentTab(item)
  }

  // 消缺步骤切换
  const onFixTabChange = (item: TabMenu, _: number) => {
    setCurrentFixTab(item)
  }

  // 新增物料
  const handleAddMaterial = () => {
    const item: BugMaterialVO = { bugId: id, name: undefined, model: undefined, factor: undefined, count: undefined, unit: undefined }
    append(item)
  }

  // 删除物料
  const handleRemoveMaterial = (index: number) => () => {
    showConfirmDialog({ description: '确定删除该物料吗？' })
      .then(() => {
        remove(index)
      })
      .catch(() => {})
  }

  // 提交
  const onSubmit = async () => {
    // 大步骤第一步
    if (currentTab.name === 'first-step') {
      // 校验当前消缺步骤
      const index = fixTabs.findIndex(e => e.name === currentFixTab?.name)
      const isValid = await trigger(`fixList.${index}`)
      if (!isValid) {
        return
      }

      showLoading(`${buttonText}中...`)
      const data = getValues(`fixList.${index}`)
      const { msg } = await firstBugSave(data).finally(hideLoading)
      toast.success(msg)
    }

    // 大步骤第二步
    if (currentTab.name === 'second-step') {
      // 物料列表不为空 => 校验
      const bugMaterialList = getValues('secondStep.bugMaterialList')
      if (!isEmpty(bugMaterialList)) {
        const isValid = await trigger('secondStep.bugMaterialList')
        if (!isValid) {
          return
        }
      }

      const data = getValues('secondStep')
      showLoading(`${buttonText}中...`)
      const { msg } = await secondBugSave(data).finally(hideLoading)
      toast.success(msg)
    }
  }

  // 完成
  const onComplete = async () => {
    try {
      const isValid = await trigger(['fixList', 'secondStep'])

      if (!isValid) {
        const { fixList, secondStep } = errors
        if (!isNil(fixList)) {
          const [fixDuringError] = fixList.filter(Boolean).map(e => e)
          const errors = Object.entries(fixDuringError).filter(Boolean)
          const [error] = errors.map(([_, value]) => value) as FieldError[]
          return toast.show(`第一步 / 消缺中 / ${error?.message}`)
        }
        if (!isNil(secondStep)) {
          const errors = Object.entries(secondStep).filter(Boolean)
          const [error] = errors.reduce((acc, [_, value]) => {
            if (isArray(value)) {
              const arr = []
              for (const e of value) {
                const i = Object.entries(e).map(([_, v]) => v)
                arr.push(...i)
              }
              return [...acc, ...arr]
            }
            return [...acc, value]
          }, []) as FieldError[]

          return toast.show(`第二步 / ${error?.message}`)
        }
      }

      const { fixList, secondStep } = getValues()
      // 消缺中保存
      const fixDuringData = fixList.find(e => e.type === '1')
      showLoading('消缺中保存中...')
      await firstBugSave(fixDuringData)
      // 第二步保存
      showLoading('第二步保存中...')
      await secondBugSave(secondStep)
      // 完成消缺
      showLoading('完成中...')
      const { msg } = await finishBug(id)
      toast.success(msg)
      router.dismissTo('/bug')
    }
    catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
    }
    finally {
      hideLoading()
    }
  }

  useEffect(() => {
    console.log('errors', JSON.stringify(errors))
  }, [errors])

  // 获取详情
  useEffect(() => {
    getDetail()
  }, [id])

  return (
    <>
      <Stack.Screen options={{ headerRight: () => showCompleteButton
        ? (
            <Pressable disabled={loading} onPress={onComplete}>
              {({ pressed }) => (
                <Text
                  className={cn(
                    'px-4 py-1 text-md text-background-0 bg-background-950 rounded-full',
                    pressed ? 'bg-background-800' : '',
                  )}
                >
                  完成
                </Text>
              )}
            </Pressable>
          )
        : null }}
      />
      <View className="flex-1 bg-background-50 gap-2 pb-safe">
        {
          loading
            ? (<ActivityIndicator className="mt-4" />)
            : (
                <>
                  <ScrollView>
                    <View className="p-4">
                      {/* 审批意见 */}
                      {detail?.opinions && (
                        <Cell
                          valueTextClassName="text-red-400"
                          className="mb-3"
                          title="审批意见"
                          value={detail?.opinions}
                        />
                      )}

                      {/* 缺陷详情 */}
                      <Accordion
                        size="md"
                        variant="filled"
                        type="single"
                        isCollapsible={true}
                        isDisabled={false}
                      >
                        <MyAccordionItem title={`缺陷详情（${detail?.description}）`} value="info">
                          <CellGroup>
                            <Cell title="缺陷描述" value={`${detail?.description}`} />
                            <Cell title="电站名称" value={detail?.psname} />
                            <Cell title="设备名称" value={detail?.devName} />
                            <Cell title="缺陷位置" value={detail?.bugAddr} />
                            <Cell title="设备类型" value={selectDictLabel(device_type, detail?.devType)} />
                            <Cell title="故障类别" value={detail?.bugCategoryName} />
                            <Cell title="缺陷级别" value={selectDictLabel(bug_level, detail?.level)} />
                            <Cell title="发现人" value={detail?.finder} />
                            <Cell title="发现时间" value={detail?.findtime} />
                            <Cell title="恢复时间" value={detail?.finishtime} />
                            <Cell title="责任方" value={selectDictLabel(bug_personliable, detail?.personliable)} />
                            <Cell title="是否部门监督" value={selectDictLabel(sys_yes_no, detail?.hstep)} />
                            <Cell title="影响发电功率(kW)" value={detail?.noworkbattery} />
                            <Cell title="状态" value={selectDictLabel(bug_state, detail?.status)} />
                          </CellGroup>
                        </MyAccordionItem>
                      </Accordion>

                      {/* 大步骤 */}
                      <TabsMenu
                        className="mt-3"
                        tabs={tabs}
                        onTabChange={onTabChange}
                      />

                      {/* 第一步 */}
                      <View className={cn(
                        'bg-background-50',
                        currentTab.name !== 'first-step' ? 'hidden' : '',
                      )}
                      >
                        {/* 消缺步骤 */}
                        <TabsMenu
                          className="h-16"
                          tabs={fixTabs}
                          isRoundedItem
                          onTabChange={onFixTabChange}
                        />
                        {/* 消缺前、消缺中、投运前 */}
                        <View className="p-4 mt-3 bg-background-0">
                          {fields.map((item, index) => {
                            if (item.type === currentFixTab?.name) {
                              return (
                                <View key={index} className="gap-3">
                                  <Controller
                                    control={control}
                                    name={`fixList.${index}.operator`}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                      <FormItem
                                        label="操作人"
                                        isInvalid={!!error}
                                        errorText={error?.message}
                                        isDisabled={getValues(`fixList.${index}.approveResult`) === '1' || isDisabled}
                                        isRequired
                                      >
                                        <MyInput
                                          value={value}
                                          onChangeText={onChange}
                                        />
                                      </FormItem>
                                    )}
                                  />

                                  <Controller
                                    control={control}
                                    name={`fixList.${index}.operateDate`}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                      <FormItem
                                        label="操作时间"
                                        isInvalid={!!error}
                                        errorText={error?.message}
                                        isDisabled={getValues(`fixList.${index}.approveResult`) === '1' || isDisabled}
                                        isRequired
                                      >
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
                                    name={`fixList.${index}.description`}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                      <FormItem
                                        label="安全措施"
                                        isInvalid={!!error}
                                        errorText={error?.message}
                                        isDisabled={getValues(`fixList.${index}.approveResult`) === '1' || isDisabled}
                                        isRequired
                                      >
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
                                    name={`fixList.${index}.files`}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                      <FormItem
                                        label="附件"
                                        isInvalid={!!error}
                                        errorText={error?.message}
                                        isDisabled={getValues(`fixList.${index}.approveResult`) === '1' || isDisabled}
                                        isRequired
                                      >
                                        <ImagePicker
                                          value={value}
                                          onChange={onChange}
                                          autoUpload
                                        />
                                      </FormItem>
                                    )}
                                  />

                                  {!isEmpty(getValues(`fixList.${index}.opinions`))
                                    ? (
                                        <Controller
                                          control={control}
                                          name={`fixList.${index}.opinions`}
                                          render={({ field: { value } }) => (
                                            <FormItem label="审核意见">
                                              <Text className="text-red-500">{value}</Text>
                                            </FormItem>
                                          )}
                                        />
                                      )
                                    : null}
                                </View>
                              )
                            }
                            return null
                          })}
                        </View>
                      </View>

                      {/* 第二步 */}
                      <View className={cn(
                        'gap-6',
                        currentTab.name !== 'second-step'
                          ? 'hidden'
                          : '',
                      )}
                      >
                        {/* 第二步表单 */}
                        <View className="p-4 bg-background-0 gap-3">
                          <Controller
                            control={control}
                            name="secondStep.process"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <FormItem
                                label="处理过程"
                                isInvalid={!!error}
                                isDisabled={isDisabled}
                                errorText={error?.message}
                              >
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
                            name="secondStep.analysis"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <FormItem
                                label="故障分析"
                                isInvalid={!!error}
                                isDisabled={isDisabled}
                                errorText={error?.message}
                              >
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
                            name="secondStep.finishtime"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <FormItem
                                label="恢复时间"
                                isInvalid={!!error}
                                isDisabled={isDisabled}
                                errorText={error?.message}
                              >
                                <MyDatePicker
                                  value={value}
                                  mode="datetime"
                                  onChange={onChange}
                                />
                              </FormItem>
                            )}
                          />
                        </View>

                        {!isDisabled
                          ? (
                              <View className="flex-row justify-between">
                                <Text className="font-bold">消缺物料表</Text>
                                <Pressable onPress={handleAddMaterial}>
                                  <View className="flex-row items-center gap-1">
                                    <View className="w-6 h-6 bg-background-950 rounded-full items-center justify-center">
                                      <Icon className="text-background-0" size="sm" as={PlusIcon} />
                                    </View>
                                    <Text className="text-sm">新增</Text>
                                  </View>
                                </Pressable>
                              </View>
                            )
                          : null}

                        {/* 物料表单 */}
                        <View className="gap-3">
                          {materialFields.map((item, index) => (
                            <View className="bg-background-0" key={item._key}>
                              <View className="py-2 px-3 flex-row justify-between items-center">
                                <Text className="font-bold">物料信息</Text>
                                {!isDisabled
                                  ? (
                                      <Pressable onPress={handleRemoveMaterial(index)}>
                                        <Icon size="md" as={Trash2} />
                                      </Pressable>
                                    )
                                  : null}
                              </View>

                              <Divider />

                              <View className="p-4 gap-3">
                                <Controller
                                  control={control}
                                  name={`secondStep.bugMaterialList.${index}.name`}
                                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <FormItem
                                      label="物料名称"
                                      isInvalid={!!error}
                                      isDisabled={isDisabled}
                                      errorText={error?.message}
                                      isRequired
                                    >
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
                                  name={`secondStep.bugMaterialList.${index}.model`}
                                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <FormItem
                                      label="物料型号"
                                      isInvalid={!!error}
                                      isDisabled={isDisabled}
                                      errorText={error?.message}
                                      isRequired
                                    >
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
                                  name={`secondStep.bugMaterialList.${index}.factor`}
                                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <FormItem
                                      label="厂家"
                                      isInvalid={!!error}
                                      isDisabled={isDisabled}
                                      errorText={error?.message}
                                      isRequired
                                    >
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
                                  name={`secondStep.bugMaterialList.${index}.count`}
                                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <FormItem
                                      label="数量"
                                      isInvalid={!!error}
                                      isDisabled={isDisabled}
                                      errorText={error?.message}
                                      isRequired
                                    >
                                      <MyInputNumber
                                        value={value}
                                        onChangeText={onChange}
                                        trim
                                      />
                                    </FormItem>
                                  )}
                                />

                                <Controller
                                  control={control}
                                  name={`secondStep.bugMaterialList.${index}.unit`}
                                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <FormItem
                                      label="计量单位"
                                      isInvalid={!!error}
                                      isDisabled={isDisabled}
                                      errorText={error?.message}
                                      isRequired
                                    >
                                      <MyInput
                                        value={value}
                                        onChangeText={onChange}
                                        trim
                                      />
                                    </FormItem>
                                  )}
                                />
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  </ScrollView>

                  {showButton
                    ? (
                        <View className="mt-auto px-4">
                          <MyButton onPress={onSubmit}>
                            <ButtonText>{buttonText}</ButtonText>
                          </MyButton>
                        </View>
                      )
                    : null}
                </>
              )
        }
      </View>
    </>
  )
}
