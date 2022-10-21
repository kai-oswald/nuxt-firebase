import { serverFirebaseAuth } from '#firebase/server'

export default defineEventHandler(async (event) => {
  const auth = serverFirebaseAuth(event)
  const token = event.context._token

  if (!token) {
    event.res.statusCode = 400
    return 'Must be signed in'
  }

  const decodedToken = await auth.verifyIdToken(token)

  const user = await auth.getUser(decodedToken?.uid)
  return user
})
