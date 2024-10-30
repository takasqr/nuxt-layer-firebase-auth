import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { AccountService } from '../model/domain/auth/AccountService'

// export default defineNuxtRouteMiddleware(async (to, from) => {
export default defineNuxtRouteMiddleware(async () => {
  // クライアントサイドのみで実行
  if (import.meta.server) return

  // ログイン状態をチェック
  const accountService = new AccountService()
  try {
    const isLoggedIn = await accountService.checkAuthState()

    if (!isLoggedIn) {
      return navigateTo('/ja/signin')
    }
  }
  catch (error) {
    // エラー処理
    console.error('エラー発生:', error)
    return navigateTo('/ja/signin')
  }
})
