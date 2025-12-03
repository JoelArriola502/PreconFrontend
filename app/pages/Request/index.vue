<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] })
const auth = useAuthStore()
type Status = 'Todos' | 'Creado' | 'En Revisión' | 'Confirmada' | 'Pausada' | 'Cancelada'

function buttonColor(status: Status | string) {
    switch (status) {
        case 'Confirmada': return 'success'
        case 'En Revisión': return 'info'
        case 'Pausada': return 'warn'
        case 'Cancelada': return 'danger'
        case 'Creado': return 'primary'
        case 'Todos': return 'primary'
        default: return 'secondary'
    }
}
const roleUser = auth.user?.role
const idRequest = ref(1)
const search = ref('')

const statusButton = ref([
    { label: 'Todos', value: 'Todos' },
    { label: 'Creado', value: 'Creado' },
    { label: 'En Revisión', value: 'En Revisión' },
    { label: 'Confirmada', value: 'Confirmada' },
    { label: 'Pausada', value: 'Pausada' },
    { label: 'Cancelada', value: 'Cancelada' },
]);
const selectedStatus = ref<string>('Confirmada')
const selectStatus = (state: string | Status) => {
    selectedStatus.value = state;
};

const isMobile = ref(false);

const loading = ref(false)

</script>
<template>
    <div class="flex flex-col gap-2">

        <p-card #content class="flex">

            <div class="flex justify-between ">
                <h1 class=" text-2xl font-bold">Gestión de Solicitudes</h1>
                <NuxtLink to="/request/New">
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

            <InputText id="search" type="search" placeholder="Buscar Solicitud..." fluid  v-model="search"/>
        </div>
        <p-card #content class=" bg-yellow-50">
            <div class="grid md:grid-cols-2 lg:gap-2 items-center w-full ">
                <div>
                    <div class="flex gap-2">
                        <h1>SOL-2024-001</h1>
                        <p>Juan Perez</p>
                    </div>
                    <div class="flex gap-2 my-5">
                        <p><i class="pi pi-calendar " /> 14/1/2025</p>
                        <p>Q8,500</p>
                    </div>
                </div>
                <div class="flex justify-end gap-2">
                    <NuxtLink :to="`/request/${idRequest}`" v-if="roleUser != 4">
                        <p-button label="Confirmar" severity="success" class="" />
                    </NuxtLink>
                    <p-tag value=" Confirmada" severity="success" icon="pi pi-verified" class="" />
                    <NuxtLink :to="`/request/LineTime/${idRequest}`">
                        <p-button icon="pi pi-eye" label="" severity="secondary" class=" rounded-full" />

                    </NuxtLink>
                </div>
            </div>

        </p-card>
        <p-card #content class=" bg-yellow-50">
            <div class="grid md:grid-cols-2 lg:gap-2 items-center w-full ">
                <div>
                    <div class="flex gap-2">
                        <h1>SOL-2024-001</h1>
                        <p>Juan Perez</p>
                    </div>
                    <div class="flex gap-2 my-5">
                        <p><i class="pi pi-calendar " /> 14/1/2025</p>
                        <p>Q8,500</p>
                    </div>
                </div>
                <div class="flex justify-end gap-2">
                    <NuxtLink :to="`/request/${idRequest}`" v-if="roleUser != 4">
                        <p-button label="Confirmar" severity="success" class="" />
                    </NuxtLink>
                    <p-tag value=" Confirmada" severity="success" icon="pi pi-verified" class="" />
                    <NuxtLink :to="`/request/LineTime/${idRequest}`">
                        <p-button icon="pi pi-eye" label="" severity="secondary" class=" rounded-full" />

                    </NuxtLink>


                </div>
            </div>

        </p-card>
        <p-paginator :rows="10" :total-records="120" />
       
    </div>
</template>
