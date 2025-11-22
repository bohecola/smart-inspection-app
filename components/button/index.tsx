import type { PropsWithChildren } from 'react'
import type { IButtonProps } from '@/components/ui/button'
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'

type MyButtonProps = PropsWithChildren<IButtonProps & {
  loading?: boolean
}>

export function MyButton(props: MyButtonProps) {
  const { loading, children, ...rest } = props
  return (
    <Button {...rest}>
      {loading && <ButtonSpinner color="gray" />}
      <ButtonText>{children}</ButtonText>
    </Button>
  )
}
