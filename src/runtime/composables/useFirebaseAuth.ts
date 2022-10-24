import { type Auth, getAuth } from 'firebase/auth'
import { useFirebaseApp } from './useFirebaseApp'
import { useNuxtApp } from '#imports'

export const useFirebaseAuth = (): Auth => {
  const nuxtApp = useNuxtApp()

  if (!nuxtApp._firebaseAuth) {
    const app = useFirebaseApp()
    nuxtApp._firebaseAuth = getAuth(app)
  }
  return nuxtApp._firebaseAuth
}
