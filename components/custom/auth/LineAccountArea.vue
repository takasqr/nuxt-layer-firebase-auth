<template>
  <div class="relative block w-full rounded-lg p-12 text-center">
    <div v-if="isLine">
      <p>LINE アカウント連携済み</p><a @click="unlink()">(解除)</a>
    </div>
    <div v-else>
      <SecondaryButton @click="lineLoginHub()">
        LINE アカウントと連携する
      </SecondaryButton>
    </div>
  </div>

  <Loading />

  <Dialog />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SecondaryButton from '@takasqr/tw-vue-ui/template/secondary-button/SecondaryButton.vue'
import liff from '@line/liff'
import Loading from '@takasqr/tw-vue-ui/basic/loading/Loading.vue'
import { LoadingStore } from '@takasqr/tw-vue-ui/basic/loading/LoadingStore'
import Dialog from '@takasqr/tw-vue-ui/basic/dialog/Dialog.vue'
import { DialogStore } from '@takasqr/tw-vue-ui/basic/dialog/DialogStore'
import { AccountService } from '~/model/domain/auth/AccountService'

const store = AuthStore()
const loadingStore = LoadingStore()
const dialogStore = DialogStore()

const isLine = ref(store.signinedUser?.isLine)

function linkLineWeb() {
  // ローディング画面を表示
  loadingStore.open({ title: '連携中', contentText: '画面をオフにせずにお待ちください。', persistent: true })

  // LINE アカウントでログイン
  const accountService = new AccountService()
  accountService.linkLine()
    .then(() => {
      isLine.value = true
    })
    .catch((error) => {
      // 失敗したら
      console.error(error)
      console.error(error.code)

      if (error.code === 'auth/credential-already-in-use') {
        dialogStore.open(
          {
            title: '連携失敗',
            contentText: '連携しようとした LINEアカウントで既にユーザーが存在しています。このアカウントに統合しますか？',
            okButtonText: 'はい',
            cancelButtonText: 'いいえ',
            completion: (isConfirmed) => {
              console.log('ダイアログ結果: ', isConfirmed)

              if (isConfirmed === true) {
                // 統合処理を開始
                // ダイアログを表示
                loadingStore.open({ title: '連携中', contentText: '画面をオフにせずにお待ちください。', persistent: true })

                
              }
            },
          })
      }
      else {
        dialogStore.open(
          {
            title: '連携失敗',
            contentText: '連携に失敗しました。',
          },
        )
      }
    })
    .finally(() => {
      loadingStore.close({ isConfirmed: true })
    })
}

function lineLoginHub() {
  // liff かどうかで処理を分岐
  if (liff.isInClient()) {
    // liff だったら
    linkLineLiff()
  }
  else {
    // liff じゃなかったら
    linkLineWeb()
  }
}

function linkLineLiff() {

}

function unlink() {
  // LINE 連携解除
  const accountService = new AccountService()
  accountService.unlinkLine()
    .then(() => {
      isLine.value = false
    })
    .catch((error) => {
      // 失敗した
      console.error(error)
    })
}
</script>
