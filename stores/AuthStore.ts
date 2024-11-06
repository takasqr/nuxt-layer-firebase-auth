import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../model/domain/user/User'

export const AuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const signinedUser = ref<User>()

  // ログイン処理
  function signin(user: User) {
    isAuth.value = true
    signinedUser.value = user
  }

  return { isAuth, signinedUser, signin }
})
