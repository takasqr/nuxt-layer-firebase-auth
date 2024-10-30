<template>
  <SecondaryButton block @click="GoogleLogin()">Google でログインする</SecondaryButton>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue'
import { OAuthCredential } from "firebase/auth";
import { AccountService } from '~/model/domain/auth/AccountService';

const router = useRouter()

// emit を定義
const emit = defineEmits<{
  finished: [credential?: OAuthCredential]
}>()

function GoogleLogin() {

  // Google アカウントでログイン
  const accountService = new AccountService
  accountService.signinWithGoogle()
}
</script>