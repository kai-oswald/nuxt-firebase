<script setup lang="ts">
import { signInWithPopup, signInWithEmailAndPassword, GithubAuthProvider } from '@firebase/auth'
const user = useFirebaseUser()

const email = ref('')
const password = ref('')
watchEffect(() => {
  if (user.value) {
    navigateTo('/profile')
  }
})

async function signIn () {
  const auth = useFirebaseAuth()
  await signInWithPopup(auth, new GithubAuthProvider())
}

async function signInWithEmail () {
  const auth = useFirebaseAuth()
  await signInWithEmailAndPassword(auth, email.value, password.value)
}
</script>

<template>
  <div style="height: 100vh; display: flex; flex-direction: column; max-width: 600px; margin: auto; justify-content: center">
    <h2 style="text-align: center;">
      Sign in to your account
    </h2>
    <form style="display:flex; flex-direction: column; padding: 1rem;" @submit.prevent="signInWithEmail">
      <label for="email" style="margin-top: .5rem">Email</label>
      <input id="email" v-model="email" type="email" required>
      <label for="password" style="margin-top: .5rem">Password</label>
      <input id="password" v-model="password" type="password" required>
      <button type="submit" style="margin-top: .5rem">
        Sign in with email
      </button>
    </form>
    <span>-- or --</span>
    <button @click="signIn">
      Connect with GitHub
    </button>
  </div>
</template>
