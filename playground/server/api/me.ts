import { serverFirebaseUser } from '#firebase/server'
export default defineEventHandler(async (event) => {
  const user = await serverFirebaseUser(event)

  if (!user) {
    event.res.statusCode = 400
    return 'Must be signed in'
  }

  return user
})
