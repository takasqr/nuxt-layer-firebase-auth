<template>
  <div class="relative block w-full rounded-lg border-2 border-dashed border-red-300 p-12 text-center hover:border-red-400">
    <SecondaryButton @click="deleteUser()">退会する</SecondaryButton>
  </div>
</template>

<script setup lang="ts">
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue';
import { AccountService } from '~/model/domain/auth/AccountService';

function deleteUser() {
  const accountService = new AccountService
  accountService.deleteUser()
    .then((isSignout) => {
      // ログイン画面に移動
      location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>