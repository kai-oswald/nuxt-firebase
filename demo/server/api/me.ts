import { serverFirebaseUser } from '#firebase/server'

export default defineEventHandler(async (event) => {
  const user = await serverFirebaseUser(event)

  return user ?? 'User not signed in.'
})
