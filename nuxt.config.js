const webpack = require("webpack");
export default {
  ssr:false,
  // loading: '~/components/LoadingApp',
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "AMR CoP",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: "https://code.jquery.com/jquery-3.3.1.slim.min.js" },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/stylesheets/fontawesome/css/font-awesome.min.css",
    // '~/assets/stylesheets/styles-admin.scss',
    "~/assets/scss/custom.scss",
    "~/layouts/global.css",
    "quill/dist/quill.snow.css",
    // 'quill/dist/quill.bubble.css',
    "quill/dist/quill.core.css",
    "leaflet/dist/leaflet.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/vue-quill-editor.js", ssr: false },
    { src: "~plugins/bootstrap-single.js", ssr: false },
    { src: "~plugins/image-upload.js", ssr: false },
    { src: "~plugins/axios-config.js", ssr: false },
    { src: "~plugins/input-tags.js", ssr: false },
    { src: "~plugins/infiniteloading.js", ssr: false },
    { src: "~plugins/lightbox.client.js", ssr: false },
    { src: "~plugins/leaflet.js", ssr: false },
    { src: "~/plugins/vue2-leaflet-markercluster.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  bootstrapVue: {
    bootstrapCSS: false,
    icons: true
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/auth-next"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "https://amrcopfe.ncdc.gov.ng/api/v1"
    // baseURL: "http://127.0.0.1:8000/api/v1"
  },
  auth: {
    redirect: false,
    strategies: {
      local: {
        // autoFetchUser:false,
        token: {
          property: "access_token",
          // required: true,
          type: "Bearer"
        },
        user: {
          property: false, // <--- Default "user"
          autoFetch: true
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/user/profile", method: "get" }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ],
    babel: {
      compact: true
    }
  }
};
