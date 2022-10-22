<template>
  <div>
    <button v-if="user" @click="logout">
      logout
    </button>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const user = useFirebaseUser()
async function logout () {
  await signOut()
  watch(user, () => {
    if (!user.value) {
      navigateTo('/')
    }
  })
}
</script>
