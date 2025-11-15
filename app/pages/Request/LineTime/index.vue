<script lang="ts" setup>
const visible = ref(false)
const options = ref(['Línia de Tiempo','Comprobantes'])
const selectedOption = ref('Línia de Tiempo')
const events = ref([
    { status: 'Creado', date: '15/10/2020 10:30', icon: 'pi pi-plus',user:'María Gonzáles',role:'Cajero', color: 'bg-yellow-400'},
    { status: 'En Revisión', date: '15/10/2020 14:00', icon: 'pi pi-eye',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-orange-500' },
    { status: 'Pausada', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-blue-400' },
    { status: 'Cancelada', date: '16/10/2020 10:00', icon: 'pi pi-check',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-red-500' },
    { status: 'Confirmada', date: '16/10/2020 10:00', icon: 'pi pi-check',user:'Carlos Ruiz',role:'Tesorero', color: 'bg-green-500' }
]);
</script>
<template>
  <div>
    <p-card #content class=" bg-yellow-50 mb-5">
     <div class="flex justify-between">
      <p>SOL-2025-005</p>
      <span class="p-2 bg-yellow-500 rounded-2xl text-lg text-amber-50">Creado</span>
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
      <div class="flex">
      <p-timeline :value="events" class="flex justify-baseline" align="alternate">
        <template #marker="slotProps">
                <span :class="['flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm ', slotProps.item.color]">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
        <template #content="slotProps">
            <p-card class="mt-4">
              <template #title>
                <div class="flex">
                  <div class="flex justify-between  w-full sm:text-sm">
                    <p :class="['flex rounded-full text-sm p-2 text-amber-50',slotProps.item.color]">{{ slotProps.item.status }}</p>
                    <p class="pi pi-calendar p-2">{{ slotProps.item.date }}</p>
                  </div>
                </div>

              </template>
              <template #subtitle>
                <div>
                  <div class="flex gap-2 text-sm">
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
          <p-button 
          label="Ver Comprobante"
          fluid
          @click="visible=true"
          class="my-2"
          severity="primary"
          />

        </div>
      </div>

    </p-card>

<p-dialog
 v-model:visible="visible"
>
  <div>
    <img src="~/assets/img/logo.png" alt="">
  </div>
</p-dialog>
  </div>
</template>

<style>

</style>