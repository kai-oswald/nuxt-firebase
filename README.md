> [!NOTE]
> This lib was created when [Vuefire](https://github.com/vuejs/vuefire) wasn't Nuxt 3 ready yet, but it is now in a good state. I recommend using [Vuefire](https://github.com/vuejs/vuefire) instead of this one

# nuxt-firebase module

> [Firebase](https://firebase.google.com/) module for [Nuxt](https://v3.nuxtjs.org)

[Docs](https://kai-oswald.github.io/nuxt-firebase/)
[Demo](https://nuxt3-firebase-demo.netlify.app/)

## Features

- Nuxt 3 ready
- Vue 3 composables
- Modular Mode (Firebase v9+)
- Usage in API server routes
- Authentication support
- TypeScript support

## Quick Setup

1. Add `@oswld/nuxt-firebase` dependency to your project
```
# using yarn
yarn add --dev @oswld/nuxt-firebase

# using npm
npm i --save-dev @oswld/nuxt-firebase
```

2. Add `@oswld/nuxt-firebase` to the `modules` section of `nuxt.config.ts`
```
{
    modules: [
        '@oswld/nuxt-firebase'
    ],   
}
```

3. Add your firebase config to the `firebase` section of `nuxt.config.ts`
```
{
    firebase: {
        config: firebaseConfig
    }
}
```

4. Add config for `firebase-admin`.
These must currently be present on process.env, so add them to your environment variables:
```
// .env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n1234\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-1234@your-firebase-project.iam.gserviceaccount.com"
FIREBASE_PROJECT_ID="your-firebase-project"
```


That's it! You can now use firebase in your Nuxt app ✨

### Vue Composables
- `useFirebaseUser`
- `useFirebaseApp`
- `useFirebaseAuth`
- `useFirebaseToken`
- `useFirebaseFunctions`
- `useFirestore`

### Server services
- `serverFirebaseAdmin`
- `serverFirebaseAuth`
- `serverFirebaseUser`


## Nuxt 2

If you are looking for a solution with Nuxt 2, checkout https://github.com/nuxt-community/firebase-module

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Prepare development server using `yarn dev:prepare` or `npm run dev:prepare`
4. Build module using `yarn build` or `npm build`
5. Launch playground using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)
