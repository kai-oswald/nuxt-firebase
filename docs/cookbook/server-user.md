1. Add server api: `server/api/user.ts`:

```ts
import { serverFirebaseUser } from '#firebase/server'

export default defineEventHandler(async (event) => {
  const user = await serverFirebaseUser(event)

  return user ?? 'User not signed in.'
})
```

2. Call that api in your component (with cookies):

```vue
<script setup lang="ts">
const userFromServer = ref(null)

onMounted(async () => {
  await fetchUserFromServerRoute()
})

const fetchUserFromServerRoute = async () => {
  const { data } = await useFetch('/api/user', { headers: useRequestHeaders(['cookie']) })
  userFromServer.value = data.value
}
</script>
```