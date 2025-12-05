import { Linking } from 'react-native'
import { DialogManager } from '@/components/dialog'
import { useGlobSettings } from './settings'

// 弹窗提示前往系统设置
export async function alertToSettings(permission?: string) {
  const { appName } = useGlobSettings()

  const { showConfirmDialog } = DialogManager

  return showConfirmDialog({
    title: `${appName}未授权提示`,
    description: `请前往系统设置中的应用权限管理，找到${appName}，打开${permission}权限`,
    confirmText: '前往系统设置',
  }).then(() => {
    Linking.openSettings()
  }).catch(() => {})
}
