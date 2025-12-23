import type { RefreshControlProps } from 'react-native'
import { RefreshControl } from 'react-native'
import { useThemeSettings } from '@/hooks'

export function MyRefreshControl(props: RefreshControlProps) {
  const { primaryColor } = useThemeSettings()
  return (
    <RefreshControl
      tintColor={primaryColor}
      colors={[primaryColor]}
      {...props}
    />
  )
}
