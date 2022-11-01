import { type FirebaseApp, initializeApp, getApps } from 'firebase/app'
import { useNuxtApp, useRuntimeConfig } from '#imports'

export const useFirebaseApp = (): FirebaseApp => {
  const nuxtApp = useNuxtApp()

  // if firebase app has not been created yet.
  if (!nuxtApp._firebaseApp) {
    const { firebase: { config } } = useRuntimeConfig().public

    const apps = getApps()

    // initialize app if not done yet.
    const app = apps.length ? apps[0] : initializeApp(config)
    nuxtApp._firebaseApp = app
  }
  return nuxtApp._firebaseApp
}
