import type { ISwitchProps } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Switch } from '@/components/ui/switch'
import { Text } from '@/components/ui/text'

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
      />

      {showValueText && (
        <Text className="px-1 text-sm border border-background-300 rounded">
          {active ? '是' : '否'}
        </Text>
      )}
    </View>
  )
}
