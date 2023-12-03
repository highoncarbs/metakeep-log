const config = {
  static_path: process.env.NODE_ENV !== 'production' ? 'http://localhost:8888' : 'https://cdn.jaitexart.org',
  static_base: process.env.NODE_ENV !== 'production' ? 'http://0.0.0.0:5151/static/uploads/' : 'https://saas-space.ams3.cdn.digitaloceanspaces.com/',
  apiserver: process.env.NODE_ENV !== 'production' ? '127.0.0.1' : 'p-api.jaitexart.org',
  apiserver_port: process.env.NODE_ENV !== 'production' ? '5151' : '443',
}


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pim-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/basic.js',
    '~/plugins/image.js',
    '~/plugins/bar.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    host: config.apiserver,
    https: process.env.NODE_ENV != 'production' ? false : true,
    port: config.apiserver_port,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
