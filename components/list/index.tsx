import { ActivityIndicator, View } from 'react-native'
import { Text } from '@/components/ui/text'

interface ListFooterComponentProps {
  loading: boolean
  error?: boolean
  hasMore: boolean
  load: () => Promise<any>
}

export const Separator = () => <View className="h-3" />

export function ListFooterComponent({ loading, error, hasMore, load }: ListFooterComponentProps) {
  // 加载失败
  if (error) {
    return (
      <Text className="text-center px-4 py-4" onPress={load}>
        加载失败，请点击重试
      </Text>
    )
  }
  // 加载中
  if (loading) {
    return <ActivityIndicator className="my-4" />
  }
  // 没有更多数据
  if (!hasMore) {
    return (
      <Text className="text-center p-4 text-typography-500">
        没有更多数据了
      </Text>
    )
  }
  return null
}
