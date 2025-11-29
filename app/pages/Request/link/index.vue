<script lang="ts" setup>
definePageMeta({middleware:["auth"]})
type Status = 'Creado' | 'En Revisión' | 'Confirmada' | 'Pausada' | 'Cancelada'

function buttonColor(status: 'Todos' | Status) {
  switch (status) {
    case 'Confirmada': return 'success'
    case 'En Revisión': return 'info'
    case 'Pausada': return 'warn'
    case 'Cancelada': return 'danger'
    case 'Creado': return 'primary'
    case 'Todos': return 'secondary'
    default: return 'secondary'
  }
}
const statusButton: Array<'Todos' | Status> = [
  'Todos', 
  'Creado', 
  'En Revisión', 
  'Confirmada', 
  'Pausada', 
  'Cancelada'
]
const loading = ref(false)
</script>
<template>
    <div class="flex flex-col gap-2">

        <p-card #content class="flex">
            
            <div class="flex justify-between">
                <h2 class=" text-1 text-black">Gestión de Solicitudes</h2>
                <NuxtLink to="/Request/New">
                    <p-button 
                    class="pi pi-plus" 
                    label=" Crear Solicitud "/>
                </NuxtLink>
            </div>

        </p-card>
        <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 items-center w-full" >
           <p-button
            v-for="status in statusButton"
            :key="status"
            :label="status"
            severity="secondary"
            raised 
           
            
            class="rounded-2 "
            />
            
        </div>
        <p-progress-spinner
        v-if="loading"
        />
        <div class="flex ">
    
         <InputText
         type="search"
         placeholder="Buscar Solicitud..."
         class=" w-full"
         />
        </div>
        <p-card #content class=" bg-yellow-50">
            <div class="grid md:grid-cols-2 lg:gap-2 items-center w-full ">
                <div>
                    <div class="flex gap-2">
                        <h1>SOL-2024-001</h1>
                        <P>Juan Perez</P>
                    </div>
                    <div class="flex gap-2 my-5">
                        <p><i class="pi pi-calendar "/> 14/1/2025</p>
                        <p>Q8,500</p>
                    </div>
                </div>
                <div class="flex justify-end">
                    <p-button
                     label=" Confirmada"
                     severity="success"
                     class=" rounded-full mr-2 pi pi-verified"
                    />
                     <NuxtLink to="/Request/LineTime">
                    <p-button
                     label="" 
                     severity="secondary"
                     class="pi pi-eye rounded-full"
                    />
                    </NuxtLink>
                </div>
            </div>

        </p-card>
        <p-card #content class=" bg-yellow-50">
            <div class="grid md:grid-cols-2 lg:gap-2 items-center w-full ">
                <div>
                    <div class="flex gap-2">
                        <h1>SOL-2024-001</h1>
                        <P>Juan Perez</P>
                    </div>
                    <div class="flex gap-2 my-5">
                        <p><i class="pi pi-calendar "/> 14/1/2025</p>
                        <p>Q8,500</p>
                    </div>
                </div>
                <div class="flex justify-end">
                    <p-button
                     label=" Confirmada"
                     severity="success"
                     class=" rounded-full mr-2 pi pi-verified"
                    />
                    <NuxtLink to="/Request/LineTime">
                    <p-button
                     label="" 
                     severity="secondary"
                     class="pi pi-eye rounded-full"
                    />
                    </NuxtLink>
                </div>
            </div>

        </p-card>
        <p-paginator
         :rows="10"
         :total-records="120"
        />

    </div>
</template>
