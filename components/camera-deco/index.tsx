import type { GestureResponderEvent } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'

export interface CameraDecoProps {
  active?: boolean
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

export function CameraDeco(props: CameraDecoProps) {
  const { active, disabled, onPress } = props

  return (
    <Text
      className={cn(
        disabled
          ? 'text-[#51a2ff]/50'
          : active
            ? 'text-[#51a2ff]'
            : 'text-gray-500',
      )}
      onPress={onPress}
    >
      <Entypo name="camera" size={18} />
    </Text>
  )
}
