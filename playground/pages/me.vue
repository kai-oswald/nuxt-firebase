<template>
  <div v-if="user">
    <h2>
      Authenticated as {{ user.email }}!
    </h2>
    <button @click="fetchMeFromServerRoute">
      Fetch me from server route!
    </button>
    <pre>
        {{ userFromServer }}
    </pre>
    <button @click="fetchDataFromServerRoute">
      Fetch data from server route!
    </button>
    <pre>
        {{ dataFromServer }}
    </pre>
    <input v-model="item" type="text">
    <button @click="addItem">
      Set status
    </button>
    <div>Your status: {{ status?.text }}</div>
  </div>
</template>
<script setup lang="ts">
import { onSnapshot, setDoc, doc } from 'firebase/firestore'
const user = useFirebaseUser()
const userFromServer = ref(null)
const dataFromServer = ref(null)
const status = ref(null)
const item = ref(null)

onMounted(() => {
  const db = useFirestore()
  const unsub = onSnapshot(doc(db, 'status', user.value.uid), (item) => {
    if (!item.exists) { return }
    status.value = item.data()
  })
})

async function addItem () {
  const db = useFirestore()
  await setDoc(doc(db, 'status', user.value.uid), {
    text: item.value
  })

  item.value = null
}

const fetchMeFromServerRoute = async () => {
  const { data } = await useFetch('/api/me', { headers: useRequestHeaders(['cookie']) })
  userFromServer.value = data.value
}

const fetchDataFromServerRoute = async () => {
  const { data } = await useFetch('/api/data', { headers: useRequestHeaders(['cookie']) })
  dataFromServer.value = data.value
}
</script>
