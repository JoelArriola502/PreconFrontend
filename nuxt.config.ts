// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:[
    '@primevue/nuxt-module'
  ],
  css:['./app/assets/css/main.css'],
   vite: {
    plugins: [
      tailwindcss(),
    ],
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
