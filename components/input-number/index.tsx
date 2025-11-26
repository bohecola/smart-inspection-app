import type { MyInputProps } from '@/components/input'
import { Platform } from 'react-native'
import { MyInput } from '@/components/input'
import { floatFormatter, intergerFormatter } from './helper'

export interface MyInputNumberProps extends MyInputProps {
  allowNegative?: boolean
  valueType?: 'integer' | 'float'
  maxDecimalPlaces?: number
  onChangeText: (text: string) => void
}

export function MyInputNumber(props: MyInputNumberProps) {
  const { allowNegative, valueType = 'float', maxDecimalPlaces = 2, onChangeText, ...rest } = props

  const handleChangeText = (value: string) => {
    if (valueType === 'integer') {
      value = intergerFormatter(value)
    }
    else {
      value = floatFormatter(value, maxDecimalPlaces)
    }

    onChangeText(value)
  }

  return (
    <MyInput
      {...rest}
      keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
      onChangeText={handleChangeText}
    />
  )
}
