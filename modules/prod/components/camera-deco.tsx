import type { GestureResponderEvent } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { Pressable } from '@/components/ui/pressable'

interface CameraDecoProps {
  active?: boolean
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

export default function CameraDeco(props: CameraDecoProps) {
  const { active, disabled, onPress } = props

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Entypo name="camera" size={18} color={active ? '#51a2ff' : 'gray'} />
    </Pressable>
  )
}
