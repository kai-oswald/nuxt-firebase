# Firestore
Use `firestore/lite` in your app.

### Read documents

```vue
<script setup lang="ts">
import { getDoc, doc } from 'firebase/firestore/lite'
const status = ref(null)

onMounted(async () => {
  const db = useFirestore()
  const item = await getDoc(doc(db, 'status', user.value.uid))
  status.value = item.data()
})
</script>
```

### Write documents

```vue
<script setup lang="ts">
import { setDoc, doc } from 'firebase/firestore/lite'
const item = ref(null)

async function addItem () {
  const db = useFirestore()
  await setDoc(doc(db, 'status', user.value.uid), {
    text: item.value
  })
}
</script>
```