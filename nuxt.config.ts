// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:['@primevue/nuxt-module', '@pinia/nuxt'],
  css: ['@/assets/css/main.css'],
   vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig:{
    urlApi: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },
  

 primevue: {
   autoImport: true,
   importTheme: { from: '@/themes/myTheme.js' },
        options: {
            ripple: true,
            inputVariant: 'filled',
         
        },
        components: {
        include: '*',
        prefix:'p',
    },
    
    
   
    }

})