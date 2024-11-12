// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ['./assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // Firebase Authentication で signInWithRedirect を使うため
  // Nuxt の nitro の設定では Cloud Run のドメインになるのでダメっぽい
  // Cloudflare Workers で設定
  // nitro: {
  //   routeRules: {
  //     '/__/auth/**': {
  //       proxy: {
  //         to: 'https://hiramekidev.firebaseapp.com'
  //       }
  //     }
  //   }
  // }
})