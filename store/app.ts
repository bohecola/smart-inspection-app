import type { Theme } from '@/components/ui/gluestack-ui-provider/config'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mmkvStorage } from '@/utils/mmkv'

export type ColorMode = 'light' | 'dark' | 'system'

export interface AppState {
  colorMode: ColorMode
  theme: Theme
  setColorMode: (colorMode: ColorMode) => void
  setTheme: (theme: Theme) => void
}

export const useAppStore = create(persist<AppState>(set => ({
  colorMode: 'light',
  theme: 'default',
  setColorMode: (colorMode: ColorMode) => {
    set((state) => {
      return {
        ...state,
        colorMode,
      }
    })
  },
  setTheme: (theme: Theme) => {
    set((state) => {
      return {
        ...state,
        theme,
      }
    })
  },
}), {
  name: 'app-store',
  storage: createJSONStorage(() => mmkvStorage),
}))
