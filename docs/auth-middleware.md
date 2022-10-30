# Auth middleware
You can protect your authenticated routes by creating a custom middleware in your project. For example `middleware/auth.ts`
```ts
export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useFirebaseUser()
  if (!user.value) {
    return navigateTo('/login')
  }
})
```

Then you can reference your middleware in your page with:
```ts
definePageMeta({
  middleware: 'auth'
})
```