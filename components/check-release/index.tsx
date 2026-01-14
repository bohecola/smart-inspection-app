import type { PropsWithChildren } from 'react'
import * as Application from 'expo-application'
import { Directory, File, Paths } from 'expo-file-system'
import { startActivityAsync } from 'expo-intent-launcher'
import { createContext, useContext } from 'react'
import { Platform } from 'react-native'
import { checkVersion } from '@/api/comm'
import { useDialog } from '@/components/dialog'
import { useAppToast } from '@/components/toast'
import { useLoading } from '@/hooks'

interface CheckReleaseOptions {
  quiet?: boolean
}

interface CheckReleaseContextType {
  currentVersion: string
  checkRelease?: (options?: CheckReleaseOptions) => Promise<any>
}

export const CheckReleaseContext = createContext<CheckReleaseContextType>(null)

export function CheckReleaseProvider({ children }: PropsWithChildren) {
  const toast = useAppToast()
  const { showDialog } = useDialog()
  const { showLoading, hideLoading } = useLoading()
  const currentVersion = Application.nativeApplicationVersion

  const checkRelease = async (options: CheckReleaseOptions = {}) => {
    const { quiet = false } = options

    if (!quiet) {
      showLoading('正在检查更新')
    }

    const { data } = await checkVersion().finally(hideLoading)

    // 已是最新版本
    if (currentVersion === data.version) {
      return quiet ? undefined : toast.show('已是最新版本')
    }

    if (Platform.OS === 'android') {
      // 需要更新
      showDialog({
        title: `发现新版本${data.version}`,
        description: data.description,
        confirmText: '立即更新',
        cancelText: '以后再说',
        closeOnOverlayClick: false,
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
    <CheckReleaseContext.Provider
      value={{
        currentVersion,
        checkRelease,
      }}
    >
      {children}
    </CheckReleaseContext.Provider>
  )
}

export function useCheckRelease() {
  return useContext(CheckReleaseContext)
}
