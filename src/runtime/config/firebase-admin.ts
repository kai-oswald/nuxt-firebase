import { initializeApp } from 'firebase-admin/app'
import admin from 'firebase-admin'

// TODO: how to use with runtimeconfig?
// Keys must be present in .env file this way.
const credOptions = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
}

const app = initializeApp({
  credential: admin.credential.cert(credOptions)
})

export default app
