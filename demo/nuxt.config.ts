// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@oswld/nuxt-firebase'],
  firebase: {
    redirect: {
      login: '/'
    }
  }
})
