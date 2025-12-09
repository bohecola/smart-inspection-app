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
  const shouldPass = useRef(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      // 跳过
      if (shouldPass.current || shouldSkip?.()) {
        shouldPass.current = false
        return navigation.dispatch(e.data.action)
      }

      // 阻止默认行为
      (e as any)?.preventDefault()

      // 提示保存
      await showConfirmDialog({ description: '是否保存后再返回？' })
        .then(async () => {
          // 确定回调
          await onConfirm?.()

          // 保存成功 => 继续返回
          if (shouldPass.current) {
            shouldPass.current = false
            return navigation.dispatch(e.data.action)
          }
        })
        .catch(() => {
          // 取消 => 直接返回
          return navigation.dispatch(e.data.action)
        })
    })
    return unsubscribe
  }, [navigation])

  return {
    shouldPass,
  }
}
