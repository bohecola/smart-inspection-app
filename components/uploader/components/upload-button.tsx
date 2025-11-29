import { PlusIcon } from 'lucide-react-native'
import { View } from 'react-native'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'

export interface UploadButtonProps {
  onPress: (...args: any[]) => void
}

export function UploadButton(props: UploadButtonProps) {
  const { onPress } = props

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          className={cn(
            'w-20 h-20 border rounded border-outline-200 items-center justify-center',
            pressed ? 'bg-outline-100' : '',
          )}
        >
          <Icon as={PlusIcon} size="xl" className="text-outline-400 stroke-[1.5px]" />
          <Text className="text-xs text-outline-400 mt-1">文件上传</Text>
        </View>
      )}
    </Pressable>
  )
}
