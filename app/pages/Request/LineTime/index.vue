<script lang="ts" setup>
definePageMeta({middleware:["auth"]})
const visible = ref(false)
const options = ref(['Línia de Tiempo','Comprobantes'])
const selectedOption = ref('Línia de Tiempo')
const isMobile = ref(false);
const events = ref([
    { status: 'Creado', date: '15/10/2020 10:30', icon: 'pi pi-plus',user:'María Gonzáles',role:'Cajero', color: 'bg-yellow-400'},
    { status: 'En Revisión', date: '15/10/2020 14:00', icon: 'pi pi-eye',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-orange-500' },
    { status: 'Pausada', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-blue-400' },
    { status: 'Cancelada', date: '16/10/2020 10:00', icon: 'pi pi-check',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-red-500' },
    { status: 'Confirmada', date: '16/10/2020 10:00', icon: 'pi pi-check',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-green-500' }
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

function colorStatus(status: string ) {
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
onMounted(() => {
  const check = () => isMobile.value = window.innerWidth < 768;
  check();
  window.addEventListener('resize', check);
});
</script>
<template>
  <div>
    <p-card #content class="  mb-5">
     <div class="flex justify-between">
      <p>SOL-2025-005</p>
      <p-tag 
      severity="primary" 
      rounded 
      class=" font-bold p-2">
      <i class="pi pi-plus-circle"></i> Creado</p-tag>
     </div>
    </p-card>
    <div  class=" bg-yellow-200">
      <p-select-button
       :options="options"
       fluid
      
       v-model="selectedOption"
      
      />
    </div>
    <p-card #content class="mt-5" v-if="selectedOption === 'Línia de Tiempo'">
      <div class="">
      <p-timeline :value="events":align="isMobile ? 'left' : 'alternate'"
       
      class="w-full -ml-4 text-sm md:text-base">
        <template #marker="slotProps">
                <span :class="['flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm ', slotProps.item.color]">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
        <template #content="slotProps">
            <p-card class="mt-4 outline  outline-yellow-100">
              <template #title>
                <div class="flex ">
                  <div class="flex flex-col md:flex-row md:justify-between w-full">
                    <p-tag
                    class="text-sm md:text-base"
                     :severity="colorStatus(slotProps.item.status)"
                     rounded
                    >
                      {{  slotProps.item.status }}
                    </p-tag>
                    <p class="pi pi-calendar p-2 text-sm md:text-base">{{ slotProps.item.date }}</p>
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
    <p-card #content class="mt-5 bg-yellow-50" v-if="selectedOption==='Comprobantes'">
      <div >
        <div >
          <div class="flex justify-between">
           <div class="flex gap-2">
             <i class="pi pi-images content-center bg-yellow-500 p-2 text-4xl text-amber-50 rounded-xl"></i>
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
          <PPanel 
         class=" w-full my-2"

            header="Ver Comprobante"
            toggleable 
            :collapsed="true"
            fluid
           >

           <div class=" flex justify-center">
            <img src="~/assets/img/logo.png" alt=""></img>
           </div>
         </PPanel >

        </div>
      </div>

    </p-card>


  </div>
</template>

<style>

</style>