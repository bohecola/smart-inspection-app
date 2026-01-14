import { useRouter } from 'expo-router'
import { InfoIcon, LogOut, Palette } from 'lucide-react-native'
import { useMemo } from 'react'
import { View } from 'react-native'
import { Cell, CellGroup } from '@/components/cell'
import { useCheckRelease } from '@/components/check-release'
import { useDialog } from '@/components/dialog'
import { useAppToast } from '@/components/toast'
import { Card } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'
import { useLoading } from '@/hooks'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

// eslint-disable-next-line perfectionist/sort-imports
const defaultAvatar = require('@/assets/images/default-avatar.jpeg')

export default function SettingsScreen() {
  const router = useRouter()
  const toast = useAppToast()
  const { colorMode } = useAppStore()
  const { info, logout } = useUserStore()
  const { showConfirmDialog } = useDialog()
  const { showLoading, hideLoading } = useLoading()
  const { currentVersion, checkRelease } = useCheckRelease()

  const colorModeText = useMemo(() => {
    switch (colorMode) {
      case 'light':
        return '浅色模式'
      case 'dark':
        return '深色模式'
      case 'system':
        return '跟随系统'
    }
  }, [colorMode])

  // 退出登录
  const handleLogout = () => {
    showConfirmDialog({
      description: '确定退出登录吗？',
    })
      .then(async () => {
        showLoading('退出中...')
        await logout()
        router.replace('/sign-in')
        toast.show('退出成功')
      })
      .catch(() => {})
      .finally(hideLoading)
  }

  // 主题设置
  const handleThemeSettings = () => {
    router.push('/my/theme-settings')
  }

  // 检查版本
  const handleCheckVersion = () => checkRelease()

  return (
    <View className="gap-3 flex-1 bg-background-50">
      <Card className="mt-4 mx-4 rounded-md">
        <View className="flex-row items-center gap-4">
          <Image
            source={defaultAvatar}
            className="w-20 h-20 rounded-full"
            alt="默认头像"
          />
          <Text className="font-bold">{info?.nickName}</Text>
        </View>
      </Card>

      <CellGroup inset>
        <Cell
          icon={Palette}
          title="主题色彩"
          value={colorModeText}
          isLink
          onPress={handleThemeSettings}
        />
        <Cell
          icon={InfoIcon}
          title="检查更新"
          value={currentVersion}
          isLink
          onPress={handleCheckVersion}
        />
        <Cell
          icon={LogOut}
          title="退出登录"
          isLink
          onPress={handleLogout}
        />
      </CellGroup>
    </View>
  )
}
