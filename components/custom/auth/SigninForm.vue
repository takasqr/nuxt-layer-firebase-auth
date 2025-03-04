<template>

  <form class="space-y-6" @submit.prevent="submit">
    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">メールアドレス</label>
      <div class="mt-2">
        
        <TextFieldEmail @change="inputEmail" />

      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">パスワード</label>
      <div class="mt-2">
        
        <TextFieldPassword @change="inputPassword" />

      </div>
    </div>

    <div class="flex items-center justify-between">

      <!-- <div class="text-sm leading-6">
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">パスワードをお忘れですか？</a>
      </div> -->
    </div>

    <div>
      <!-- <PrimaryButton type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ログイン</PrimaryButton> -->
      <PrimaryButton block type="submit">ログイン</PrimaryButton>
    </div>
  </form>
  <div>
    <div class="px-2 py-6">
      <Divider>または</Divider>
    </div>

    <SecondaryButton block href="/ja/signup">新規登録</SecondaryButton>

    <!-- <div class="pt-2">
      <LineLoginButton @finished="finishLineLogin"/>
    </div> -->
    <!-- <div class="pt-2">
      <GoogleLoginButton/>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AccountService } from '~/model/domain/auth/AccountService';
import TextFieldEmail from '@takasqr/tw-vue-ui/template/text-field-email/TextFieldEmail.vue'
import TextFieldPassword from '@takasqr/tw-vue-ui/template/text-field-password/TextFieldPassword.vue'
import PrimaryButton from '@takasqr/tw-vue-ui/template/primary-button/PrimaryButton.vue';
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue'
import Divider from '@takasqr/tw-vue-ui/basic/divider/Divider.vue'
// import LineLoginButton from './LineLoginButton.vue'
// import type { OAuthCredential } from 'firebase/auth';
// import GoogleLoginButton from './GoogleLoginButton.vue';

const router = useRouter()

const email = ref('')
const password = ref('')

function submit() {
  const accountService = new AccountService
  accountService.signin(email.value, password.value)
    .then(() => {
      authed()
    })
    .catch((error) => {
      console.error(error)
    })
}

function inputEmail(value: string) {
  email.value = value
}

function inputPassword(value: string) {
  password.value = value
}

// function finishLineLogin(credential?: OAuthCredential | undefined) {
//   // undefined じゃなかったらログイン成功
//   if (!credential == undefined) {
//     authed()
//   } else {
//     console.error('LINE ログインに失敗しました。')
//   }
// }

function authed() {
  router.push({ path: '/ja/my'})
}
</script>