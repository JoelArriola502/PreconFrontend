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

const visible = ref(false)
const options = ref(['Línia de Tiempo', 'Comprobantes'])
const selectedOption = ref('Línia de Tiempo')
const isMobile = ref(false);
const events = ref([
    { status: 'Creado', date: '15/10/2020 10:30', icon: 'pi pi-plus', user: 'María Gonzáles', role: 'Cajero', color: 'bg-yellow-400' },
    { status: 'En Revisión', date: '15/10/2020 14:00', icon: 'pi pi-eye', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-orange-500' },
    { status: 'Pausada', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-blue-400' },
    { status: 'Cancelada', date: '16/10/2020 10:00', icon: 'pi pi-check', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-red-500' },
    { status: 'Confirmada', date: '16/10/2020 10:00', icon: 'pi pi-check', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-green-500' }
]);
function statusIcon(status: string) {
    switch (status) {
        case 'Confirmada': return 'pi pi-check-circle'
        case 'En Revisión': return 'pi pi-search'
        case 'Pausada': return 'pi pi-pause'
        case 'Cancelada': return 'pi pi-times-circle'
        case 'Creado': return 'pi pi-plus-circle'
        case 'Todos': return 'pi pi-list'
        default: return 'pi pi-question-circle'
    }
}

function colorStatus(status: string) {
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
const loading = ref(false)
onMounted(() => {
    const check = () => isMobile.value = window.innerWidth < 900;
    check();
    window.addEventListener('resize', check);
});
</script>
<template>
    <div class="flex flex-col gap-2">

        <p-card #content class="flex">

            <div class="flex justify-between ">
                <h1 class=" text-2xl font-bold">Gestión de Solicitudes</h1>
                <NuxtLink to="/Request/New">
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
                <div class="flex justify-end gap-2">
                    <NuxtLink :to="`/Request/${idRequest}`" v-if="roleUser != 4">
                        <p-button label="Confirmar" severity="success" class="" />
                    </NuxtLink>
                    <p-tag value=" Confirmada" severity="success" class="rounded mr-2 pi pi-verified  p-2" />
                    <p-button label="" severity="secondary" class="pi pi-eye rounded-full" @click="visible = true" />
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
                    <NuxtLink :to="`/Request/${idRequest}`" v-if="roleUser != 4">
                        <p-button label="Confirmar" severity="success" class="" />
                    </NuxtLink>
                    <p-tag value=" Confirmada" severity="success" class=" rounded mr-2 pi pi-verified  p-2" />

                    <p-button label="" severity="secondary" class="pi pi-eye rounded-full" @click="visible = true" />

                </div>
            </div>

        </p-card>
        <p-paginator :rows="10" :total-records="120" />
        <p-dialog class="card w-full  mx-auto" v-model:visible="visible" modal>
            <div>
                <p-card #content class="  mb-5">
                    <div class="flex justify-between">
                        <p class=" text-2xl font-bold">SOL-2025-005</p>
                        <p-tag severity="primary" rounded class=" font-bold p-2">
                            <i class="pi pi-plus-circle"></i> Creado</p-tag>
                    </div>
                </p-card>
                <div class=" bg-yellow-200">
                    <p-select-button :options="options" fluid v-model="selectedOption" />
                </div>
                <p-card #content class="mt-5" v-if="selectedOption === 'Línia de Tiempo'">
                    <div class="">
                        <p-timeline :value="events" :align="isMobile ? 'left' : 'alternate'"
                            class="w-full -ml-4 text-sm md:text-base">
                            <template #marker="slotProps">
                                <span
                                    :class="['flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm ', slotProps.item.color]">
                                    <i :class="slotProps.item.icon"></i>
                                </span>
                            </template>
                            <template #content="slotProps">
                                <p-card class="mt-4 outline  outline-yellow-100">
                                    <template #title>
                                        <div class="flex ">
                                            <div class="flex flex-col md:flex-row md:justify-between w-full">
                                                <p-tag class="text-sm md:text-base"
                                                    :severity="colorStatus(slotProps.item.status)" rounded>
                                                    {{ slotProps.item.status }}
                                                </p-tag>
                                                <p class="pi pi-calendar p-2 text-sm md:text-base">{{
                                                    slotProps.item.date }}</p>
                                            </div>
                                        </div>

                                    </template>
                                    <template #subtitle>
                                        <div>
                                            <div class="flex gap-2 text-sm md:text-base">
                                                <p>{{ slotProps.item.user }} </p>
                                                <p>({{ slotProps.item.role }})</p>
                                            </div>
                                        </div>

                                    </template>
                                    <template #content>

                                        <div class="flex">
                                            <p class="flex">
                                                comentario de prueba
                                            </p>
                                        </div>
                                        <Button label="Read more" variant="text"></Button>
                                    </template>
                                </p-card>

                            </template>

                        </p-timeline>
                    </div>
                </p-card>
                <p-card #content class="mt-5 bg-yellow-50" v-if="selectedOption === 'Comprobantes'">
                    <div>
                        <div>
                            <div class="flex justify-between">
                                <div class="flex gap-2">
                                    <i
                                        class="pi pi-images content-center bg-yellow-500 p-2 text-4xl text-amber-50 rounded-xl"></i>
                                    <div>
                                        <p class="font-bold text-xl">Comprobante</p>
                                        <p>Transferencia</p>
                                    </div>
                                </div>
                                <div class="flex flex-col  gap-2">
                                    <p class="font-bold  text-xl ">Q3,200</p>
                                    <p>2025-01-23</p>
                                </div>
                            </div>
                            <PPanel class=" w-full my-2" header="Ver Comprobante" toggleable :collapsed="true" fluid>

                                <div class=" flex justify-center">
                                    <img src="~/assets/img/logo.png" alt=""></img>
                                </div>
                            </PPanel>

                        </div>
                    </div>

                </p-card>


            </div>
        </p-dialog>

    </div>
</template>
