import type { PropsWithChildren } from 'react'
import { useContext } from 'react'
import { View } from 'react-native'
import { ChevronRightIcon, Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'
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
  titleClassName?: string
  valueClassName?: string
  valueTextClassName?: string
  onPress?: () => void
} & PropsWithChildren

export function Cell(props: CellProps) {
  const { icon, rightIcon, title, label, value, children, isLink = false, disabled = false, className, titleClassName, valueClassName, valueTextClassName, onPress } = props

  const { isGroup } = useContext(CellContext)

  const clickable = !!onPress && !disabled

  return (
    <Pressable
      onPress={clickable ? onPress : undefined}
      disabled={disabled}
    >
      {(({ pressed: _ }) => (
        <View
          className={cn(
            'w-full py-3 flex-row justify-between items-top gap-2 bg-background-0',
            isGroup ? 'px-0' : 'px-4 rounded-lg',
            className,
          )}
        >
          {icon && <Icon size="md" as={icon} className="mt-[2px]" />}

          <View className="flex-row">
            <Text className={cn(titleClassName)}>{title}</Text>

            {label && <Text>{label}</Text>}
          </View>

          <View className={cn('flex-1 items-end', valueClassName)}>
            {value ? <Text className={cn('text-right', valueTextClassName)}>{value}</Text> : children}
          </View>

          {rightIcon && <Icon size="md" as={rightIcon}></Icon>}

          {isLink && <Icon size="md" as={ChevronRightIcon} className="mt-[2px]"></Icon>}
        </View>
      ))}
    </Pressable>
  )
}
