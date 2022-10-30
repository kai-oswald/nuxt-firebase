# Server services

This module also includes `firebase-admin/*` services that you can use on the server-side.

## `serverFirebaseAdmin`
Allows access to various `firebase-admin/*` service instances.

```ts
import { serverFirebaseAdmin } from '#firebase/server'

export default defineEventHandler(async (event) => {
  const { firestore, functions, app } = await serverFirebaseAdmin(event)
})

```

## `serverFirebaseAuth`
Holds the initialized instance of `firebase-admin/auth`
```ts
import { serverFirebaseAuth } from '#firebase/server'

export default defineEventHandler(async (event) => {
  const auth = await serverFirebaseAuth(event)
})
```

## `serverFirebaseUser`
Get the current authenticated user on the server-side.
```ts
// server/api/user.ts
import { serverFirebaseUser } from '#firebase/server'

export default defineEventHandler(async (event) => {
  const user = await serverFirebaseUser(event)
})
```

If you want to call this route on SSR, please read this [section](https://v3.nuxtjs.org/getting-started/data-fetching/#isomorphic-fetch-and-fetch), you must send your browser cookies including your firebase token.

```ts
const user = ref(null)
const { data } = await useFetch('/api/user', {
  headers: useRequestHeaders(['cookie'])
})
user.value = data
```