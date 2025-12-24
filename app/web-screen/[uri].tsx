import type { DimensionValue } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { cn } from '@/utils'

interface ProgressBarProps {
  progress: number
}

// 进度条
function ProgressBar({ progress }: ProgressBarProps) {
  const width = `${progress * 100}%` as DimensionValue

  return (
    <View
      style={{ height: 2, width }}
      className={cn(
        'bg-primary-500',
        progress === 1 ? 'hidden' : '',
      )}
    />
  )
}

// Web页面
export default function WebScreenPage() {
  const { uri } = useLocalSearchParams() as Record<string, string>
  const [progress, setProgress] = useState(0)

  return (
    <View className="flex-1">
      <ProgressBar progress={progress} />

      <WebView
        source={{ uri }}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress)
        }}
      />
    </View>
  )
}
