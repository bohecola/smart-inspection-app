import type { GeoError, GeoPosition } from 'react-native-geolocation-service'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { getToastInstance } from '@/components/toast'

// 请求位置权限
export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '位置权限',
          message: '应用需要访问您的位置信息',
          buttonPositive: '确定',
        },
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }
    catch (err) {
      console.error(err)
      return false
    }
  }
  return true
};

// 获取当前位置
export async function getLocationAsync() {
  const toast = getToastInstance()

  try {
    return await new Promise<GeoPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('高精度定位成功', position)
          resolve(position)
        },
        (error: GeoError) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 0,
          forceRequestLocation: true, // 强制使用原生定位
          showLocationDialog: true, // 提示用户开启位置服务
        },
      )
    })
  }
  catch (highAccuracyError) {
    console.log('高精度定位失败，尝试低精度定位', highAccuracyError)
  }

  try {
    return await new Promise<GeoPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('低精度定位成功', position)
          resolve(position)
        },
        (error: GeoError) => {
          reject(error)
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 0,
          forceRequestLocation: true, // 强制使用原生定位
          showLocationDialog: true, // 提示用户开启位置服务
        },
      )
    })
  }
  catch (lowAccuracyError) {
    console.log('低精度定位失败', lowAccuracyError)
    toast.show('定位获取失败')
  }
}
