import type { ColorValue } from 'react-native'
import { useColorScheme } from 'nativewind'
import { LinearGradient } from '@/components/ui/linear-gradient'
import { Pressable } from '@/components/ui/pressable'
import { cn } from '@/utils'

export interface LinearGradientBoxProps {
  children?: React.ReactNode
  className?: string
  variant: LinearGradientBoxVariant
  onPress?: (...args: any[]) => void
}

export type LinearGradientBoxVariant = 'red' | 'blue' | 'green'

const GRADUAL_COLORS_LIGHT: Record<LinearGradientBoxVariant, [ColorValue, ColorValue]> = {
  red: ['#FFE1E1', '#0000'],
  blue: ['#D0E7FF', '#0000'],
  green: ['#D3FFE6', '#0000'],
}

const GRADUAL_COLORS_DARK: Record<LinearGradientBoxVariant, [ColorValue, ColorValue]> = {
  red: ['#4A1A1A', '#0000'],
  blue: ['#162A40', '#0000'],
  green: ['#123322', '#0000'],
}

export function LinearGradientBox({ children, className, variant, onPress }: LinearGradientBoxProps) {
  const { colorScheme } = useColorScheme()

  const GRADUAL_COLORS = colorScheme === 'light' ? GRADUAL_COLORS_LIGHT : GRADUAL_COLORS_DARK

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <LinearGradient
          className={cn(
            'border',
            variant === 'red'
              ? 'border-[#DB4444]'
              : variant === 'blue'
                ? 'border-[#4196FF]'
                : 'border-[#12C86B]',
            className,
          )}
          style={{
            backgroundColor: pressed ? GRADUAL_COLORS[variant][0] : 'transparent',
          }}
          colors={GRADUAL_COLORS[variant]}
          start={[0, 1]}
          end={[1, 1]}
        >
          {children}
        </LinearGradient>
      )}
    </Pressable>
  )
}
