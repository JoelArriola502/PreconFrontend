import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = (nuxtApp as any).$pinia
  if (!pinia) return
  const auth = useAuthStore(pinia)
  // llamar init lo antes posible
  auth.init()
})
