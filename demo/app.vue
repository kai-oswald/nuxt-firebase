<template>
  <div>
    <button v-if="user" @click="logout">
      logout
    </button>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { signOut } from 'firebase/auth'
const user = useFirebaseUser()
async function logout () {
  const auth = useFirebaseAuth()
  await signOut(auth)
  watch(user, () => {
    if (!user.value) {
      navigateTo('/')
    }
  })
}
</script>
