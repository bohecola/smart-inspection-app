import type { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useFormControlContext } from '@gluestack-ui/core/form-control/creator'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import { ChevronDownIcon } from 'lucide-react-native'
import React, { useState } from 'react'
import { Platform, View } from 'react-native'
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@/components/ui/actionsheet'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { useVisible } from '@/hooks'
import { cn } from '@/utils'

interface MyDatePickerProps {
  mode?: 'datetime' | 'date' | 'time'
  value?: string
  onChange?: (date: string) => void
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  isDisabled?: boolean
}

const DATE_FOMAT_MAP = {
  datetime: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
}

export function MyDatePicker(props: MyDatePickerProps) {
  const { isDisabled: isFormControlDisabled, isInvalid } = useFormControlContext()

  const {
    mode = 'date',
    value,
    minDate,
    maxDate,
    placeholder = '请选择',
    onChange,
    isDisabled = isFormControlDisabled,
  } = props

  const { visible, open, close } = useVisible()

  const [date, setDate] = useState(dayjs(isEmpty(value) ? undefined : value).toDate())

  const [currentMode, setCurrentMode] = useState('date')

  // 获取时间选择器模式
  function getPickMode(): any {
    if (Platform.OS === 'android' && mode === 'datetime') {
      return currentMode
    }
    return mode
  }

  // 打开时间选择器
  function onInputPress() {
    if (isDisabled) {
      return
    }

    Platform.OS === 'ios'
      ? setCurrentMode(mode)
      : setCurrentMode(mode === 'datetime' ? 'date' : mode)
    open()
  }

  // IOS 确认
  function onIOSConfirm() {
    close()
  }

  // 时间选择器 Change 事件
  function onDateTimePickerChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedDate) {
        // Android datetime 模式：先选日期，再选时间
        if (mode === 'datetime' && currentMode === 'date') {
          setDate(selectedDate)
          setCurrentMode('time')
          setTimeout(open, 100)
        }
        else if (mode === 'datetime' && currentMode === 'time') {
          const YMD = dayjs(date).format('YYYY-MM-DD')
          const HMS = dayjs(selectedDate).format('HH:mm:ss')
          const finalDate = dayjs(`${YMD} ${HMS}`)
          setDate(finalDate.toDate())
          onChange?.(finalDate.format(DATE_FOMAT_MAP[mode]))
          close()
          setCurrentMode('date')
        }
        else {
          // 其他情况直接确认 date 或 time 模式
          onChange?.(dayjs(selectedDate).format(DATE_FOMAT_MAP[mode]))
          close()
        }
      }
      else {
        // 用户取消，重置状态
        setCurrentMode('date')
      }
    }
    else {
      // iOS 实时更新
      if (selectedDate) {
        setDate(selectedDate)
        onChange?.(dayjs(selectedDate).format(DATE_FOMAT_MAP[mode]))
      }
    }
    close()
  }

  return (
    <View>
      <Pressable onPress={onInputPress}>
        <View className={cn(
          'py-2 px-3 flex-row justify-between items-center border border-outline-200 rounded',
          isDisabled ? 'bg-outline-50' : '',
          isInvalid ? 'border-error-700' : '',
        )}
        >
          {isEmpty(value) && <Text className="text-typography-500">{placeholder}</Text>}
          {!isEmpty(value) && <Text className="text-typography-900">{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</Text>}
          <Icon className="ml-auto text-outline-500" size="md" as={ChevronDownIcon} />
        </View>
      </Pressable>

      {Platform.OS === 'ios' && visible && (
        <Actionsheet isOpen={visible} onClose={close}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <View className="w-full flex-row justify-between items-center gap-2">
              <Text onPress={close}>取消</Text>
              <Text onPress={onIOSConfirm}>确定</Text>
            </View>
            <DateTimePicker
              value={date}
              mode={getPickMode()}
              maximumDate={maxDate}
              minimumDate={minDate}
              is24Hour={true}
              onChange={onDateTimePickerChange}
              locale="zh-CN"
            />
          </ActionsheetContent>
        </Actionsheet>
      )}

      {Platform.OS === 'android' && visible && (
        <DateTimePicker
          value={date}
          mode={getPickMode()}
          maximumDate={maxDate}
          minimumDate={minDate}
          is24Hour={true}
          onChange={onDateTimePickerChange}
          locale="zh-CN"
        />
      )}
    </View>
  )
}
