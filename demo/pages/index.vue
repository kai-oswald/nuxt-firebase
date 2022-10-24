<script setup lang="ts">
import { signInWithPopup, GithubAuthProvider } from '@firebase/auth'
const user = useFirebaseUser()
watchEffect(() => {
  if (user.value) {
    navigateTo('/profile')
  }
})

async function signIn () {
  const auth = useFirebaseAuth()
  await signInWithPopup(auth, new GithubAuthProvider())
}
</script>

<template>
  <div style="height: 100vh; display: flex; flex-direction: column; max-width: 600px; margin: auto; justify-content: center">
    <h2 style="text-align: center;">
      Sign in to your account
    </h2>
    <button @click="signIn">
      Connect with GitHub
    </button>
  </div>
</template>
