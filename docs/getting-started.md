# Getting started
Checkout the [Nuxt 3](https://v3.nuxtjs.org/) documentation and [Firebase](https://firebase.google.com/docs/web/setup) to learn more.

## Installation

1. `@oswld/nuxt-firebase` as a dev dependency to your project:

```bash
npm i -D @oswld/nuxt-firebase 
```

2. Add `@oswld/nuxt-firebase` to the `modules` section of `nuxt.config.ts`:
```ts [nuxt.config.ts]
import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  modules: ['@oswld/nuxt-firebase'],
})
```

3. Add your Firebase configuration to the `firebase` section of `nuxt.config.ts`
```
{
    firebase: {
        config: firebaseConfig
    }
}
```

4. Add config for `firebase-admin` in `.env`
```
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n1234\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-1234@your-firebase-project.iam.gserviceaccount.com"
FIREBASE_PROJECT_ID="your-firebase-project"
```

That's it! You can now use firebase in your Nuxt app ✨

## Demo
A very basic demo is available at [https://nuxt3-firebase-demo.netlify.app/](https://nuxt3-firebase-demo.netlify.app/).