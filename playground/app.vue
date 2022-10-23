<template>
  <div>
    <div style="display: flex; justify-content: space-between;">
      <h1>
        Firebase module playground
      </h1>
      <button v-if="user" style="height: fit-content;" @click="logout">
        Logout
      </button>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth'
const user = useFirebaseUser()

const logout = async () => {
  const auth = useFirebaseAuth()
  // Trick to wait for the authChanged event to have been fired
  await signOut(auth)

  watch(user, () => {
    if (!user.value) {
      navigateTo('/')
    }
  })
}
</script>
