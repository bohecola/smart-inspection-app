import { ActivityIndicator, View } from 'react-native'
import { Text } from '@/components/ui/text'

interface ListFooterComponentProps {
  loading: boolean
  error?: boolean
  hasMore: boolean
  load: (args?: unknown) => void
}

// 间距组件
export const Separator = () => <View className="h-3" />

// 列表底部组件
export function ListFooterComponent({ loading, error, hasMore, load }: ListFooterComponentProps) {
  return (
    <View className="mt-2 h-10">
      {
        // 加载中
        loading
          ? (<ActivityIndicator />)
          // 加载失败
          : error
            ? (
                <Text className="text-center text-typography-500" onPress={load}>
                  加载失败，请点击重试
                </Text>
              )
            // 没有更多数据
            : !hasMore
                ? (
                    <Text className="text-center text-typography-500">
                      没有更多数据了
                    </Text>
                  )
                : null
      }
    </View>
  )
}
