import { defineStore } from 'pinia'
import piniaStore from '../index'

export interface User {
  user_id: number
  userName: string
  phone: string
}

type UserInfoTy = User | null

interface UserState {
  info: UserInfoTy
}

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: (): UserState => ({
      info: {
        user_id: 1,
        userName: 'admin',
        phone: '13523119090',
      },
    }),
    getters: {
      getUser(state): UserInfoTy {
        return state.info
      },
    },
    actions: {
      setUser(info: UserInfoTy) {
        this.info = info
      },
      reset() {
        this.info = null
      },
    },
  }
)

export function useSettingsOutsideStore() {
  return useUserStore(piniaStore)
}
