import { PlusIcon } from 'lucide-react-native'
import { View } from 'react-native'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils'
import { useUploaderContext } from '../context'

export interface UploadButtonProps {
  onPress: (...args: any[]) => void
}

export function UploadButton(props: UploadButtonProps) {
  const { onPress } = props

  const { isDisabled, isInvalid } = useUploaderContext()

  return (
    <View className="w-20 h-20">
      <Pressable disabled={isDisabled} onPress={onPress}>
        {({ pressed }) => (
          <View
            className={cn(
              'w-full h-full border rounded border-outline-200 items-center justify-center',
              pressed ? 'bg-outline-100' : '',
              isDisabled ? 'bg-outline-50' : '',
              isInvalid ? 'border-error-700' : '',
            )}
          >
            <Icon
              as={PlusIcon}
              size="xl"
              className={cn('text-outline-400 stroke-[1.5px]')}
            />
            <Text className={cn('text-xs text-outline-400 mt-1')}>
              文件上传
            </Text>
          </View>
        )}
      </Pressable>
    </View>

  )
}
