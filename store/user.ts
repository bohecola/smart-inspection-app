import type { UserVO } from '@/api/system/user/types'
import { isEmpty } from 'lodash-es'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { person, userLogout } from '@/api/comm'
import { mmkvStorage } from '@/utils/mmkv'

export interface UserState {
  token: string
  roles: string[]
  permissions: string[]
  info: UserVO
  psId: string
  setToken: (token: string) => void
  get: () => Promise<void>
  logout: () => Promise<void>
  setPsId: (psId: string) => void
}

export const useUserStore = create(persist<UserState>(set => ({
  psId: undefined,
  token: undefined,
  info: null,
  roles: [],
  permissions: [],
  setToken: (token: string) => {
    set(state => ({
      ...state,
      token,
    }))
  },
  get: async () => {
    const { data } = await person()
    set((state) => {
      return {
        ...state,
        info: data.user,
        roles: isEmpty(data.roles) ? ['ROLE_DEFAULT'] : data.roles,
        permissions: data.permissions ?? [],
      }
    })
  },
  logout: async () => {
    await userLogout()
    set({
      token: undefined,
      info: null,
      roles: [],
      permissions: [],
    })
  },
  setPsId: (psId: string) => {
    set(state => ({
      ...state,
      psId,
    }))
  },
}), {
  name: 'user-store',
  storage: createJSONStorage(() => mmkvStorage),
}))
