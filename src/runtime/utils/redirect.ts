import { useRuntimeConfig, navigateTo, useRouter } from '#imports'

export const redirectToLogin = (toPath) => {
  const router = useRouter()

  const redirect = useRuntimeConfig().public.firebase.redirect
  if (redirect && redirect.login) {
    // Do not redirect for login and callback pages
    if ([redirect.login, redirect.callback].includes(toPath)) {
      return
    }

    // Do not redirect if route not resolved by router (must return 404)
    if (!router.resolve(toPath).name) {
      return
    }

    return navigateTo(redirect.login)
  }
}
