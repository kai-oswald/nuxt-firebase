<template>
  <div v-if="user">
    <button @click="logout">
      logout
    </button>
    <div>
      Welcome {{ user.displayName ?? user.email }}!
    </div>
    <button @click="fetchMeFromServerRoute">
      Fetch me from server route!
    </button>
    <pre>
        {{ userFromServer }}
    </pre>
    <input v-model="item" type="text">
    <button @click="addItem">
      Set status
    </button>
    <div>Your status: {{ status?.text }}</div>
  </div>
</template>
<script setup lang="ts">
import { getDoc, setDoc, doc } from 'firebase/firestore/lite'
const user = useFirebaseUser()
const userFromServer = ref(null)
const status = ref(null)
const item = ref(null)
const db = useFirestore()

onMounted(async () => {
  const item = await getDoc(doc(db, 'status', user.value.uid))
  status.value = item.exists() ? item.data() : ''
})

async function addItem () {
  await setDoc(doc(db, 'status', user.value.uid), {
    text: item.value
  })

  item.value = null
}

const fetchMeFromServerRoute = async () => {
  const { data } = await useFetch('/api/me', { headers: useRequestHeaders(['cookie']) })
  userFromServer.value = data.value
}

async function logout () {
  const auth = useFirebaseAuth()
  await auth.signOut()
  watch(user, () => {
    if (!user.value) {
      navigateTo('/')
    }
  })
}
</script>
