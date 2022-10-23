import { type Functions, getFunctions } from 'firebase/functions'
import { useNuxtApp } from '#imports'

export const useFirebaseFunctions = (): Functions => {
  const nuxtApp = useNuxtApp()

  if (!nuxtApp._firebaseFunctions) {
    nuxtApp._firebaseFunctions = getFunctions()
  }
  return nuxtApp._firebaseFunctions
}
