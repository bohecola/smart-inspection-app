import type { PropsWithChildren } from 'react'
import { useContext } from 'react'
import { View } from 'react-native'
import { ChevronRightIcon, Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { CellContext } from './context'

export type CellProps = {
  icon?: React.ElementType
  rightIcon?: React.ElementType
  title: string
  label?: string
  value?: string
  isLink?: boolean
  disabled?: boolean
  className?: string
  onPress?: () => void
} & PropsWithChildren

export function Cell(props: CellProps) {
  const { icon, rightIcon, title, label, value, children, isLink = false, disabled = false, onPress } = props

  const { isGroup } = useContext(CellContext)

  const clickable = !!onPress && !disabled

  return (
    <Pressable
      onPress={clickable ? onPress : undefined}
      disabled={disabled}
    >
      {(({ pressed }) => (
        <View
          className={`
            py-3 flex-row justify-between items-center gap-2 bg-background-0 
            ${pressed && clickable ? 'bg-background-100' : ''}
            ${isGroup ? 'px-0' : 'px-4 rounded-lg'}
          `}
        >
          {icon && <Icon size="md" as={icon}></Icon>}

          <View className="flex-1">
            <Text>{title}</Text>

            {label && <Text>{label}</Text>}
          </View>

          {value ? <Text>{value}</Text> : children}

          {rightIcon && <Icon size="md" as={rightIcon}></Icon>}

          {isLink && <Icon size="md" as={ChevronRightIcon}></Icon>}
        </View>
      ))}
    </Pressable>
  )
}
