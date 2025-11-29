 import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to) => { 
  const auth = useAuthStore()
 
  console.log("esta aquia en el status true",auth.token,auth.status)
  if (!auth.token) {
    await auth.init()
  }
if (to.path.includes('/auth') && auth.token) {
    console.log('[middleware auth] usuario autenticado — redirigiendo a /')
    return navigateTo('/')
  }

  if (!to.path.includes('/auth') && !auth.token) {
    console.log('[middleware auth] usuario no autenticado — redirigiendo a /auth/login')
    return navigateTo('/auth/login')
  }
  
 
  if (to.path.includes("/register") && auth.user?.role !== 1) {
    return navigateTo("/");
  }
  


})