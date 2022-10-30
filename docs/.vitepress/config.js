export default {
  title: "Nuxt Firebase",
  description: "Firebase module for Nuxt",
  base: "/nuxt-firebase/",
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kai-oswald/nuxt-firebase' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'Vue composables', link: '/vue-composables' },
          { text: 'Server services', link: '/server-services' },
          { text: 'Auth middleware', link: '/auth-middleware' },
        ]
      },
      {
        text: 'Cookbook',
        items: [
          { text: 'Auth', link: '/cookbook/auth' },
          { text: 'Firestore', link: '/cookbook/firestore' },
          { text: 'Server user', link: '/cookbook/server-user' }
        ]
      }
    ]
  }
}