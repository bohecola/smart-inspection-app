import type { VideoSource } from 'expo-video'
import { useVideoPlayer, VideoView } from 'expo-video'
import { View } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

interface VideoPlayerProps {
  source: VideoSource
}

export function VideoPlayer({ source }: VideoPlayerProps) {
  const { width, height } = useSafeAreaFrame()

  const player = useVideoPlayer(source, (player) => {
    player.loop = false
    player.play()
  })

  return (
    <View className="w-full">
      <VideoView
        player={player}
        style={{ width, height }}
        allowsPictureInPicture
      />
    </View>
  )
}
