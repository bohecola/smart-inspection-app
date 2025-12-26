import { useEffect, useRef, useState } from 'react'

// 格式化时间
export function formatTime(seconds: number) {
  if (!seconds || Number.isNaN(seconds))
    return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// 控制条
export function useControls() {
  // 是否显示控制条
  const [showControls, setShowControls] = useState(false)
  // 控制条定时器
  const controlsTimeout = useRef<number>(null)

  // 重置控制条隐藏倒计时
  const resetControlsTimer = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current)
    }
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false)
    }, 5000)
  }

  // 控制条显示/隐藏
  const toggleControls = () => {
    setShowControls(!showControls)
    if (showControls) {
      resetControlsTimer()
    }
  }

  // 监听控制条显示状态
  useEffect(() => {
    if (showControls) {
      resetControlsTimer()
    }

    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current)
      }
    }
  }, [showControls])

  return {
    showControls,
    controlsTimeout,
    resetControlsTimer,
    toggleControls,
  }
}
