import * as Location from 'expo-location'
import { isNil } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { getToastInstance } from '@/components/toast'
import { getLocationAsync, requestLocationPermission } from '@/utils/locationService'
import { alertToSettings } from './tip'

export function useExpoLocation() {
  const [latitude, setLatitude] = useState<number>(null)
  const [longitude, setLongitude] = useState<number>(null)

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return alertToSettings('位置')
    }

    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    })

    if (coords) {
      const { latitude, longitude } = coords
      setLatitude(latitude)
      setLongitude(longitude)
    }
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return { latitude, longitude }
}

interface UseNativeLocationOptions {
  // 立即定位
  immediate?: boolean
}

export function useNativeLocation(options?: UseNativeLocationOptions) {
  const { immediate = true } = options ?? {}

  const [latitude, setLatitude] = useState<number>(null)
  const [longitude, setLongitude] = useState<number>(null)
  const latitudeRef = useRef<number>(null)
  const longitudeRef = useRef<number>(null)

  const toast = getToastInstance()

  const getUserLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission()

      if (!hasPermission) {
        return alertToSettings('位置')
      }

      const { coords } = await getLocationAsync()

      if (isNil(coords)) {
        return toast.show('定位获取失败')
      }

      setLatitude(coords.latitude)
      setLongitude(coords.longitude)
      latitudeRef.current = coords.latitude
      longitudeRef.current = coords.longitude
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (immediate) {
      getUserLocation()
    }
  }, [])

  return { latitude, longitude, latitudeRef, longitudeRef, getUserLocation }
}
