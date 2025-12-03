<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] })
const auth = useAuthStore()
type Status = 'Todos' | 'Creado' | 'En Revisión' | 'Link Enviado' | 'Pago Realizado' | 'Confirmada' | 'Pausada' | 'Cancelada'
const roleUser = auth.user?.role
const idRequest = ref(1)

const statusButton = ref([
    { label: 'Todos', value: 'Todos' },
    { label: 'Creado', value: 'Creado' },
    { label: 'En Revisión', value: 'En Revisión' },
    { label: 'Link Enviado', value: 'Link Enviado' },
    { label: 'Pago Realizado', value: 'Pago Realizado' },
    { label: 'Confirmada', value: 'Confirmada' },
    { label: 'Pausada', value: 'Pausada' },
    { label: 'Cancelada', value: 'Cancelada' },
]);
const selectedStatus = ref<string>('Confirmada')
const selectStatus = (state: string | Status) => {
    selectedStatus.value = state;
};

function buttonColor(status: Status | string) {
    switch (status) {
        case 'Creado': return 'primary'
        case 'En Revisión': return 'info'
        case 'Link Enviado': return 'contrast'
        case 'Pago Realizado': return 'help'
        case 'Confirmada': return 'success'
        case 'Pausada': return 'warn'
        case 'Cancelada': return 'danger'
        case 'Todos': return 'primary'
        default: return 'secondary'
    }
}





const loading = ref(false)

</script>
<template>
    <div class="flex flex-col gap-2">

        <p-card #content class="flex">

            <div class="flex justify-between ">
                <h1 class=" text-2xl font-bold">Solicitudes de Pago con Tarjeta</h1>
                <NuxtLink to="/Request/link/new">
                    <p-button class="pi pi-plus" label=" Crear Solicitud " />
                </NuxtLink>
            </div>

        </p-card>
        <div class="grid grid-cols-3  md:grid-cols-6 gap-2 items-center w-full">
            <p-button v-for="status in statusButton" :key="status.value" :label="status.label" raised :severity="selectedStatus === status.value
                ? buttonColor(status.value)
                : 'secondary'" :class="['rounded-2 ']" @click="selectStatus(status.value)" />

        </div>
        <p-progress-spinner v-if="loading" />
        <div class="flex ">

            <InputText type="search" placeholder="Buscar Solicitud..." class=" w-full" />
        </div>
        <p-card #content class=" bg-yellow-50">
            <div class="grid md:grid-cols-2 lg:gap-2 items-center w-full ">
                <div>
                    <div class="flex gap-2">
                        <h1>SOL-2024-001</h1>
                        <P>Juan Perez</P>
                    </div>
                    <div class="flex gap-2 my-5">
                        <p><i class="pi pi-calendar " /> 14/1/2025</p>
                        <p>Q8,500</p>
                    </div>
                </div>
                <div class="flex justify-end gap-2 ">
                    <NuxtLink :to="`/Request/link/validationRequest/${idRequest}`" v-if="roleUser != 4">
                        <p-button label="Evaluar Solicitud" severity="info" class="" />
                    </NuxtLink>
                    <p-tag value=" Confirmada" severity="success" class="rounded  pi pi-verified  p-2" />
                   
                    <NuxtLink :to="`/Request/link/${idRequest}`">
                       
                         <p-button icon="pi pi-eye" severity="secondary"/>
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
                        <p><i class="pi pi-calendar " /> 14/1/2025</p>
                        <p>Q8,500</p>
                    </div>
                </div>
                <div class="flex justify-end gap-2">
                    <NuxtLink :to="`/Request/link/validationRequest/${idRequest}`" v-if="roleUser != 4">
                        <p-button label="Evaluar Solicitud" severity="info" class="" />
                    </NuxtLink>
                    <p-tag value=" Confirmada" severity="success" class=" rounded  pi pi-verified  p-2" />
                      <NuxtLink :to="`/Request/link/${idRequest}`" >
                       
                         <p-button icon="pi pi-eye" severity="secondary"/>
                    </NuxtLink>

                </div>
            </div>

        </p-card>
        <p-paginator :rows="10" :total-records="120" />
        
    </div>
</template>
