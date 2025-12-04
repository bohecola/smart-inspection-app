import type { IInputFieldProps } from '@/components/ui/input'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'

export interface MyInputProps extends IInputFieldProps {
  isDisabled?: boolean
  variant?: 'underlined' | 'outline' | 'rounded'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  prefixIcon?: React.ElementType
  suffixIcon?: React.ElementType
  onSuffixIconPress?: () => void
}

export function MyInput(props: MyInputProps) {
  const { className, prefixIcon, suffixIcon, isDisabled, variant = 'outline', size, onSuffixIconPress, ...rest } = props

  return (
    <Input className={className} isDisabled={isDisabled} variant={variant} size={size}>
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
