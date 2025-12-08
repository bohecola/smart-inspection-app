import type { BugForm } from './helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { MyButton } from '@/components/button'
import { MyDatePicker } from '@/components/date-picker'
import { FormItem } from '@/components/form'
import { MyInput } from '@/components/input'
import { MyInputNumber } from '@/components/input-number'
import { MySelect } from '@/components/select'
import { MySwitch } from '@/components/switch'
import { ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { selectDictLabel, useDict } from '@/utils'
import { bugSchema, useBugCategoryList, usePowerList } from './helper'

export default function BugUpsert() {
  const { device_type, bug_level, bug_personliable } = useDict('device_type', 'bug_level', 'bug_personliable')

  const { powerOptions } = usePowerList()

  const { bugCategoryOptions, fetchBugCategoryList } = useBugCategoryList()

  const { control, handleSubmit, watch } = useForm<BugForm>({
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

  const devType = watch('devType')

  useEffect(() => {
    if (devType) {
      fetchBugCategoryList(devType)
    }
  }, [devType])

  function onSubmit(data: BugForm) {
    console.log(data)
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
                    onValueChange={onChange}
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
              name="bugAddr"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem label="缺陷位置" isInvalid={!!error} errorText={error?.message}>
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
                    onValueChange={onChange}
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
                    onValueChange={onChange}
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
