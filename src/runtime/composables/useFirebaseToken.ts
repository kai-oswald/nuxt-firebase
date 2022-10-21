import { useCookie, useRuntimeConfig } from '#imports'

export const useFirebaseToken = () => {
  const { firebase: { cookies: cookieOptions } } = useRuntimeConfig().public
  const cookieName = `${cookieOptions.name}-access-token`

  return useCookie(cookieName)
}
