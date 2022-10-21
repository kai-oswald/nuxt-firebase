<template>
  <div v-if="user">
    <h2>
      Authenticated as {{ user.displayName }}!
    </h2>
    <button @click="fetchMeFromServerRoute">
      Fetch me from server route!
    </button>
    <pre>
        {{ userFromServer }}
    </pre>
  </div>
</template>
<script setup lang="ts">
const user = useFirebaseUser()
const userFromServer = ref(null)

const fetchMeFromServerRoute = async () => {
  const { data } = await useFetch('/api/me', { headers: useRequestHeaders(['cookie']) })
  userFromServer.value = data.value
}
</script>
