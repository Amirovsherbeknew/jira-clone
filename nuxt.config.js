export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    devtools: true,
    title: "Jira_clone",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // Fontawesome config
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        integrity:
          "sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
      // Iconify config
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@iconify/iconify@3.0.0/font-icons.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // Global css, tailwind css
  css: ["~/assets/css/main.css", "~/assets/css/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/ant-design-vue", ssr: true },
    "~/plugins/router.ts",
    "~/plugins/axios.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: "~/components", pathPrefix: false, extensions: ["vue"] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["vue2-editor/nuxt", "@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Tailwind config
  build: {
    // Resolving @nuxtjs/axios issues related to import & require
    transpile: ["axios"], // Add this line
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
