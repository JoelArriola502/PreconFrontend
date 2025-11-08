<script setup lang="ts">
interface user {
    email: string,
    password: string,
}
const user: user = reactive({
    email: '',
    password: '',
})
</script>
<template>
    <div class="grid justify-items-center my-10">
        <p-card class="my-8">
            <template #content>
                <div class="flex flex-col">
                        <div class="grid justify-items-center gap-4">
                            <div class="flex justify-items-center">
                                <img class="w-40" src="@/assets/img/logo.png" alt="">
                            </div>
                            <div>
                                <h1 class=" text-2xl font-bold">Iniciar Sesión</h1>
                            </div>
                            <div>Ingresa tus credenciales para acceder al sistema

                            </div>
                        </div>
                    <div class="gap-2 py-5">
                        <InputText 
                        
                        id="Correo" 
                        label="correo Electronico" 
                        type="email"
                        help="Ingrese su correo Electronico" 
                        v-model="user.email" />

                        <InputPassword 
                        id="password" 
                        label="Contraseña" 
                        type="password" 
                        required
                        help="Ingrese su contraseña" 
                        v-model="user.password" />
                        
                    </div>
                    <p-button label="Iniciar Sesión" class=" text-gray-950 "/>
                </div>
            </template>
        </p-card>
    </div>
</template>