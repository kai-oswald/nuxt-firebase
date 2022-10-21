import type { Ref } from 'vue'
import { User } from 'firebase/auth'
import { useFirebaseToken } from './useFirebaseToken'
import { useState } from '#imports'

export const useFirebaseUser = (): Ref<User | null> => {
  const user = useState<User | null>('firebase_user')
  const token = useFirebaseToken()

  if (!token.value) {
    user.value = null
  }

  return user
}
