import { type Auth } from 'firebase/auth'
import { useNuxtApp } from '#imports'

export const useFirebaseAuth = (): Auth => {
  const { $firebaseAuth } = useNuxtApp()
  return $firebaseAuth
}
