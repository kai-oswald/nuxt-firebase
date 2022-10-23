# nuxt-firebase module

> [Firebase](https://firebase.google.com/) module for [Nuxt](https://v3.nuxtjs.org)

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

That's it! You can now use firebase in your Nuxt app ✨

## Usage
More detailed documentation tbd.

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