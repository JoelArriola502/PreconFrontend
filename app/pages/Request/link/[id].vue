<script lang="ts" setup>
const options = ref(['Línia de Tiempo', 'Comprobantes'])
const selectedOption = ref('Línia de Tiempo')
const { alertSuccess, alertError} = useAlert()
const isMobile = ref(false);
const visible = ref(false)
const paymentLink = ref('')
const events = ref([
    { status: 'Creado', date: '15/10/2020 10:30', icon: 'pi pi-file-edit', user: 'María González', role: 'Cajero', color: 'bg-blue-500' },
    { status: 'En Revisión', date: '15/10/2020 14:00', icon: 'pi pi-search', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-yellow-500' },
    { status: 'Link Enviado', date: '15/10/2020 15:30', icon: 'pi pi-send', user: 'María González', role: 'Cajero', color: 'bg-purple-500' },
    { status: 'Pago Realizado', date: '15/10/2020 16:45', icon: 'pi pi-credit-card', user: 'Cliente', role: 'Cliente', color: 'bg-indigo-500' },
    { status: 'Confirmada', date: '16/10/2020 09:00', icon: 'pi pi-check-circle', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-green-500' },
    { status: 'Pausada', date: '15/10/2020 16:15', icon: 'pi pi-pause', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-orange-500' },
    { status: 'Cancelada', date: '16/10/2020 10:00', icon: 'pi pi-times-circle', user: 'Carlos Ruiz', role: 'Tesorero', color: 'bg-red-500' }
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
        case 'Creado': return 'primary'
        case 'En Revisión': return 'info'
        case 'Link Enviado': return 'info'
        case 'Pago Realizado': return 'help'
        case 'Confirmada': return 'success'
        case 'Pausada': return 'warn'
        case 'Cancelada': return 'danger'
        case 'Todos': return 'primary'
        default: return 'secondary'
    }
}
const copyLink = async() =>{
  try {
    await navigator.clipboard.writeText(paymentLink.value);
    
    alertSuccess('Enlace copiado!')
    
  } catch (err) {
    console.error('Error al copiar:', err);
    alertError('Error al copiar')
    
  }
}
onMounted(() => {
    const check = () => isMobile.value = window.innerWidth < 900;
    check();
    window.addEventListener('resize', check);
});
  </script>
<template>
    <div>
        <p-toast></p-toast>
                <p-card #content class="  mb-5">
                    <div class="flex justify-between">
                            <p class=" text-2xl font-bold">SOL-2025-005</p>
                          
                        <NuxtLink to="/Request/link">
                            <p-button 
                         label="Regresar"
                         severity="secondary"
                        />
                        </NuxtLink>
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
                                   
                                </div>
                            </PPanel>

                        </div>
                    </div>

                     <p-card class="my-2">
            <template #title>
              <div class="flex gap-2">
                <p-tag  icon="pi pi-file-pdf"
                 severity="danger"
                 class=" font-bold text-2xl"
                />
                <span class="font-bold">Oferta Cargada</span>
              </div>
              
            </template>
            <template #content>
              <div class="flex flex-col gap-2">
                <div >
                  <p class=""><i  class="pi pi-calendar "></i> 10/01/2025</p>
                </div>
                <p-button  icon="pi pi-eye" label="Ver Documento" @click="visible=true"/>

              </div>
                <div class="flex mt-2">
            <PInputText 
               label="Enlace de Pago"
               class=" rounded-none rounded-l-lg"
               v-model="paymentLink"
              fluid
               
            />
            
             <p-button 
             class="rounded-none rounded-r-lg"
             icon="pi pi-copy"
             @click="copyLink()"
             
             />

           </div>

            </template>
          </p-card>

                </p-card>

  <p-dialog v-model:visible="visible" modal class="w-full">
        <div class="w-full h-full border-2">
            <iframe src="https://www.uma.es/ejemplo-grupo-de-investigacion/navegador_de_ficheros/repositorio-grupos-de-investigacion/descargar/documentaci%C3%B3n%20becas%20junta/documento%20de%20prueba.pdf" frameborder="0"
              class="border-none w-full"
               width="100%" 
  height="600px"
            ></iframe>
          </div>
    </p-dialog>
            </div>
</template>


