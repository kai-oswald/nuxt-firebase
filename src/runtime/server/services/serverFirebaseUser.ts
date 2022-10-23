import type { Auth, UserRecord } from 'firebase-admin/auth'
import { serverFirebaseAuth } from '../services/serverFirebaseAuth'

export const serverFirebaseUser = async (event): Promise<UserRecord | null> => {
  const auth = serverFirebaseAuth(event)

  const firebaseUser = await tryGetUser(auth, event.context._token)

  event.context._user = firebaseUser

  return event.context._user
}

async function tryGetUser (auth: Auth, token: string) : Promise<UserRecord | null> {
  if (!token) {
    return null
  }

  try {
    const decodedToken = await auth.verifyIdToken(token)
    const user = await auth.getUser(decodedToken?.uid)
    return user
  } catch (err) {
    return null
  }
}
