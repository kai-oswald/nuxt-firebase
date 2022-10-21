<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="email" type="email" required />
      <input v-model="password" type="password" required />
      <button>
        Log in
      </button>
    </form>

    -- or --

    <form @submit.prevent="loginOauth">
      <button>Log in with Github</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { signInWithPopup, GithubAuthProvider, getAuth } from 'firebase/auth'
const user = useFirebaseUser()

const email = ref(null)
const password = ref(null)
watchEffect(() => {
  if (user.value) {
    navigateTo('/me')
  }
})

const login = async () => {
  await signIn(email.value, password.value)
}

const loginOauth = async () => {
  await signInWithPopup(getAuth(), new GithubAuthProvider())
}
</script>
