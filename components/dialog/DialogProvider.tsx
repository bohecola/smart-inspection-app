import type { PropsWithChildren } from 'react'
import type { DialogContextType, DialogOptions, DialogState } from './types'
import { createContext, useCallback, useEffect, useState } from 'react'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { setDialogRef } from './DialogManager'

export const DialogContext = createContext<DialogContextType>(null)

export function DialogProvider({ children }: PropsWithChildren) {
  const [dialogState, setDialogState] = useState<DialogState>(null)

  const showDialog = useCallback((options: DialogOptions) => {
    const { title = '系统提示', confirmText = '确定', cancelText = '取消', showCancelButton = false } = options

    return new Promise<any>((resolve, reject) => {
      setDialogState({
        ...options,
        title,
        confirmText,
        cancelText,
        showCancelButton,
        resolve,
        reject,
      })
    })
  }, [])

  const showConfirmDialog = (options: DialogOptions) => showDialog({ ...options, showCancelButton: true })

  // 注册全局实例
  useEffect(() => {
    setDialogRef({ showDialog, showConfirmDialog })
  }, [showDialog, showConfirmDialog])

  const close = () => setDialogState(null)

  const handleClose = () => {
    dialogState?.reject()
    close()
  }

  const handleConfirm = () => {
    dialogState?.resolve()
    close()
  }

  return (
    <DialogContext.Provider value={{ showDialog, showConfirmDialog }}>
      {children}

      <AlertDialog isOpen={!!dialogState} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              {dialogState?.title}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">
              {dialogState?.description}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            {dialogState?.showCancelButton && (
              <Button
                variant="outline"
                action="secondary"
                onPress={handleClose}
                size="sm"
              >
                <ButtonText>{dialogState?.cancelText}</ButtonText>
              </Button>
            )}
            <Button size="sm" onPress={handleConfirm}>
              <ButtonText>{dialogState?.confirmText}</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  )
}
