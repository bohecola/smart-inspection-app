import type { ActivityIndicatorProps } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { useThemeSettings } from '@/hooks'

export function MyActivityIndicator(props: ActivityIndicatorProps) {
  const { primaryColor } = useThemeSettings()

  return (
    <ActivityIndicator
      color={primaryColor}
      {...props}
    />
  )
}
