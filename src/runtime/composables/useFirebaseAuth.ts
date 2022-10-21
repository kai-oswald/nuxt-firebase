import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth'

export const signIn = async (email: string, password: string) => {
  const auth = getAuth()
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOut = async () => {
  const auth = getAuth()
  return await auth.signOut()
}
