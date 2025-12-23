import { colord } from 'colord'
import { useColorScheme } from 'nativewind'
import { useMemo } from 'react'
import { themes } from '@/components/ui/gluestack-ui-provider/config'
import { useAppStore } from '@/store/app'

export function useThemeSettings() {
  const { theme } = useAppStore()
  const { colorScheme } = useColorScheme()

  const tintColor = useMemo(() => {
    return colorScheme === 'light' ? '#000' : '#fff'
  }, [colorScheme])

  const backgroundColor = useMemo(() => {
    return colorScheme === 'light' ? '#fff' : '#000'
  }, [colorScheme])

  const primaryColor = useMemo(() => {
    const [r, g, b] = themes[theme][colorScheme]['--color-primary-600'].split(' ').map(Number)
    return colord({ r, g, b }).toHex()
  }, [theme, colorScheme])

  return {
    tintColor,
    backgroundColor,
    primaryColor,
  }
}
