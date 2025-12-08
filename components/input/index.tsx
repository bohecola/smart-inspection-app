import type { IInputFieldProps } from '@/components/ui/input'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'

export interface MyInputProps extends IInputFieldProps {
  isDisabled?: boolean
  isReadOnly?: boolean
  variant?: 'underlined' | 'outline' | 'rounded'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  trim?: boolean
  prefixIcon?: React.ElementType
  suffixIcon?: React.ElementType
  onSuffixIconPress?: () => void
}

export function MyInput(props: MyInputProps) {
  const {
    className,
    prefixIcon,
    suffixIcon,
    isDisabled,
    isReadOnly,
    variant = 'outline',
    size,
    trim = false,
    onSuffixIconPress,
    ...rest
  } = props

  const onChangeText = (text: string) => {
    rest.onChangeText?.(trim ? text.trim() : text)
  }

  return (
    <Input
      className={className}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      variant={variant}
      size={size}
    >
      {prefixIcon && (
        <InputSlot className="pl-3">
          <InputIcon as={prefixIcon} />
        </InputSlot>
      )}

      <InputField {...rest} placeholder={rest.placeholder ?? '请输入'} onChangeText={onChangeText} />

      {suffixIcon && (
        <InputSlot className="pr-3" onPress={onSuffixIconPress}>
          <InputIcon as={suffixIcon} />
        </InputSlot>
      )}
    </Input>
  )
}
