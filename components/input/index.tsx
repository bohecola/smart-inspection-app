import type { IInputFieldProps } from '@/components/ui/input'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'

interface MyInputProps extends IInputFieldProps {
  isDisabled?: boolean
  variant?: 'underlined' | 'outline' | 'rounded'
  prefixIcon?: React.ElementType
  suffixIcon?: React.ElementType
  onSuffixIconPress?: () => void
}

export function MyInput(props: MyInputProps) {
  const { prefixIcon, suffixIcon, isDisabled, variant = 'outline', onSuffixIconPress, ...rest } = props

  return (
    <Input isDisabled={isDisabled} variant={variant}>
      {prefixIcon && (
        <InputSlot className="pl-3">
          <InputIcon as={prefixIcon} />
        </InputSlot>
      )}

      <InputField {...rest} />

      {suffixIcon && (
        <InputSlot className="pr-3" onPress={onSuffixIconPress}>
          <InputIcon as={suffixIcon} />
        </InputSlot>
      )}
    </Input>
  )
}
