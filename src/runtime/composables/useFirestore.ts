import { type Firestore } from 'firebase/firestore/lite'
import { useNuxtApp } from '#imports'

export const useFirestore = (): Firestore => {
  const { $firebaseFirestore } = useNuxtApp()
  return $firebaseFirestore
}
