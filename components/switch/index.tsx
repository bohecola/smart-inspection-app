import type { ISwitchProps } from '@/components/ui/switch'
import { colord } from 'colord'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Switch } from '@/components/ui/switch'
import { Text } from '@/components/ui/text'
import { useThemeSettings } from '@/hooks'

interface MySwitchProps extends ISwitchProps {
  value: any
  activeValue?: any
  inactiveValue?: any
  showValueText?: boolean
  onChange?: (value: any) => void
}

export function MySwitch(props: MySwitchProps) {
  const { value = false, activeValue = true, inactiveValue = false, showValueText = false, onChange } = props

  const [active, setActive] = useState(value === activeValue)

  const { primaryColor } = useThemeSettings()

  const handleChange = (isActive: boolean) => {
    setActive(isActive)
    onChange(isActive ? activeValue : inactiveValue)
  }

  useEffect(() => {
    onChange(active ? activeValue : inactiveValue)
  }, [])

  return (
    <View className="flex-row items-center gap-2">
      <Switch
        {...props}
        value={active}
        onValueChange={handleChange}
        thumbColor={active ? primaryColor : undefined}
        trackColor={{
          true: colord(primaryColor).alpha(0.3).toHex(),
          false: undefined,
        }}
      />

      {showValueText && (
        <Text className="px-1 text-sm border border-background-300 rounded">
          {active ? '是' : '否'}
        </Text>
      )}
    </View>
  )
}
