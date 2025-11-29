
<script lang="ts" setup>
definePageMeta({middleware:["auth"]})
const contadorId = ref(2); // 'number' en minúscula, no 'Number'
const formularios = ref<any>(2);
const src = ref<any>()
const visible = ref(false)
const titleDialog =  ref<string>('')
const lableDialog = ref<string>('')
const helpdialog= ref<string>('')
const buttonColorDialog = ref<string>('')
const nameButtonDialog = ref<string>('')
const iconButtonDialog =ref<string>('')





function onFileSelect(event:any) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e:any) => {
        src.value = e.target.result;
    };

    reader.readAsDataURL(file);
}


const pause = async (title:string, label:string,help:string,buttonColor:string,buttonName:string,icon:string)=>{
titleDialog.value=title
lableDialog.value=label
helpdialog.value=help
buttonColorDialog.value=buttonColor
nameButtonDialog.value=buttonName
iconButtonDialog.value=icon

visible.value=true


}
const cancel = async (title:string, label:string,help:string,buttonColor:string,buttonName:string,icon:string)=>{
titleDialog.value=title
lableDialog.value=label
helpdialog.value=help
buttonColorDialog.value=buttonColor
nameButtonDialog.value=buttonName
iconButtonDialog.value=icon

visible.value=true


}
const confirm = async (title:string, label:string,help:string,buttonColor:string,buttonName:string,icon:string)=>{
titleDialog.value=title
lableDialog.value=label
helpdialog.value=help
buttonColorDialog.value=buttonColor
nameButtonDialog.value=buttonName
iconButtonDialog.value=icon

visible.value=true


}
</script>

<template>
  <div class="flex flex-col">
   <p-card #content>
   <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div>
      <h1 class=" text-2xl font-bold">Confirmar Solicitud</h1>
    
    </div>
    <div class="flex justify-end ">
     <div class="">
          <NuxtLink to="/Request">
            <p-button
             
              label=" Regresar"
              severity="secondary"
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
        disabled
         fluid
        />
        <label for="">
          Comentario
        </label>
        <p-textarea
        disabled
        />
      </div>



    </div>


   </p-card>

   <p-card #content>
    <div class="">
      <div class="flex justify-between">
        <h3>Comprobantes {{ formularios.length }}</h3>
      

      </div>
       <div 
      v-for="(item, index) in formularios" 
      :key="item.id"
      class="my-5 border-2 border-yellow-100 p-5 rounded-2xl bg-yellow-50"
    >
      <div class="flex justify-between">
        <p>Comprobante {{ index + 1 }}</p>
        
        
      </div>
      
      <div class="grid md:grid-cols-2 gap-2 my-5">
        <InputText
          label="Nombre del Banco"
        
          disabled
        />
        <InputText
          label="Número de Cuenta"
        
          disabled
        />
        <InputText
          label="Número de Depósito"
         
          disabled
        />
        <InputNumber 
          label="Monto a Pagar"
        
           :minFractionDigits="2" 
          :maxFractionDigits="5" 
          disabled
        />
        <InputText
          label="Número de Oferta"
         
          disabled
          
        />
        <InputNumber 
          label="Monto de Oferta"
         
           :minFractionDigits="2" 
          :maxFractionDigits="5" 
          disabled
        />
        <InputNumber 
          label="Diferencia"
         
          :minFractionDigits="2" 
          :maxFractionDigits="5" 
          disabled
        />
        <div class="flex flex-col gap-2">
          <label for="">Fecha</label>
          <p-date-picker 
            showIcon 
            fluid 
            iconDisplay="input"
            dateFormat="dd/mm/yy"
            lang="es"
            disabled
          />
         
        </div>
         
      
      </div>
         <div class="card flex gap-2 justify-center ">
         <PPanel 
         class=" w-full"

            header="Ver Comprobante"
            toggleable 
            :collapsed="true"
            fluid
           >

           <div class=" flex justify-center">
            <img src="../../assets/img/logo.png" alt=""></img>
           </div>
         </PPanel >
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
        
          <p-button
          class="pi pi-pause"
           label="Pausar Solicitud"
           severity="info"
            @click="pause('Pausar solicitud','Motivo de la Pausa','Ingrese el Motivo de la Pausa de la Solicitud','info','Pausar solicitud','pi-pause')"
          />
          <p-button
          class="pi pi-times"
           label=" Cancelar Solicitud"
           severity="danger"
            @click="cancel('Cancelar solicitud','Motivo de la Cancelación','Ingrese el motivo por el cual se cancela la solicitud','danger','Cancelar solicitud','pi-times')"
          />
           <p-button
          class="pi pi-check"
           label=" Confirmar Solicitud"
           severity="success"
            @click="confirm('Confirmar solicitud','Confirmación (Opcional)','¿Desea confirmar esta solicitud?','success','Confirmar solicitud','pi-check')"
          />
        </div>
      </div>
      <p-dialog
        v-model:visible="visible"
        modal 
        :header="titleDialog"
        class="card md:w-120 sm:w-96"
      >

        <div >
            <div class="flex flex-col gap-2">
            <label >
               {{ lableDialog }}
            </label>
            <p-textarea
             fluid
             style="resize: none"
       
        />
        <small>
            {{helpdialog}}
        </small>
        </div>
        <div class="flex w-full  justify-end gap-2">
           <div class="flex gap-2 py-6">
             <p-button
              label="Cancelar"
              class="pi pi-times"
              severity="secondary"
              @click="visible=false"
            />
            <p-button 
              :label="nameButtonDialog"
              :severity="buttonColorDialog"
              :class="['pi',iconButtonDialog]"
              @click="visible=false"
            />
           </div>
        </div>
        </div>

      </p-dialog>
    </div>
   </p-card>
  </div>
</template>
<style>

</style>