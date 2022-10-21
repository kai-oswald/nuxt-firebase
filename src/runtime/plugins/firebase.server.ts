import { User } from '@firebase/auth'
import { getAuth, UserRecord } from 'firebase-admin/auth'
import app from '../config/firebase-admin'
import { useFirebaseUser } from '../composables/useFirebaseUser'
import { useFirebaseToken } from '../composables/useFirebaseToken'
import { redirectToLogin } from '../utils/redirect'
import { defineNuxtPlugin, useRoute } from '#imports'

// Set firebase user on server side
export default defineNuxtPlugin(async () => {
  const user = useFirebaseUser()
  const token = useFirebaseToken()
  const route = useRoute()
  if (!token.value) {
    return
  }

  // on the server-side we need to use the admin sdk
  // and verify the token that we get from the cookie
  const auth = getAuth(app)

  try {
    const decodedToken = await auth.verifyIdToken(token.value)
    const firebaseUser = await auth.getUser(decodedToken.user_id)
    user.value = formatUser(firebaseUser)
  } catch (err) {
    user.value = null
    token.value = null

    await redirectToLogin(route.path)
  }
})

const formatUser = (user: UserRecord): User => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    emailVerified: user.emailVerified
  } as User
}
