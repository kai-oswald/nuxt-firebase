import { fileURLToPath } from 'url'
import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addServerHandler, createResolver, resolveModule, addTemplate } from '@nuxt/kit'
import type { FirebaseOptions } from 'firebase/app'
import type { CookieOptions, RedirectOptions } from './runtime/types'

export interface ModuleOptions {
  /**
   * Firebase client options that are passed to `initializeApp`
   * @default {}
   * @type object
   * @docs https://firebase.google.com/docs/reference/js/v8/firebase#initializeapp
   */
   config: FirebaseOptions

  /**
   * Firebase private key for firebase-admin
   * @default process.env.FIREBASE_PRIVATE_KEY
   * @example '-----BEGIN PRIVATE KEY-----\n1234=\n-----END PRIVATE KEY-----\n'
   * @type string
   * @docs https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account
   */
  privateKey: string

  /**
   * Firebase project id for firebase-admin
   * @default process.env.FIREBASE_PROJECT_ID
   * @example 'your-project'
   * @type string
   * @docs https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account
   */
  projectId: string

  /**
   * The firebase client email for firebase-admin
   * @default process.env.FIREBASE_CLIENT_EMAIL
   * @example 'firebase-adminsdk-1234@your-project.iam.gserviceaccount.com'
   * @type string
   * @docs https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account
   */
   clientEmail: string

  /**
   * Redirection options
   * @default false
   * @type object | boolean
   */
  redirect?: RedirectOptions | boolean

  /**
   * Firebase Cookie options
   * @default {
      name: 'fb',
      lifetime: 60 * 60 * 8,
      domain: '',
      path: '/',
      sameSite: 'lax'
    }
   * @type object
   */
  cookies?: CookieOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@oswld/nuxt-firebase',
    configKey: 'firebase',
    compatibility: {
      nuxt: '^3.0.0-rc.12'
    }
  },
  defaults: {
    config: {},
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    redirect: false,
    cookies: {
      name: 'fb',
      lifetime: 60 * 60 * 8,
      domain: '',
      path: '/',
      sameSite: 'lax'
    }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    // firebase admin available?
    if (!options.projectId) {
      // eslint-disable-next-line no-console
      console.warn('Missing `FIREBASE_PROJECT_ID` in `.env`. `firebase-admin` not available.')
    }
    if (!options.privateKey) {
      // eslint-disable-next-line no-console
      console.warn('Missing `FIREBASE_PRIVATE_KEY` in `.env`. `firebase-admin` not available.')
    }
    if (!options.clientEmail) {
      // eslint-disable-next-line no-console
      console.warn('Missing `FIREBASE_CLIENT_EMAIL` in `.env`. `firebase-admin` not available.')
    }

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.firebase = defu(nuxt.options.runtimeConfig.public.firebase, {
      config: options.config,
      redirect: options.redirect,
      cookies: options.cookies
    })

    // Private runtimeConfig
    nuxt.options.runtimeConfig.firebase = defu(nuxt.options.runtimeConfig.firebase, {
      projectId: options.projectId,
      privateKey: options.privateKey,
      clientEmail: options.clientEmail
    })

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add firebase server plugin to load the user on server-side
    addPlugin(resolve(runtimeDir, 'plugins', 'firebase.server'))
    addPlugin(resolve(runtimeDir, 'plugins', 'firebase.client'))
    addPlugin(resolve(runtimeDir, 'plugins', 'auth-redirect'))

    // Add firebase session endpoint to store the session on server-side
    addServerHandler({
      route: '/api/_firebase/session',
      handler: resolve(runtimeDir, 'server/api/session')
    })

    // Add firebase composables
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}

      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
      nitroConfig.alias['#firebase/server'] = resolveRuntimeModule('./server/services')
    })

    addTemplate({
      filename: 'types/firebase.d.ts',
      getContents: () => [
        'declare module \'#firebase/server\' {',
        `  const serverFirebaseAdmin: typeof import('${resolve('./runtime/server/services')}').serverFirebaseAdmin`,
        `  const serverFirebaseAuth: typeof import('${resolve('./runtime/server/services')}').serverFirebaseAuth`,
        `  const serverFirebaseUser: typeof import('${resolve('./runtime/server/services')}').serverFirebaseUser`,
        '}'
      ].join('\n')
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push({ path: resolve(nuxt.options.buildDir, 'types/firebase.d.ts') })
    })
  }
})
