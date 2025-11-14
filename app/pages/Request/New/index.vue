
<script lang="ts" setup>
const formularios = ref([{ id: 1 }]);
const contadorId = ref<number>(1); // 'number' en minúscula, no 'Number'
const src = ref<any>()
const agregarFormulario = () => {
  contadorId.value++;
  formularios.value.push({ id: contadorId.value });
};

const eliminarFormulario = (index: number) => {
  if (formularios.value.length > 1) {
    formularios.value.splice(index, 1);
  }
};



function onFileSelect(event:any) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e:any) => {
        src.value = e.target.result;
    };

    reader.readAsDataURL(file);
}
</script>

<template>
  <div class="flex flex-col">
   <p-card #content>
   <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div>
      <h1>Crear Nueva Solicitud</h1>
    
    </div>
    <div class="flex justify-end ">
     <div class="">
          <NuxtLink to="">
            <p-button
              class="pi pi-plus"
              label=" Nuevo Cliente"
            />
          </NuxtLink>
        </div>
    </div>
   </div>

   </p-card>
   <p-card #content class="my-2">
    <div class="grid grid-cols-1">
      <div class="flex flex-col gap-2">
        <label for="">
          Cliente
        </label>
        <p-auto-complete
        class="flex w-full "
        
         fluid
        />
        <label for="">
          Comentario
        </label>
        <p-textarea/>
      </div>



    </div>


   </p-card>

   <p-card #content>
    <div class="">
      <div class="flex justify-between">
        <h3>Comprobantes {{ formularios.length }}</h3>
        <p-button
          class="pi pi-plus ms:text-xs"
          label=" Agregar"
          @click="agregarFormulario"
        />

      </div>
       <div 
      v-for="(item, index) in formularios" 
      :key="item.id"
      class="my-5 border-2 border-yellow-100 p-5 rounded-2xl bg-yellow-50"
    >
      <div class="flex justify-between">
        <p>Comprobante {{ index + 1 }}</p>
        
        <p-button
          class="pi pi-trash"
          severity="danger"
          @click="eliminarFormulario(index)"
          :disabled="formularios.length === 1"
        />
      </div>
      
      <div class="grid md:grid-cols-2 gap-2 my-5">
        <InputText
          label="Nombre del Banco"
          help="Ingrese el nombre del banco"
        />
        <InputText
          label="Número de Cuenta"
          help="Ingrese el número de cuenta del banco"
        />
        <InputText
          label="Número de Depósito"
          help="Ingrese el número de depósito"
        />
        <InputNumber 
          label="Monto a Pagar"
          help="Ingrese el monto a pagar"
           :minFractionDigits="2" 
          :maxFractionDigits="5" 
        />
        <InputText
          label="Número de Oferta"
          help="Ingrese el número de oferta"
          
        />
        <InputNumber 
          label="Monto de Oferta"
          help="Ingrese el monto de la oferta"
           :minFractionDigits="2" 
          :maxFractionDigits="5" 
        />
        <InputNumber 
          label="Diferencia"
          help="Ingrese la diferencia"
          :minFractionDigits="2" 
          :maxFractionDigits="5" 
        />
        <div class="flex flex-col gap-2">
          <label for="">Fecha</label>
          <p-date-picker 
            showIcon 
            fluid 
            iconDisplay="input"
            dateFormat="dd/mm/yy"
            lang="es"
          />
          <small>Ingrese la fecha</small>
        </div>
         <div class="flex flex-col ">
            <label>Cargar Comprobante</label>
          <p-file-upload 
            mode="basic" 
            @select="onFileSelect" 
            customUpload 
            auto 
            severity="Primary" 
            class="p-button-outlined bg-yellow-300 text-black w-full " 
            chooseLabel="Cargar Archivo"
          />
          <small>Cargue el comprobante (PNG, JPG, PNF)</small>
          </div>
      
      </div>
         <div class="flex gap-2 border-2">
         
        </div>
    </div>
      <div class="border-2 border-yellow-100 p-5 rounded-2xl bg-yellow-50">
        <div class="flex justify-between">
          <p>Monto Total:</p>
          <p>Q 0.000</p>
        </div>
      </div>
      <div class="flex my-5 justify-end ">
        <div class=" flex gap-2">
          <NuxtLink to="/request">
             <p-button
           label="Cancelar"
           severity="secondary"
          />
          </NuxtLink>
          <p-button
          class="pi pi-plus"
           label=" Crear Solicitud"
           severity="success"
          />
        </div>
      </div>
    </div>
   </p-card>
  </div>
</template>
<style>

</style>