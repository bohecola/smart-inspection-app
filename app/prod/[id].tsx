import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'
import { getProductTaskInfo } from '@/api/ptms/task/productTask'
import { Text } from '@/components/ui/text'

export default function ProdDetail() {
  const { id } = useLocalSearchParams() as Record<string, string>

  async function fetchData(id: string) {
    const { data } = await getProductTaskInfo(id)

    console.log(data)
  }

  useEffect(() => {
    fetchData(id)
  }, [])

  return (
    <View>
      <Text>
        {id}
      </Text>
    </View>
  )
}
