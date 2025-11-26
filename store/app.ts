import { deleteItemAsync, getItem, setItem } from 'expo-secure-store'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ColorMode = 'light' | 'dark' | 'system'

export interface AppState {
  colorMode: ColorMode
  color: string
  backgroundColor: string
  setColorMode: (colorMode: ColorMode) => void
}

export const useAppStore = create(persist<AppState>(set => ({
  colorMode: 'light',
  color: '#000',
  backgroundColor: '#fff',
  setColorMode: (colorMode: ColorMode) => {
    set((state) => {
      return {
        ...state,
        colorMode,
        color: colorMode === 'light' ? '#000' : '#fff',
        backgroundColor: colorMode === 'light' ? '#fff' : '#000',
      }
    })
  },
}), {
  name: 'app-store',
  storage: createJSONStorage(() => ({
    setItem,
    getItem,
    removeItem: deleteItemAsync,
  })),
}))
