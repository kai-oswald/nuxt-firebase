import { type FirebaseApp, initializeApp, getApps } from 'firebase/app'
import { useNuxtApp } from '#imports'

export const useFirebaseApp = (): FirebaseApp => {
  const nuxtApp = useNuxtApp()

  const { firebase: { config } } = useRuntimeConfig().public

  const apps = getApps()
  const app = apps.length ? apps[0] : initializeApp(config)

  // if firebase app has not been created yet.
  if (!nuxtApp._firebaseApp) {
    nuxtApp._firebaseApp = app
  }
  return nuxtApp._firebaseApp
}
