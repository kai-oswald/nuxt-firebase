import { type Firestore, getFirestore } from 'firebase/firestore'
import { useNuxtApp } from '#imports'

export const useFirestore = (): Firestore => {
  const nuxtApp = useNuxtApp()

  if (!nuxtApp._firestore) {
    nuxtApp._firestore = getFirestore()
  }
  return nuxtApp._firestore
}
