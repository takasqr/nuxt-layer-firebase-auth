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

    <div>
      <PrimaryButton block type="submit">新規登録</PrimaryButton>
      
      <div class="px-2 py-6">
        <Divider>または</Divider>
      </div>

      <SecondaryButton block href="/ja/signin">ログイン</SecondaryButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AccountService } from '~/model/domain/auth/AccountService';
import TextFieldEmail from '@takasqr/tw-vue-ui/template/text-field-email/TextFieldEmail.vue'
import TextFieldPassword from '@takasqr/tw-vue-ui/template/text-field-password/TextFieldPassword.vue'
import PrimaryButton from '@takasqr/tw-vue-ui/template/primary-button/PrimaryButton.vue';
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue'
import Divider from '@takasqr/tw-vue-ui/basic/divider/Divider.vue'
// import router from '@/ui/router';
const router = useRouter()

const email = ref('')
const password = ref('')

function submit() {
  const accounService = new AccountService
  accounService.signup(email.value, password.value)
    .then(() => {
      router.push({ path: '/ja/my' })
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

</script>