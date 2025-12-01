import { create } from 'zustand'

interface LoadingState {
  visible: boolean
  message: string
  show: (message?: string) => void
  hide: () => void
}

export const useLoadingStore = create<LoadingState>(set => ({
  visible: false,
  message: '加载中...',
  show: (message?: string) =>
    set(state => ({ visible: true, message: message ?? state.message })),
  hide: () => set({ visible: false }),
}))
