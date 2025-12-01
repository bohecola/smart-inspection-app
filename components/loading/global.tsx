import { View } from 'react-native'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'
import { useLoadingStore } from '@/store/loading'

export function GlobalLoading() {
  const isVisible = useLoadingStore(state => state.visible)
  const message = useLoadingStore(state => state.message)

  if (!isVisible) {
    return null
  }

  return (
    <View
      className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 justify-center items-center z-50"
      pointerEvents="auto"
    >
      <View className="w-36 h-36 justify-center items-center gap-3 bg-black/70 rounded-xl">
        <Spinner size="large" className="text-typography-300" />
        <Text className="text-typography-300">
          {message}
        </Text>
      </View>
    </View>
  )
}
