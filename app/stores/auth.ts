import { defineStore } from 'pinia'

interface data {
    success: boolean,
    message: string,
    token: string,
    user: user,
}

interface user {
    id: number,
    name: string,
    lastName: string,
    email: string,
    role: number,
    idBranch: number | null,
}

interface State {
    status?: boolean | string,
    user?: user,
    token?: string,

}

const initialstate = (): State => ({
    status: undefined,
    user: undefined,
    token: undefined,


})

export const useAuthStore = defineStore("auth", {
    state: initialstate,
    actions: {
        init() {
            
            if (process.client) {

                const status = localStorage.getItem("status")
                const user = localStorage.getItem("user")
                const token = localStorage.getItem("token")

                if (status) {

                    try {
                        this.status = JSON.parse(status)
                    } catch {
                        this.status = status
                    }
                }
                if (token) {
                    this.token = token
                }
                if (user) {
                    try {
                        this.user = JSON.parse(user) as user;

                    } catch (error) {
                        console.error("error al pasar data desde locaStorage", error)
                        this.user = undefined
                    }

                }
            }


        },
        async login(params: { email: string; passwordHash: string }) {
            try {
                const response = await $fetch<data>("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        email: params.email,
                        passwordHash: params.passwordHash
                    }
                })
               
                if (response.token) {
                
                    this.status = response.success
                    this.user = response.user
                    this.token = response.token
                    localStorage.setItem("status", JSON.stringify(response.success))
                    localStorage.setItem("user", JSON.stringify(response.user))
                    localStorage.setItem("token", response.token)
                }
               
              

            } catch (error) {
                console.error("Error al inicar sesión ", error)
                throw new Error(
                    "Error al iniciar sesión. Por Favor, Intenta de nuevo."
                );
            }

        },
        logout() {
            this.$reset()
            localStorage.removeItem("status")
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            navigateTo("/auth/login")
        }

    }
})
