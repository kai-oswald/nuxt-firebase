import { type Functions } from 'firebase/functions'
import { useNuxtApp } from '#imports'

export const useFirebaseFunctions = (): Functions => {
  const { $firebasFunctions } = useNuxtApp()
  return $firebasFunctions
}
