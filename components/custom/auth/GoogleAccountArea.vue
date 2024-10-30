<template>
  <div class="relative block w-full rounded-lg p-12 text-center">

    <div v-if="isgoogle">
      <p>Google アカウント連携済み</p><a @click="unlink()">(解除)</a>
    </div>
    <div v-else>
      <SecondaryButton @click="googleLogin()">Google アカウントと連携する</SecondaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue'
import { AccountService } from '~/model/domain/auth/AccountService';

const store = AuthStore()

let isgoogle = ref(store.signinedUser?.isGoogle)

function googleLogin() {
  // Google アカウントでログイン
  const accountService = new AccountService
  accountService.linkGoogle()
    .then((credential) => {
      isgoogle.value = true
    })
    .catch(error => {
      // 失敗したら
    })
}

function unlink() {
  // Google 連携解除
  const accountService = new AccountService
  accountService.unlinkGoogle()
    .then(() => {
      isgoogle.value = false
    })
    .catch(error => {
      // 失敗した
    })
}
</script>