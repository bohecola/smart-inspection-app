import type { PropsWithChildren } from 'react'
import type { IFormControlProps } from '@/components/ui/form-control'
import { FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control'

type FormItemProps = PropsWithChildren<{
  label?: string
  helperText?: string
  errorText?: string
} & IFormControlProps>

export function FormItem(props: FormItemProps) {
  const { label, children, helperText, errorText, ...rest } = props

  return (
    <FormControl {...rest}>
      {label && (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
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
