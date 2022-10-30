# Vue composables

This module contains some Vue composables that you can use.

## `useFirebaseApp`
Access the firebase `app` instance. This function also initializes the `firebaseApp` when called the first time.

```ts
const app = useFirebaseApp()
```

## `useFirebaseAuth`
Access the firebase `auth` instance. Only use inside functions.

```ts
onMounted(() => {
    const auth = useFirebaseAuth()
})
```

## `useFirebaseFunctions`
Access the firebase `functions` instance.

```ts
const functions = useFirebaseFunctions()
```

## `useFirebaseToken`
Holds the access token that is saved as cookie.

```ts
const token = useFirebaseToken()
```

## `useFirebaseUser`
A reactive binding to the currently signed in user.

```ts
const user = useFirebaseUser()
```

## `useFirestore`
Access the firebase `firestore` instance.

```ts
const db = useFirestore()
```

