import { defineNuxtConfig } from 'nuxt/config'
import FirebaseModule from '..'

export default defineNuxtConfig({
  modules: [
    FirebaseModule
  ],
  myModule: {
    addPlugin: true
  },
  firebase: {
    cookies: {
      lifetime: 60 * 60 * 8 // 8 hours
    },
    redirect: {
      login: '/',
      callback: '/confirm'
    }
  }
})
