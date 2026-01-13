import * as Application from 'expo-application'
import { Directory, File, Paths } from 'expo-file-system'
import { startActivityAsync } from 'expo-intent-launcher'
import { useRouter } from 'expo-router'
import { InfoIcon, LogOut, Palette } from 'lucide-react-native'
import { useMemo } from 'react'
import { Platform, View } from 'react-native'
import { checkVersion } from '@/api/comm'
import { Cell, CellGroup } from '@/components/cell'
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
  const { showConfirmDialog, showDialog } = useDialog()
  const { showLoading, hideLoading } = useLoading()

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
  const handleCheckVersion = async () => {
    showLoading('正在检查更新')
    const { data } = await checkVersion().finally(hideLoading)

    // 已是最新版本
    if (data.version === Application.nativeApplicationVersion) {
      return toast.show('已是最新版本')
    }

    if (Platform.OS === 'android') {
      // 需要更新
      showDialog({
        title: `发现新版本${data.version}`,
        description: data.description,
        confirmText: '立即更新',
        cancelText: '以后再说',
        showCancelButton: data.forcedUpdate === 'N',
      })
        .then(async () => {
          const updatesDir = new Directory(Paths.cache, 'updates')
          if (!updatesDir.exists) {
            updatesDir.create()
          }

          const urlParts = data.ossUrl.split('/')
          const fileName = urlParts[urlParts.length - 1]
          const destinationFile = new File(updatesDir, fileName)

          try {
            if (destinationFile.exists) {
              destinationFile.delete()
            }

            showLoading('下载中...')

            const output = await File.downloadFileAsync(data.ossUrl, destinationFile, {
              idempotent: true,
            }).finally(hideLoading)

            await startActivityAsync('android.intent.action.INSTALL_PACKAGE', {
              data: output.contentUri,
              flags: 1,
            })

            output.delete()
          }
          catch (error) {
            console.error(error)
          }
        })
        .catch(() => {})
    }
  }

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
          value={Application.nativeApplicationVersion}
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
