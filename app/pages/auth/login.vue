<script setup lang="ts">
import { FetchError} from 'ofetch'
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: false, 
  middleware:["auth"],
  
})
interface user {
    email: string,
    password: string,
}
const user: user = reactive({
    email: '',
    password: '',
})

const auth = useAuthStore()
const toast = useToast();
const fieldsValidationAlert = async (
  severity: "success" | "info" | "warn" | "error",
  summary: string,
  messages: string
) => {
  toast.add({
    severity,
    summary,
    detail: messages,
    life: 3000,
  });
};
const fetchLogin = async ()=>{
    try{
        const response = await auth.login({
          email:user.email,
          passwordHash:user.password
        })
       
    fieldsValidationAlert(
      "success",
      "Éxito",
      "Has iniciado sesión correctamente."
    );
    setTimeout(() => {
      navigateTo("/");
    }, 2000);
    return response

    }catch(error){
         if (error instanceof FetchError) {
      console.error("Fetch Error:", error);
    } else {
      console.error("An unexpected error occurred:", error);
    }

    }
}
</script>
<template>
    <div class="grid justify-items-center my-10">
        <p-toast></p-toast>
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
                    <p-button label="Iniciar Sesión" class=" text-gray-950 " @click="fetchLogin"/>
                </div>
            </template>
        </p-card>
    </div>
</template>