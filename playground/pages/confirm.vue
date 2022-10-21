<script setup lang="ts">
const user = useFirebaseUser()

watchEffect(() => {
  if (user.value) {
    navigateTo('/me')
  }
})
</script>

<template>
  <p>
    Redirecting...
  </p>
</template>
