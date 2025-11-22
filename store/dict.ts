import { isEmpty } from 'lodash-es'
import { create } from 'zustand'

interface DictState {
  dict: Array<{
    key: string
    value: DictDataOption[]
  }>
  getDict: (key: string) => DictDataOption[]
  setDict: (key: string, value: DictDataOption[]) => void
  removeDict: (key: string) => boolean
  cleanDict: () => void
}

export const useDictStore = create<DictState>((set, get) => ({
  dict: [],
  getDict: (key: string) => {
    if (isEmpty(key)) {
      return undefined
    }

    const { dict } = get()

    const item = dict.find(item => item.key === key)
    return item ? item.value : undefined
  },
  setDict: (key: string, value: DictDataOption[]) => {
    if (isEmpty(key)) {
      return undefined
    }

    set(state => ({
      dict: [...state.dict, { key, value }],
    }))
  },
  removeDict: (key: string) => {
    if (isEmpty(key)) {
      return false
    }

    const { dict } = get()
    const exists = dict.some(i => i.key === key)
    if (!exists) {
      return false
    }

    set(state => ({
      dict: state.dict.filter(i => i.key !== key),
    }))
    return true
  },
  cleanDict: () => {
    set({ dict: [] })
  },
}))
