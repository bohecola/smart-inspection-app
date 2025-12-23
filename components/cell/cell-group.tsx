import type { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'
import { CellContext } from './context'

export type CellGroupProps = {
  title?: string | React.ReactNode
  inset?: boolean
  className?: string
  showDivider?: boolean
} & PropsWithChildren

export function CellGroup(props: CellGroupProps) {
  const { title, inset = false, children, showDivider = true, ...rest } = props
  const validChildren = Array.isArray(children) ? children : [children]

  return (
    <CellContext.Provider value={{ isGroup: true }}>
      <View {...rest}>
        {title && (typeof title === 'string'
          ? <Text className="px-4 mb-2 text-typography-500">{title}</Text>
          : <View className="px-4 mb-2">{title}</View>)}

        <View className={`px-4 bg-background-0 ${inset ? 'mx-4 rounded-lg' : ''} `}>
          {validChildren.map((child, index) => (
            <View key={index}>
              {child}

              {showDivider && index < validChildren.length - 1 && <Divider className="opacity-30" />}
            </View>
          ))}
        </View>
      </View>
    </CellContext.Provider>
  )
}
