// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@oswld/nuxt-firebase'],
  firebase: {
    redirect: {
      login: '/'
    },
    config: {
      apiKey: 'AIzaSyDZbErWnsPmyVWRZ1joFGldWpGcZ5pEtd4',
      authDomain: 'nuxt3-firebase-demo.firebaseapp.com',
      projectId: 'nuxt3-firebase-demo',
      storageBucket: 'nuxt3-firebase-demo.appspot.com',
      messagingSenderId: '642353543886',
      appId: '1:642353543886:web:b962cd0ce0fd8229e8ee9f'
    }
  }
})
