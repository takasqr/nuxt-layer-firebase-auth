import type { OAuthCredential, UserCredential } from 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser, sendPasswordResetEmail, OAuthProvider, signInWithPopup, unlink, GoogleAuthProvider, signInWithRedirect, linkWithPopup } from 'firebase/auth'
import { AuthStore } from '~/stores/AuthStore'

// 認証関連の関数を提供する
class AccountService {
  readonly providerIdLine: string = 'oidc.line'
  readonly providerIdGoogle: string = 'google.com'

  // ログイン
  signin(email: string, password: string): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user
          // ...
          resolve(userCredential)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // LINE 連携
  signinWithLine(): Promise<OAuthCredential> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      const provider = new OAuthProvider(this.providerIdLine)

      signInWithPopup(auth, provider)
        .then((result) => {
          // Get the OAuth access token and ID Token
          const credential = OAuthProvider.credentialFromResult(result)

          if (credential === null) {
            reject('credential が空でした。')
          }
          else {
            resolve(credential)
          }
        })
        .catch((error) => {
          // 失敗したら
          reject(error)
        })
    })
  }

  signinWithGoogle(): void {
    const auth = getAuth()
    auth.languageCode = 'ja'
    const provider = new GoogleAuthProvider()

    // Google のサインインフォームへリダイレクト
    signInWithRedirect(auth, provider)
  }

  linkLine(): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()

      const provider = new OAuthProvider(this.providerIdLine)

      if (!auth.currentUser) {
        reject()
      }
      else {
        linkWithPopup(auth.currentUser, provider).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error)
        })
      }
    })
  }

  linkGoogle(): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()

      const provider = new GoogleAuthProvider()

      if (!auth.currentUser) {
        reject()
      }
      else {
        linkWithPopup(auth.currentUser, provider).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error)
        })
      }
    })
  }

  unlinkLine(): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()

      // currentUser が空だったら
      if (auth.currentUser === null) {
        reject('currentUser が空でした。')
      }
      else {
        unlink(auth.currentUser, this.providerIdLine).then(() => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      }
    })
  }

  unlinkGoogle(): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()

      // currentUser が空だったら
      if (auth.currentUser === null) {
        reject('currentUser が空でした。')
      }
      else {
        unlink(auth.currentUser, this.providerIdGoogle).then(() => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      }
    })
  }

  // ユーザー登録
  signup(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          const email = user.email ? user.email : ''
          const uid = user.uid

          const store = AuthStore()
          // ユーザー名は email で代用する
          store.signin(uid, email, email)

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // ログアウト
  signout(): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signOut(auth).then(() => {
        resolve()
      }).catch((error) => {
        // An error happened.
        console.error('ログアウト失敗。', error)
        reject
      })
    })
  }

  // ユーザー削除
  deleteUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        deleteUser(user).then(() => {
          resolve()
        }).catch((error) => {
          console.error('ログアウト失敗。', error)
          reject()
        })
      }
      else {
        reject()
      }
    })
  }

  sendPasswordResetEmail(): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      const email = auth.currentUser?.email

      // email を取得できたら
      if (email) {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            resolve()
          })
          .catch((error) => {
            // const errorCode = error.code
            // const errorMessage = error.message
            reject(error)
          })
      }
      else {
        reject()
      }
    })
  }

  /**
     * ログイン状態をチェックし、コールバック関数を実行する。
     * @returns Promise<boolean> - ユーザーがログインしている場合はtrue、そうでない場合はfalse。
     */
  checkAuthState(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const email = user.email ? user.email : 'user@example.com'
          const uid = user.uid

          const store = AuthStore()
          // ユーザー名は email で代用する
          store.signin(uid, email, email)

          resolve(true) // Promiseをtrueで解決する
        }
        else {
          resolve(false) // Promiseをfalseで解決する
        }
      }, (error) => {
        // エラー処理
        console.error('認証状態の監視中にエラーが発生しました', error)
        reject(error) // Promiseをエラーで拒否する
      })
    })
  }
}

export { AccountService }
