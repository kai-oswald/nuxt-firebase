<template>
  <form style="display:flex; align-items: center; flex-direction: column;" @submit.prevent="login">
    <input type="email" v-model="email" required />
    <input type="password" v-model="password" required />
    <button>Sign in</button>
  </form>
</template>

<script setup lang="ts">
const email = ref(null)
const password = ref(null)

async function login () {
  await signIn(email.value, password.value)
}
</script>
