import { type Auth, getAuth } from 'firebase-admin/auth'
import { type H3Event, getCookie } from 'h3'
import { useRuntimeConfig } from '#imports'

export const serverFirebaseAuth = (event: H3Event): Auth => {
  const { public: { firebase: { cookies: cookieOptions } } } = useRuntimeConfig()

  if (!event.context._firebaseAuth) {
    const token = getCookie(event, `${cookieOptions.name}-access-token`)
    const auth = getAuth()

    event.context._firebaseAuth = auth
    event.context._token = token
  }

  return event.context._firebaseAuth as Auth
}
