import { useFirebaseUser } from '../composables/useFirebaseUser'
import { redirectToLogin } from '../utils/redirect'
import { defineNuxtPlugin, addRouteMiddleware } from '#imports'

export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-auth', (to) => {
    const user = useFirebaseUser()
    if (!user.value) {
      return redirectToLogin(to.path)
    }
  }, { global: true })
})
