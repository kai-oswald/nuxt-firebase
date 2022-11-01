import type { Auth } from 'firebase/auth'
import type { FirebaseApp } from 'firebase/app'
import type { Firestore } from 'firebase/firestore/lite'
import type { Functions } from 'firebase/functions'

export interface CookieOptions {
    // (Optional) The cookie name prefix. Defaults to `fb` meaning the cookies will be `fb-access-token`.
    name?: string
    // (Optional) The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    lifetime?: number
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    domain?: string
    path?: string
    // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    sameSite?: string
}

export interface RedirectOptions {
    login: string
    callback?: string
}

declare module '#app' {
    interface NuxtApp {
      $firebaseApp: FirebaseApp;
      $firebaseAuth: Auth;
      $firebaseFirestore: Firestore;
      $firebaseFunctions: Functions;
    }
  }
