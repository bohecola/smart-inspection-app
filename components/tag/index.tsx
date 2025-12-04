import type { PropsWithChildren } from 'react'
import type { ColorValue } from 'react-native'
import { LinearGradient } from '@/components/ui/linear-gradient'

export type Variant = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'pink'

const GRADUAL_COLORS: Record<Variant, [ColorValue, ColorValue]> = {
  blue: ['#0081ff', '#1cbbb4'],
  green: ['#39b54a', '#8dc63f'],
  red: ['#f43f3b', '#ec008c'],
  orange: ['#ff9700', '#ed1c24'],
  purple: ['#9000ff', '#5e00ff'],
  pink: ['#ec008c', '#6739b6'],
}

type Props = PropsWithChildren<{
  variant?: Variant
  className?: string
  colors?: [ColorValue, ColorValue]
  start?: [number, number]
  end?: [number, number]
}>

export function LinearGradientTag({ variant, children, className, colors, start = [0, 1], end = [1, 0] }: Props) {
  return (
    <LinearGradient
      className={`px-2 py-1 rounded-full ${className}`}
      start={start}
      end={end}
      colors={colors || GRADUAL_COLORS[variant]}
    >
      {children}
    </LinearGradient>
  )
}
