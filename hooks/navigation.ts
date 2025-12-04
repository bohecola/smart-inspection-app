import { useNavigation } from 'expo-router'
import { useEffect, useRef } from 'react'
import { DialogManager } from '@/components/dialog'

interface BeforeRemoveGuardOptions {
  shouldSkip?: () => boolean
  onConfirm?: () => Promise<void> | void
}

export function useNavigationBeforeRemoveGuard(options?: BeforeRemoveGuardOptions) {
  const { shouldSkip, onConfirm } = options ?? {}
  const { showConfirmDialog } = DialogManager

  const navigation = useNavigation()
  const shouldBypassGuard = useRef(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      // 跳过
      if (shouldBypassGuard.current || shouldSkip?.()) {
        shouldBypassGuard.current = false
        return navigation.dispatch(e.data.action)
      }

      // 阻止默认行为
      (e as any)?.preventDefault()

      // 提示保存
      try {
        await showConfirmDialog({ description: '是否保存后再返回？' })
          .then(async () => {
            await onConfirm?.()
          })
          .catch(() => {})
      }
      finally {
        navigation.dispatch(e.data.action)
      }
    })
    return unsubscribe
  }, [navigation])

  return {
    shouldBypassGuard,
  }
}
