import type { ImagePickerAsset } from 'expo-image-picker'
import type { UploadAsset } from '@/components/uploader/types'
import { getCameraPermissionsAsync, requestCameraPermissionsAsync } from 'expo-image-picker'
import { alertToSettings } from '@/hooks'

// 查询相机权限
export async function queryCameraPermission() {
  try {
    // 获取相机权限
    let permission = await getCameraPermissionsAsync()

    // 未授权且可以再次请求
    if (!permission.granted && permission.canAskAgain) {
      permission = await requestCameraPermissionsAsync()
    }

    // 未授权
    if (!permission.granted) {
      // 弹窗提示前往系统设置
      await alertToSettings('相机')
      return false
    }

    return true
  }
  catch (error) {
    console.error('requestPermission error', error)
  }
}

export function toUploadAsset(asset: ImagePickerAsset): UploadAsset {
  return {
    uri: asset.uri,
    name: asset.fileName,
    mimeType: asset.mimeType,
  }
}
