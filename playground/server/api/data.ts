import { serverFirebaseAdmin, serverFirebaseUser } from '#firebase/server'
export default defineEventHandler(async (event) => {
  const user = await serverFirebaseUser(event)

  if (!user) {
    event.res.statusCode = 400
    return 'Must be signed in'
  }

  const { firestore: db } = serverFirebaseAdmin(event)

  const doc = await db.collection('status').doc(user.uid).get()
  const status = doc.data()
  return status
})
