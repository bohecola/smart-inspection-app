import type { StateStorage } from 'zustand/middleware'
import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV()

export const mmkvStorage: StateStorage = {
  setItem: (key, value) => {
    storage.set(key, value)
  },
  getItem: (key) => {
    return storage.getString(key)
  },
  removeItem: (key) => {
    storage.remove(key)
  },
}
