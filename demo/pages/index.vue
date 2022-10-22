<script setup lang="ts">
const user = useFirebaseUser()
watchEffect(() => {
  if (user.value) {
    navigateTo('/profile')
  }
})
</script>

<template>
  <div style="height: 100vh; display: flex; flex-direction: column; max-width: 600px; margin: auto; justify-content: center">
    <h2 style="text-align: center;">
      Sign in to your account
    </h2>
    <LoginForm />
  </div>
</template>
