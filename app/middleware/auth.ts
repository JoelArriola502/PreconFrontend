import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.user) {
    auth.init()
  }

  if (to.path.includes('/auth') && auth.user) {
    return navigateTo('/')
  }
  if (!to.path.includes('/auth') && !auth.user) {
    return navigateTo('/auth/login')
  }
  if (to.path.includes('/register') && auth.user?.role !== 1) {
    return navigateTo('/')
  }
})
