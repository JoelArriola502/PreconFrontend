<script setup lang="ts">
const confirm = useConfirm();
const toast = useToast();
const loading = ref(false)
const visibleEdit = ref(false)
const disabled = ref(true)
const update = ref(false)
interface Client {
    firstName: string
    lastName: string
    nit: string
    phone: string
    code: string
    municipality: string
    address: string
    fiscalAddress: string
    deliveryAddress: string
}

const dataClient = ref<Client[]>([
    {
        firstName: "Juan Carlos",
        lastName: "González Pérez",
        nit: "1234567-1",
        phone: "7777-1234",
        code: "CL-001",
        municipality: "Guatemala",
        address: "Zona 1, 5a Avenida 10-55",
        fiscalAddress: "Zona 1, 5a Avenida 10-55",
        deliveryAddress: "Bodega Central, Zona 4"
    },
    {
        firstName: "María Fernanda",
        lastName: "López Ramírez",
        nit: "2345678-2",
        phone: "5566-7788",
        code: "CL-002",
        municipality: "Mixco",
        address: "Colonia El Milagro, Calle B",
        fiscalAddress: "Colonia El Milagro, Calle B",
        deliveryAddress: "Centro de Distribución Mixco"
    },
    {
        firstName: "José Alejandro",
        lastName: "Sánchez Díaz",
        nit: "3456789-3",
        phone: "6644-3322",
        code: "CL-003",
        municipality: "Villa Nueva",
        address: "Colonia Linda Vista, Manzana 3",
        fiscalAddress: "Colonia Linda Vista, Manzana 3",
        deliveryAddress: "Planta de Entrega Zona 12"
    },
    {
        firstName: "Ana Lucía",
        lastName: "Martínez Herrera",
        nit: "4567890-4",
        phone: "7733-8899",
        code: "CL-004",
        municipality: "Escuintla",
        address: "Barrio San José, 4a Calle",
        fiscalAddress: "Barrio San José, 4a Calle",
        deliveryAddress: "Sucursal Escuintla"
    },
    {
        firstName: "Carlos Eduardo",
        lastName: "Pérez Molina",
        nit: "5678901-5",
        phone: "8877-2211",
        code: "CL-005",
        municipality: "Retalhuleu",
        address: "Zona 2, Calle Principal",
        fiscalAddress: "Zona 2, Calle Principal",
        deliveryAddress: "Bodega Retalhuleu"
    },
    {
        firstName: "Sofía Alejandra",
        lastName: "Ortiz López",
        nit: "6789012-6",
        phone: "9900-4411",
        code: "CL-006",
        municipality: "Quetzaltenango",
        address: "Cantón San Bartolomé",
        fiscalAddress: "Cantón San Bartolomé",
        deliveryAddress: "Centro de Reparto Xela"
    },
    {
        firstName: "Miguel Ángel",
        lastName: "Hernández Ruiz",
        nit: "7890123-7",
        phone: "4411-9900",
        code: "CL-007",
        municipality: "Mazatenango",
        address: "Barrio Las Flores, Casa 12",
        fiscalAddress: "Barrio Las Flores, Casa 12",
        deliveryAddress: "Punto de Entrega Mazate"
    },
    {
        firstName: "Diana Patricia",
        lastName: "Ramírez Gómez",
        nit: "8901234-8",
        phone: "6677-5533",
        code: "CL-008",
        municipality: "Chimaltenango",
        address: "Zona 3, 2a Calle",
        fiscalAddress: "Zona 3, 2a Calle",
        deliveryAddress: "Sucursal Chimal"
    },
    {
        firstName: "Luis Alberto",
        lastName: "Castañeda López",
        nit: "9012345-9",
        phone: "7744-8822",
        code: "CL-009",
        municipality: "Antigua Guatemala",
        address: "Calle del Arco, No. 16",
        fiscalAddress: "Calle del Arco, No. 16",
        deliveryAddress: "Centro de Entrega Antigua"
    },
    {
        firstName: "Paola Andrea",
        lastName: "Méndez Castro",
        nit: "0123456-0",
        phone: "5522-6644",
        code: "CL-010",
        municipality: "San Marcos",
        address: "Cantón El Rosario",
        fiscalAddress: "Cantón El Rosario",
        deliveryAddress: "Bodega San Marcos"
    }
])


const confirm1 = () => {
    confirm.require({
        message: '¿Desea crear este cliente?',
        header: 'Confirmación de registro',
        icon: 'pi pi-check',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: ' Confirmar',
            severity: 'success',
            class: 'pi pi-check'
        },
        accept: () => {
            toast.add({
                severity: 'success',
                summary: 'Cliente registrado',
                detail: 'El cliente fue creado correctamente.',
                life: 3000
            });
        },
        reject: () => {
            toast.add({
                severity: 'warn',
                summary: 'Acción cancelada',
                detail: 'El registro del cliente fue cancelado.',
                life: 3000
            });
        }
    });
};

