import { serverFirebaseUser } from '#firebase/server'

defineEventHandler((event) => {
  const user = serverFirebaseUser(event)

  return user ?? 'User not signed in.'
})
