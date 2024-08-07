import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ',
    title: 'United Doctors',
    htmlAttrs: {
      lang: 'en',
    },
      // script: [
      //   {
      //     src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyAhqMvzQfbz32EvGw0Jga5wQ-NuDYjrMIo&libraries=places`,
      //     defer: true
      //   }
      // ],
  
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },

      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;900&amp;display=swap',
    },],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/_global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-slick' },
    { src: '~/plugins/apexcharts', mode: 'client' },
    { src: '~/plugins/vue-svg-inline-plugin.client.js' },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/toast.js', mode: 'client' },
    { src: '~/plugins/vue-google-places.js', mode: 'client' },
    { src: '~/plugins/jquery.js', ssr: false },
    { src: '~/plugins/vue2-google-maps.js', mode: 'client' },
    
    '~/plugins/pusher.js',
    '~/plugins/eventBus.js',
    '~/plugins/axios.js'
  ],
  env: {
    googlePlacesApiKey: 'AIzaSyAhqMvzQfbz32EvGw0Jga5wQ-NuDYjrMIo'
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
    'nuxt-webfontloader',
    '@nuxtjs/axios',

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://be.unitedoctors.online/api/v1/'
    // baseURL:'http://127.0.0.1:8000/api/v1/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false,
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#D23F57',
          secondary: '#0F3460',
          success: '#33D067',
          danger: '#FF5353',
          warning: '#FFCD4E',
          warning: '#FF8A48',
          info: '#5e5ce6',
          dark: '#242939',
          black: '#242939',
          background: '#f2f3f8',
          color: '#0F3460',
          grey: '#AEB4BE',
        },
      },
    },
  },
  // webfontloader: {
  //   google: {
  //     families: ['Open+Sans:wght@300;400;600;700;800'],
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
