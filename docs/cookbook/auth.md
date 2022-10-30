### Sign in
```vue
<script setup lang="ts">
import { signInWithPopup, GithubAuthProvider } from '@firebase/auth'
const user = useFirebaseUser()
watchEffect(() => {
  // listen for `onAuthStateChanged`
  if (user.value) {
    navigateTo('/profile')
  }
})

async function signIn () {
  const auth = useFirebaseAuth()
  await signInWithPopup(auth, new GithubAuthProvider())
}
</script>
```

### Sign out

```vue
<script setup lang="ts">
const user = useFirebaseUser()

async function logout () {
  const auth = useFirebaseAuth()
  await auth.signOut()

  // wait until user is logged out, then navigate back to login
  watch(user, () => {
    if (!user.value) {
      navigateTo('/login')
    }
  })
}
</script>
```