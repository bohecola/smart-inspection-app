import type { IModalProps } from '@/components/ui/modal'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter } from '@/components/ui/modal'

interface MyModalProps extends IModalProps {
  title?: string
  children?: React.ReactNode
  showCancel?: boolean
  showConfirm?: boolean
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
}
export function MyModal(props: MyModalProps) {
  const {
    title,
    children,
    showCancel = true,
    showConfirm = true,
    cancelText = '取消',
    confirmText = '确定',
    onCancel,
    onConfirm,
    ...rest
  } = props

  return (
    <Modal {...rest}>
      <ModalBackdrop />
      <ModalContent className="max-w-[375px]">
        <ModalBody className="mb-5" contentContainerClassName="">
          {title && (
            <Heading
              size="md"
              className="text-typography-950 font-semibold mb-1"
            >
              {title}
            </Heading>
          )}
          {children}
        </ModalBody>
        <ModalFooter className="w-full">
          {showCancel && (
            <Button
              variant="outline"
              action="secondary"
              size="sm"
              onPress={onCancel}
              className="flex-grow"
            >
              <ButtonText>{cancelText}</ButtonText>
            </Button>
          )}
          {showConfirm && (
            <Button
              onPress={onConfirm}
              size="sm"
              className="flex-grow"
            >
              <ButtonText>{confirmText}</ButtonText>
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
