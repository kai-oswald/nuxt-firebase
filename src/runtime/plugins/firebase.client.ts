import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseUser } from '../composables/useFirebaseUser'
import { useFirebaseToken } from '../composables/useFirebaseToken'
import { useFirebaseAuth } from '../composables/useFirebaseAuth'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // initialize firebase
  const auth = useFirebaseAuth()

  // Once Nuxt app is mounted
  nuxtApp.hooks.hook('app:mounted', async () => {
    // Listen to Firebase auth changes
    await initUser(auth)
  })
})

export const initUser = (auth) => {
  const firebaseUser = useFirebaseUser()
  const firebaseToken = useFirebaseToken()

  onAuthStateChanged(auth, async (user) => {
    const token = await user?.getIdToken()

    const event = user ? 'SIGNED_IN' : 'SIGNED_OUT'
    await setServerSession(event, token)

    firebaseUser.value = user

    // Some hosts (such as netlify) don't return the cookie from the setServerSession call in api functions.
    // As a workaround we set the cookie client-side if the token was not set.
    if (!firebaseToken.value) {
      // @ts-ignore
      firebaseToken.value = token // ignore error because nuxt will serialize to json
    }
  })
}

function setServerSession (event, token): Promise<any> {
  return $fetch('/api/_firebase/session', {
    method: 'POST',
    body: { event, token }
  })
}
