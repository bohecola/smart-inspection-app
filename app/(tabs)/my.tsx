import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { useDialog } from '@/components/dialog'
import { useAppToast } from '@/components/toast'
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'
import { useUserStore } from '@/store/user'

// eslint-disable-next-line perfectionist/sort-imports
const defaultAvatar = require('@/assets/images/default-avatar.jpeg')

export default function SettingsScreen() {
  const router = useRouter()

  const { info, logout } = useUserStore()

  const { showConfirmDialog } = useDialog()

  const [loading, setLoading] = useState(false)

  const toast = useAppToast()

  function handleLogout() {
    showConfirmDialog({
      description: '确定退出登录吗？',
    })
      .then(async () => {
        setLoading(true)
        await logout()
        router.replace('/sign-in')
        toast.show('退出成功')
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <View className="p-4 flex-1 bg-background-50">
      <Card className="rounded-md">
        <View className="flex-row items-center gap-4">
          <Image
            source={defaultAvatar}
            className="w-20 h-20 rounded-full"
          />
          <Text className="font-bold">{info?.nickName}</Text>
        </View>
      </Card>

      <Button
        className="mt-4"
        disabled={loading}
        onPress={handleLogout}
      >
        {loading && <ButtonSpinner color="gray" />}
        <ButtonText>退出登录</ButtonText>
      </Button>
    </View>
  )
}
