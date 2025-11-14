<script setup lang="ts">
interface dataUser{
    name:string,
    lastName:string,
    email:string,
    password:string,
    status:string,
    idRole:number,
    createBy:number |null,
    updateBy:number,
    idBranch:number | null,
    confirmPassword:string
}
interface item{
    value:number,
    label:string,
}


const user = ref<dataUser>({
   // Propiedades que ya tenías:
    name: "",
    lastName: "",

    // Propiedades completadas con valores iniciales:
    email: "",
    password: "",
    status: "active", // o el valor por defecto que uses
    idRole: 0,        // o el valor de rol por defecto
    createBy: null,   // null ya que el usuario aún no ha sido creado
    updateBy: 0,
    idBranch: null,
    confirmPassword:"",

})

interface UserData {
    name: string;
    lastName: string;
    email: string;
    Status: string; // Coincide con <Column field="Status"...
}

// 2. Creación de los datos de la tabla (Users)
// Usamos 'ref' para hacerlo reactivo, y el tipo es un array de UserData.
const Users = ref<UserData[]>([
    {
        name: "Ana",
        lastName: "Martínez",
        email: "ana.m@ejemplo.com",
        Status: "Activo",
    },
    {
        name: "Luis",
        lastName: "Gómez",
        email: "luis.g@ejemplo.com",
        Status: "Inactivo",
    },
    {
        name: "Sofía",
        lastName: "Ramírez",
        email: "sofia.r@ejemplo.com",
        Status: "Activo",
    },
]);
const rolUser = ref<item[]>([])
const itemsRoles = ref<item[]>([
    {
        value: 1,
        label: "Admin",
    },
    {
        value: 2,
        label: "Cajero",
    },
    { // Nuevo rol añadido
        value: 3,
        label: "Supervisor",
    }
])
</script>
<template>
    <div>
        <p-card class="my-8">
            <template #content>
                <div>
                
                   
                    <div class="card">
                        <p-fieldset 
                        legend="Crear Nuevo Usuario" 
                        :toggleable="true" 
                        :collapsed="true"
                        fluid
                        >
                        <div class="flex flex-col w-full">
                            <div class="grid md:grid-cols-2 gap-2 w-full">
                            <InputText 
                                id="Nombre" 
                                label="Nombre" 
                                type="text"
                                help="Ingrese el Nombre" 
                                v-model="user.name"

                            />
                            <InputText 
                                id="Apellido" 
                                label="Apellido" 
                                type="text"
                                help="Ingrese el Apellido" 
                                v-model="user.lastName"

                            />
                            
                        </div>

                        <div>
                            <InputText 
                             id="email"
                             lable="Correo"
                             type="email"
                             help="Ingrese el Correo"
                             v-model="user.email"
                            />
                        </div>
                        <div>
                            <InputSelect
                             id="rol"
                             label="Rol"
                             help="Seleccione el Rol"
                             v-model="rolUser" 
                             :items="itemsRoles"
                            />
                        </div>
                        <div class="grid md:grid-cols-2 gap-2 ms:grid-cols-1">
                            <InputPassword 
                             id="Password"
                             label="Contraseña"
                             type="password"
                             help="Ingrese la Contraseña"
                             v-model="user.password"
                            />
                            <InputPassword 
                             id="PasswordCofi"
                             label="Confirmar Contraseña"
                             type="password"
                             help="Confirme la Contraseña"
                             v-model="user.confirmPassword"
                            />
                        </div>
                        <p-button label="Crear Cuenta" class=" text-black"/>
                        </div>

                    



                        </p-fieldset>
                    </div>

                    <p-card class="my-5">
                        <template #content>
                            <div class="">
                         <div class="card">
                            <p-dataTable :value="Users" tableStyle="min-width: 50rem">
                                <p-column field="name" header="Nombre"></p-column>
                                <p-column field="lastName" header="Apellido"></p-column>
                                <p-column field="email" header="Correo"></p-column>
                                 <p-column field="role" header="Rol"></p-column>
                                <p-column field="Status" header="Estado"></p-column>
                            </p-dataTable>
                        </div>
                    </div>
                        </template>
                    </p-card>


                    
                </div>

            </template>
        </p-card>
    </div>
</template>