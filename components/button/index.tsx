import type { PropsWithChildren } from 'react'
import type { IButtonProps } from '@/components/ui/button'
import { Button, ButtonIcon, ButtonSpinner } from '@/components/ui/button'

export type MyButtonProps = PropsWithChildren<IButtonProps & {
  loading?: boolean
  prefixIcon?: React.ElementType
  suffixIcon?: React.ElementType
}>

export function MyButton(props: MyButtonProps) {
  const { loading = false, children, prefixIcon, suffixIcon, ...rest } = props
  return (
    <Button isDisabled={loading} {...rest}>
      {loading && <ButtonSpinner color={rest.variant === 'outline' ? 'black' : 'gray'} />}
      {prefixIcon && <ButtonIcon as={prefixIcon} />}
      {children}
      {suffixIcon && <ButtonIcon as={suffixIcon} />}
    </Button>
  )
}
