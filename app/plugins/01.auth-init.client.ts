// app/plugins/01.auth-init.client.ts
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  // debug: confirmar que existe $pinia
  const pinia = (nuxtApp as any).$pinia
  console.log('[plugin] nuxtApp.$pinia existe?', !!pinia)

  if (!pinia) {
    // Si por alguna razón no está disponible, salimos (no crash)
    console.warn('[plugin] Pinia no está disponible todavía. Saltando init()')
    return
  }

  // PASO IMPORTANTE: pasar la instancia de pinia al useAuthStore
  const auth = useAuthStore(pinia) // <- aquí aseguramos la instancia correcta
  // Llamamos a init (solo en cliente porque este archivo es .client.ts)
  auth.init()

  console.log('[plugin] auth.init() ejecutado en cliente - user:', auth.user)
})
