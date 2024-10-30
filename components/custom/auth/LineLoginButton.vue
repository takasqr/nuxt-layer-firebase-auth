<template>
  <SecondaryButton
    block
    @click="lineLoginHub()"
  >
    LINE でログインする
  </SecondaryButton>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue'
import type { OAuthCredential } from 'firebase/auth'
import { OAuthProvider, getAuth, signInWithCredential } from 'firebase/auth'
import liff from '@line/liff'
import { AccountService } from '~/model/domain/auth/AccountService'

const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const liffId = runtimeConfig.public.LIFF_ID as string

// emit を定義
const emit = defineEmits<{
  finished: [credential?: OAuthCredential]
}>()

function lineLoginHub() {
  // liff かどうかで処理を分岐
  if (liff.isInClient()) {
    // liff だったら
    lineLoginLiff()
  }
  else {
    // liff じゃなかったら
    lineLoginWeb()
  }
}

function lineLoginLiff() {
  if (!liffId) {
    alert('liffId が取得できませんでした。')

    return
  }

  alert(`liffId: ${liffId}`)

  liff.init({ liffId: liffId })
    .then(() => {
      alert('liff.init()')

      // idToken
      const idToken = liff.getIDToken()

      const auth = getAuth()
      const provider = new OAuthProvider('oidc.line')

      // idToken が取得できなかったら処理を終了
      if (!idToken) {
        alert('idToken が取得できませんでした。')

        return
      }

      alert(`idToken: ${idToken}`)

      const credential = provider.credential({
        idToken: idToken,
      })

      alert(`credential: ${credential}`)

      signInWithCredential(auth, credential)
        .then(() => {
          alert('success')

          router.push({ path: '/ja/my/profile' })
        })
        .catch((error) => {
          alert(`signInWithCredential: ${error}`)
        })

      alert('finish')
    })
    .catch((error) => {
      alert(`iff.init(): ${error}`)
    })
}

function lineLoginWeb() {
  // LINE アカウントでログイン
  const accountService = new AccountService()
  accountService.signinWithLine()
    .then((credential) => {
      emit('finished', credential)
    })
    .catch((error) => {
      console.error(error)
      // 失敗したら undefined を返す
      emit('finished', undefined)
    })
}
</script>
