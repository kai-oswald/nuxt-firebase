<template>
  <div v-if="user">
    Welcome {{ user.displayName }}!
  </div>
</template>
<script setup lang="ts">
const user = useFirebaseUser()
</script>
