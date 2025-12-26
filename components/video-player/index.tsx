import type { VideoSource } from 'expo-video'
import Slider from '@react-native-community/slider'
import { useEvent } from 'expo'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useVideoPlayer, VideoView } from 'expo-video'
import { Maximize2, Minimize2, PauseIcon, PlayIcon } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { formatTime, useControls } from './helper'

interface VideoPlayerProps {
  source: VideoSource
}

export function VideoPlayer({ source }: VideoPlayerProps) {
  // 安全区宽、高
  const { width, height } = useSafeAreaFrame()
  // 是否为全屏
  const [inFullscreen, setInFullscreen] = useState(false)
  // 控制条
  const { showControls, resetControlsTimer, toggleControls } = useControls()
  // 视频播放器
  const player = useVideoPlayer(source, (player) => {
    player.loop = false
    player.timeUpdateEventInterval = 0.1
  })

  // 监听播放状态
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing })
  // 监听总时长
  const { duration } = useEvent(player, 'sourceLoad', {
    duration: player.duration,
    videoSource: source,
    availableVideoTracks: player.availableVideoTracks,
    availableSubtitleTracks: player.availableSubtitleTracks,
    availableAudioTracks: player.availableAudioTracks,
  })
  // 监听时间更新
  const { currentTime } = useEvent(player, 'timeUpdate', {
    currentTime: player.currentTime,
    currentLiveTimestamp: player.currentLiveTimestamp,
    currentOffsetFromLive: player.currentOffsetFromLive,
    bufferedPosition: player.bufferedPosition,
  })

  // 视频加载后，自动开始播放
  useEffect(() => {
    if (duration) {
      player.play()
    }
  }, [duration, player])
  // 视频播放完毕后，自动重置播放进度
  useEffect(() => {
    if (player && currentTime >= duration) {
      player.currentTime = 0
      player.pause()
    }
  }, [currentTime, duration, player])

  // 处理播放/暂停
  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pause()
      }
      else {
        player.play()
      }
      resetControlsTimer()
    }
  }
  // 处理进度条变化
  const onSlidingComplete = (value: number) => {
    if (player && !Number.isNaN(value) && duration) {
      player.currentTime = value * duration
      resetControlsTimer()
    }
  }
  // 全屏
  const enterFullscreen = async () => {
    setInFullscreen(true)
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
    resetControlsTimer()
  }
  // 退出全屏
  const exitFullscreen = async () => {
    setInFullscreen(false)
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    resetControlsTimer()
  }

  return (
    <View className="w-full">
      {/* 视频按压 */}
      <Pressable className="relative" onPress={toggleControls}>
        {/* 视频视图 */}
        <VideoView
          style={{
            width,
            height,
            backgroundColor: 'black',
          }}
          nativeControls={false}
          player={player}
          allowsPictureInPicture
        />

        {/* 控制条 */}
        {showControls
          ? (
              <View className="pb-safe px-safe-offset-6 absolute bottom-0 left-0 right-0 h-[50px] bg-black/40 flex-row items-center">
                {/* 播放/暂停按钮 */}
                <Pressable className="w-8 h-8 items-center justify-center" onPress={togglePlayPause}>
                  <Icon
                    as={isPlaying ? PauseIcon : PlayIcon}
                    size="md"
                    className="text-white"
                  />
                </Pressable>
                {/* 当前播放时间 */}
                <Text className="mx-2 text-white text-sm">{formatTime(currentTime)}</Text>
                {/* 进度条 */}
                <Slider
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    height: 40,
                  }}
                  minimumValue={0}
                  maximumValue={1}
                  value={duration ? currentTime / duration : 0}
                  onSlidingComplete={onSlidingComplete}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#666666"
                  thumbTintColor="#FFFFFF"
                  tapToSeek={true}
                />
                {/* 总时长 */}
                <Text className="mx-2 text-white text-sm">{formatTime(duration)}</Text>
                {/* 全屏/退出全屏按钮 */}
                <Pressable className="w-8 h-8 items-center justify-center" onPress={inFullscreen ? exitFullscreen : enterFullscreen}>
                  <Icon
                    as={inFullscreen ? Minimize2 : Maximize2}
                    size="md"
                    className="text-white"
                  />
                </Pressable>
              </View>
            )
          : null}
      </Pressable>
    </View>
  )
}