const editClient = async() =>{
 disabled.value=false
 update.value=true
}
const cancelEdit = async()=>{
    disabled.value= true
    update.value= false
    visibleEdit.value = false
}
</script>
<template>
    <div>
        <p-toast />
        <PConfirmDialog></PConfirmDialog>
        <p-card #content>
            <div class="flex gap-2 justify-between">
                <h1 class=" text-2xl font-bold">Nuevo Cliente</h1>
                <NuxtLink to="/Request/link/new">
                    <p-button label="Regresar" severity="secondary" />
                </NuxtLink>
            </div>

        </p-card>

        <p-card class="my-2" #content>
            <p-fieldset legend="Nuevo Cliente" :toggleable="true" :collapsed="true" fluid>

                <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                    <InputText label="Nombres del Cliente" help="Ingrese el Nombre del Cliente" />
                    <InputText label="Apellidos del cliente" help="Ingrese el Apellido del cliente" />
                    <InputText label="NIT" help="Ej: 12345678" />

                    <InputNumber label="Teléfono" help="Ej: 7777-1234" />
                    <InputText label="Código SAP" help="Agrege el Código Generado para el Cliente" />

                    <div class="flex flex-col gap-2">
                        <label for="">
                            Municipio
                        </label>
                        <p-auto-complete fluid />
                        <small>Seleccione un municipio</small>
                    </div>


                </div>
                <div class="w-full">
                    <div class="flex flex-col gap-2">
                        <label for="">
                            Dirección
                        </label>
                        <p-textarea fluid />
                        <small>Ingrese la Dirección Residencial o Comercial</small>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="">
                            Dirección Fiscal
                        </label>
                        <p-textarea fluid />
                        <small>Ingrese la Dirección Para la Facturación</small>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="">
                            Dirección De Entrega
                        </label>
                        <p-textarea fluid />
                        <small>Ingrese la Dirección Para la Entrega del Pedido</small>
                    </div>


                </div>
                <div class="flex justify-end gap-2">

                    <p-button label=" Crear Cliente" class="pi pi-check" severity="success" @click="confirm1()" />

                </div>

            </p-fieldset>

        </p-card>

        <p-card #content>
            <div class="card">
                <PDataTable :value="dataClient"  class=" flex justify-center">
                    <template #empty>
                        <div v-if="loading" class="flex flex-col justify-center">
                            <UiAlertLoading :value="loading" label="Cargando..." />
                        </div>
                        <div class="card flex justify-center">
                            <p v-if="!loading">No se encuentran Clientes</p>
                        </div>
                    </template>
                    <PColumn key="code" field="code" header="Código">
                        <template #body="{ data }">
                            <div class=" ">
                                <span>{{ data.code }}</span>

                            </div>
                        </template>
                    </PColumn>
                    <PColumn key="firstName" field="firstName" header="Nombres">
                        <template #body="{ data }">
                            <div>
                                <span>{{ data.firstName }}</span>
                            </div>
                        </template>
                    </PColumn>
                    <PColumn field="lastName" header="Apellidos">
                        <template #body="{ data }">
                            <div>
                                <span>{{ data.lastName }}</span>
                            </div>
                        </template>
                    </PColumn>
                    <PColumn field="nit" header="NIT">
                        <template #body="{ data }">
                            <div>
                                <span>{{ data.nit }}</span>
                            </div>
                        </template>
                    </PColumn>
                    <PColumn field="phone" header="Teléfono">
                        <template #body="{ data }">
                            <div>
                                <span>{{ data.phone }}</span>
                            </div>
                        </template>
                    </PColumn>

                    <PColumn field="action" header="Acciones">
                        <template #body="{ data }">
                            <div class="flex gap-2">
                                <p-button class="pi pi-eye" severity="info" />
                                <p-button class="pi pi-pencil" severity="primary" @click="visibleEdit=true"/>
                                <p-button class="pi pi-trash" severity="danger" />
                            </div>

                        </template>

                    </PColumn>

                </PDataTable>
                <p-paginator :rows="10" :total-records="120">

                </p-paginator>
            </div>
        </p-card>

        <p-dialog
         v-model:visible="visibleEdit"
         header="Actualizar Datos del Cliente"
        >

        <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                    <InputText  label="Nombres del Cliente" help="Ingrese el Nombre del Cliente"  :disabled="disabled"/>
                    <InputText label="Apellidos del cliente" help="Ingrese el Apellido del cliente"  :disabled="disabled"/>
                    <InputText label="NIT" help="Ej: 12345678"  :disabled="true"/>

                    <InputNumber label="Teléfono" help="Ej: 7777-1234"  :disabled="true" />
                    <InputText label="Código" help="Agrege el Código Generado para el Cliente"  :disabled="disabled" />

                    <div class="flex flex-col gap-2">
                        <label for="">
                            Municipio
                        </label>
                        <p-auto-complete fluid 
                        :disabled="disabled"
                        />
                        <small>Seleccione un municipio</small>
                    </div>


                </div>
                <div class="w-full">
                    <div class="flex flex-col gap-2">
                        <label for="">
                            Dirección
                        </label>
                        <p-textarea fluid 
                         :disabled="disabled"/>
                        <small>Ingrese la Dirección Residencial o Comercial</small>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="">
                            Dirección Fiscal
                        </label>
                        <p-textarea fluid 
                         :disabled="disabled"/>
                        <small>Ingrese la Dirección Para la Facturación</small>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="">
                            Dirección De Entrega
                        </label>
                        <p-textarea fluid
                         :disabled="disabled" />
                        <small>Ingrese la Dirección Para la Entrega del Pedido</small>
                    </div>


                </div>
                <div class="flex justify-end gap-2">
                    

                    <p-button 
                     label="Cancelar"
                     severity="secondary"
                     outlined 
                      @click="cancelEdit"
                      
                    />
                     <p-button label=" Editar " class="pi pi-pencil" severity="info" @click="editClient()" v-if="update ===false"/>
                    <p-button label=" Actualizar Cliente" class="pi pi-check" severity="success" @click="confirm1()" v-if="update===true" />

                </div>

        </p-dialog>
    </div>
</template>