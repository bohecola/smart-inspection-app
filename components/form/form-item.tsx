import type { PropsWithChildren } from 'react'
import type { IFormControlProps } from '@/components/ui/form-control'
import { View } from 'react-native'
import { FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control'

export type FormItemProps = PropsWithChildren<{
  label?: string
  labelSuffix?: React.ReactNode
  helperText?: string
  errorText?: string
} & IFormControlProps>

export function FormItem(props: FormItemProps) {
  const { label, labelSuffix, children, helperText, errorText, ...rest } = props

  return (
    <FormControl {...rest}>
      {label && (
        <FormControlLabel className="flex-row items-center">
          <FormControlLabelText>{label}</FormControlLabelText>
          {labelSuffix && <View className="ml-1">{labelSuffix}</View>}
        </FormControlLabel>
      )}
      {children}
      {helperText && (
        <FormControlHelper>
          <FormControlHelperText>
            {helperText}
          </FormControlHelperText>
        </FormControlHelper>
      )}
      {errorText && (
        <FormControlError>
          <FormControlErrorText className="text-red-500">
            {errorText}
          </FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
}
