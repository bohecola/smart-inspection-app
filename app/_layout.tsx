import { useCameraPermissions, useMediaLibraryPermissions } from 'expo-image-picker'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { isNil } from 'lodash-es'
import React from 'react'
import { DialogProvider } from '@/components/dialog'
import { GlobalLoading } from '@/components/loading'
import { useAppToast } from '@/components/toast'
import { Fab } from '@/components/ui/fab'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Icon, MoonIcon, SunIcon } from '@/components/ui/icon'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { requestLocationPermission } from '@/utils/locationService'
import '@/global.css'

if (__DEV__) {
  require('../ReactotronConfig')
}

export default function RootLayout() {
  // 初始化 toast 实例
  useAppToast()

  const { token } = useUserStore()

  const { colorMode, color, backgroundColor, setColorMode } = useAppStore()

  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] = useMediaLibraryPermissions()

  if (!cameraPermission) {
    return null
  }

  if (!mediaLibraryPermission) {
    return null
  }

  if (!cameraPermission.granted) {
    requestCameraPermission()
  }

  if (!mediaLibraryPermission.granted) {
    requestMediaLibraryPermission()
  }

  requestLocationPermission()

  return (
    <GluestackUIProvider mode={colorMode}>
      <DialogProvider>
        <React.Fragment>
          <StatusBar style="auto" />
          <Stack screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: color,
            headerStyle: {
              backgroundColor,
            },
          }}
          >
            <Stack.Protected guard={!isNil(token)}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="prod/index" options={{ title: '生产任务' }} />
              <Stack.Screen name="prod/[id]/index" options={{ title: '生产任务详情' }} />
              <Stack.Screen name="prod/[id]/add-record" options={{ title: '新增生产任务执行记录' }} />
              <Stack.Screen name="prod/[id]/edit-record" options={{ title: '编辑生产任务执行记录' }} />
              <Stack.Screen name="prod/[id]/view-record" options={{ title: '查看生产任务执行记录' }} />
              <Stack.Screen name="inspec/index" options={{ title: '巡检任务' }} />
              <Stack.Screen name="inspec/[id]/index" options={{ title: '巡检任务详情' }} />
              <Stack.Screen name="inspec/[id]/[contentName]/index" options={{ title: '巡检内容' }} />
              <Stack.Screen name="inspec/[id]/[contentName]/add-record" options={{ title: '新增巡检任务执行记录' }} />
              <Stack.Screen name="inspec/[id]/[contentName]/edit-record" options={{ title: '编辑巡检任务执行记录' }} />
              <Stack.Screen name="inspec/[id]/[contentName]/view-record" options={{ title: '查看巡检任务执行记录' }} />
              <Stack.Screen name="daily-report/index" options={{ title: '生产日报' }} />
              <Stack.Screen name="bug/index" options={{ title: '缺陷列表' }} />
              <Stack.Screen name="bug/add" options={{ title: '新增缺陷' }} />
              <Stack.Screen name="bug/[id]/handle" options={{ title: '缺陷处理' }} />
            </Stack.Protected>
            <Stack.Protected guard={isNil(token)}>
              <Stack.Screen name="sign-in" options={{ title: '登录' }} />
            </Stack.Protected>
          </Stack>
          <Fab className="bottom-28 right-6 z-0" onPress={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
            <Icon
              as={colorMode === 'light' ? MoonIcon : SunIcon}
              className="text-typography-0"
            >
            </Icon>
          </Fab>
        </React.Fragment>
      </DialogProvider>
      <GlobalLoading />
    </GluestackUIProvider>
  )
}
