<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-50">
      <body class="h-full">
      ```
    -->
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <!-- <AppIcon /> -->
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">ログイン</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          
          <!-- <ClientOnly> -->
            <SigninForm />
          <!-- </ClientOnly> -->
          
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
// import AppIcon from '@/ui/template/AppIcon.vue'
import SigninForm from '../../components/custom/auth/SigninForm.vue'

definePageMeta({
  middleware: ["auth-page"]
})
</script>
