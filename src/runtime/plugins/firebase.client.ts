import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getFunctions } from 'firebase/functions'
import { useFirebaseUser } from '../composables/useFirebaseUser'
import { useFirebaseToken } from '../composables/useFirebaseToken'
import { useFirebaseApp } from '../composables/useFirebaseApp'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // initialize firebase
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const functions = getFunctions(app)

  nuxtApp.provide('firebaseFunctions', functions)
  nuxtApp.provide('firebaseApp', app)
  nuxtApp.provide('firebaseAuth', auth)
  nuxtApp.provide('firebaseFirestore', firestore)

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

    // The following are just workarounds, in case servers don't set cookies.

    // Some hosts (such as netlify) don't return the cookie from the setServerSession call in api functions.
    // As a workaround we set the cookie client-side if the token was not set.
    if (event === 'SIGNED_IN' && !firebaseToken.value) {
      // @ts-ignore
      firebaseToken.value = token // ignore error because nuxt will serialize to json
    }

    // Same workaround for signout, clear the cookie.
    if (event === 'SIGNED_OUT' && firebaseToken.value) {
      firebaseToken.value = null
    }
  })
}

function setServerSession (event, token): Promise<any> {
  return $fetch('/api/_firebase/session', {
    method: 'POST',
    body: { event, token }
  })
}
