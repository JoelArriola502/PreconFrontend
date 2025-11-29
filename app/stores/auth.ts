// /stores/auth.ts
import { defineStore } from 'pinia'

interface IUser {
  id: number
  name: string
  lastName: string
  email: string
  role: number
  idBranch: number | null
}

interface ILoginResponse {
  success: boolean
  message: string
  token: string
  user: IUser
}

interface State {
  status?: boolean | string
  user?: IUser | null
  token?: string | null
}

const defaultState = (): State => ({
  status: undefined,
  user: null,
  token: null
})

export const useAuthStore = defineStore('auth', {
  state: (): State => defaultState(),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 1
  },

  actions: {
    // init: carga desde localStorage (solo cliente)
    init() {
      if (!process.client) return // proteger SSR

      try {
        const status = localStorage.getItem('status')
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (status !== null) {
          try { this.status = JSON.parse(status) } catch { this.status = status }
        }

        if (user !== null) {
          try { this.user = JSON.parse(user) as IUser } catch (err) {
            console.error('Error parseando user desde localStorage', err)
            this.user = null
          }
        }

        if (token !== null) {
          this.token = token
        }

      } catch (err) {
        console.error('Error inicializando auth store', err)
      }
    },

    // login: llama al API y guarda en store + localStorage (cliente)
    async login(params: { email: string; passwordHash: string }) {
      try {
        // $fetch está disponible en Nuxt; si tu proyecto lo requiere, puedes usar useNuxtApp().$fetch
        const response = await $fetch<ILoginResponse>('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            email: params.email,
            passwordHash: params.passwordHash
          }
        })

        if (response && response.token) {
          this.status = response.success
          this.user = response.user
          this.token = response.token

          if (process.client) {
            localStorage.setItem('status', JSON.stringify(response.success))
            localStorage.setItem('user', JSON.stringify(response.user))
            localStorage.setItem('token', response.token)
          }
        } else {
          throw new Error(response?.message || 'Sin token en respuesta')
        }

      } catch (error) {
        console.error('Error al iniciar sesión', error)
        // propaga para que el componente muestre el error
        throw error
      }
    },

    // logout: resetea store y localStorage, y redirige
    logout(redirect = true) {
      this.$reset()
      if (process.client) {
        localStorage.removeItem('status')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
      if (redirect) navigateTo('/auth/login')
    },

    // opcional: actualizar token / user
    setToken(token: string | null) {
      this.token = token
      if (process.client) {
        if (token) localStorage.setItem('token', token)
        else localStorage.removeItem('token')
      }
    },

    setUser(user: IUser | null) {
      this.user = user
      if (process.client) {
        if (user) localStorage.setItem('user', JSON.stringify(user))
        else localStorage.removeItem('user')
      }
    }
  }
})
