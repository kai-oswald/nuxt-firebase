### Read documents

```vue
<script setup lang="ts">
import { onSnapshot, doc } from 'firebase/firestore'
const status = ref(null)

onMounted(() => {
  const db = useFirestore()
  onSnapshot(doc(db, 'status', user.value.uid), (item) => {
    status.value = item.data()
  })
})
</script>
```

### Write documents

```vue
<script setup lang="ts">
import { setDoc, doc } from 'firebase/firestore'
const item = ref(null)

async function addItem () {
  const db = useFirestore()
  await setDoc(doc(db, 'status', user.value.uid), {
    text: item.value
  })
}
</script>
```