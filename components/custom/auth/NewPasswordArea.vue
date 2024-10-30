<template>
  <div class="relative block w-full rounded-lg p-12 text-center">
    <SecondaryButton @click="sendPasswordResetEmail()">
      パスワード再発行
    </SecondaryButton>
  </div>
</template>

<script setup lang="ts">
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue'
import { AccountService } from '~/model/domain/auth/AccountService'

function sendPasswordResetEmail() {
  const accountService = new AccountService()
  accountService.sendPasswordResetEmail()
    .then(() => {
      // ログイン画面に移動
      alert('パスワード再発行のためのメールを送信しました。')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
