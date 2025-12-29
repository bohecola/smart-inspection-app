import type { VideoSource } from 'expo-video'
import Slider from '@react-native-community/slider'
import { useEvent } from 'expo'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useVideoPlayer, VideoView } from 'expo-video'
import { Maximize2, Minimize2, PauseIcon, PlayIcon } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { scheduleOnRN } from 'react-native-worklets'
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
  // 监听是否正在播放
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
  const { currentTime, bufferedPosition } = useEvent(player, 'timeUpdate', {
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
  // 监听播放完毕
  useEffect(() => {
    const playToEndSubscription = player.addListener('playToEnd', () => {
      player.pause()
      player.currentTime = 0
    })
    return () => {
      playToEndSubscription.remove()
    }
  }, [])

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
  // 双击手势
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scheduleOnRN(togglePlayPause)
    })
  // 单击手势
  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      scheduleOnRN(toggleControls)
    })
  // 组合手势
  const composedGesture = Gesture.Exclusive(doubleTap, singleTap)

  return (
    <View className="relative w-full">
      <GestureDetector gesture={composedGesture}>
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
      </GestureDetector>

      {showControls
        ? (
            <View className="pb-safe px-safe-offset-6 absolute bottom-0 left-0 right-0 h-[50px] bg-black/40 flex-row items-center">
              <Pressable className="w-8 h-8 items-center justify-center" onPress={togglePlayPause}>
                <Icon
                  as={isPlaying ? PauseIcon : PlayIcon}
                  size="md"
                  className="text-white"
                />
              </Pressable>

              <Text className="ml-2 text-white text-sm">
                {formatTime(currentTime)}
              </Text>

              <View className="relative flex-1">
                <View className="absolute left-0 top-1/2 translate-y-0.5 px-[17px] w-full">
                  <View className="h-0.5 bg-gray-500" style={{ width: `${(bufferedPosition / duration) * 100}%` }} />
                </View>

                <Slider
                  style={{
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
              </View>

              <Text className="mr-2 text-white text-sm">{formatTime(duration)}</Text>

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
    </View>
  )
}
