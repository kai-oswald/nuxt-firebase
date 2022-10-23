import { getApp } from 'firebase-admin/app'
import { getFunctions } from 'firebase-admin/functions'
import { getFirestore } from 'firebase-admin/firestore'
import type { H3Event } from 'h3'

export const serverFirebaseAdmin = (event: H3Event) => {
  if (!event.context._firebaseAdmin) {
    const app = getApp()

    event.context._firebaseAdmin = app
  }

  const firestore = getFirestore()
  const functions = getFunctions()

  return {
    firestore, functions, app: event.context._firebaseAdmin
  }
}
