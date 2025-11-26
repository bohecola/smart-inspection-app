import type { PropsWithChildren } from 'react'
import type { IButtonProps } from '@/components/ui/button'
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button'

type MyButtonProps = PropsWithChildren<IButtonProps & {
  loading?: boolean
  prefixIcon?: React.ElementType
  suffixIcon?: React.ElementType
}>

export function MyButton(props: MyButtonProps) {
  const { loading = false, children, prefixIcon, suffixIcon, ...rest } = props
  return (
    <Button isDisabled={loading} {...rest}>
      {loading && <ButtonSpinner color="gray" />}
      {prefixIcon && <ButtonIcon as={prefixIcon} />}
      <ButtonText>{children}</ButtonText>
      {suffixIcon && <ButtonIcon as={suffixIcon} />}
    </Button>
  )
}
