import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast'

interface ToastProps {
  title: string
  description?: string
  duration?: number | null
  type?: 'error' | 'warning' | 'success' | 'info' | 'muted'
}
type ToastRef = ReturnType<typeof useAppToast>

let toastRef: ToastRef = null

export function setToastInstance(ref: ToastRef) {
  toastRef = ref
}

export function getToastInstance() {
  return toastRef
}

export function useAppToast() {
  const toast = useToast()

  const show = (props: string | ToastProps) => {
    if (typeof props === 'string') {
      props = { title: props }
    }

    const { title, description, type = 'muted', duration = 3000 } = props

    toast.show({
      placement: 'top',
      duration,
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action={type}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </Toast>
        )
      },
    })
  }

  const success = (title: string, description?: string) => show({ title, description, type: 'success' })
  const warning = (title: string, description?: string) => show({ title, description, type: 'warning' })
  const error = (title: string, description?: string) => show({ title, description, type: 'error' })
  const info = (title: string, description?: string) => show({ title, description, type: 'info' })

  const instance = {
    show,
    success,
    warning,
    error,
    info,
  }

  setToastInstance(instance)

  return instance
}
