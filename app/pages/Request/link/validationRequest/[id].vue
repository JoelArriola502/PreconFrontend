<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] })

interface paymentType{
  label:string,
  value:number
}

const confirm = useConfirm();
const { alertSuccess, alertError, alertWarning,alertInfo  } = useAlert();

const payment = ref<paymentType[]>([
  { label: 'Tarjeta de Crédito', value: 1 },
  { label: 'Tarjeta de Débito', value: 2 }
])
const formularios = ref(3);
const src = ref<any>()
const paymentLink = ref<string>('')
const selectPyment = ref<number>()
const visible = ref(false)
const visibleLink = ref(false)
const disabled = ref(true)
const titleDialog =  ref<string>('')
const lableDialog = ref<string>('')
const helpdialog= ref<string>('')
const buttonColorDialog = ref<string>('')
const nameButtonDialog = ref<string>('')
const iconButtonDialog =ref<string>('')
const statusRequest = ref(3)



function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e: any) => {
    src.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

const confirmPayment = () => {
  confirm.require({
    message: '¿Confirma que el comprobante de pago ha sido generado y desea enviarlo al sistema/cliente?',
    header: 'Confirmar Envío de Comprobante',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: ' Cancelar Envío',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: ' Enviar Comprobante',
      severity: 'success',
      class: 'pi pi-upload'
    },
    accept: () => {
     
      alertSuccess('El comprobante de pago fue enviado con éxito y está pendiente de validación.', 'Comprobante Enviado')
    },
    reject: () => {
     

      alertWarning('El envío del comprobante de pago fue cancelado. La solicitud permanece pendiente.', 'Acción Cancelada')
    }
  });
};

const copyLink = async() =>{
  try {
    await navigator.clipboard.writeText(paymentLink.value);
    
    alertSuccess('Enlace copiado!')
    
  } catch (err) {
    console.error('Error al copiar:', err);
    alertError('Error al copiar')
    
  }
}

const onAdvancedUpload = () => {

  alertInfo('File Uploaded','Success')
};

const pauseLink = async (title:string, label:string,help:string,buttonColor:string,buttonName:string,icon:string)=>{
titleDialog.value=title
lableDialog.value=label
helpdialog.value=help
buttonColorDialog.value=buttonColor
nameButtonDialog.value=buttonName
iconButtonDialog.value=icon

visibleLink.value=true


}
const cancelLink = async (title:string, label:string,help:string,buttonColor:string,buttonName:string,icon:string)=>{
titleDialog.value=title
lableDialog.value=label
helpdialog.value=help
buttonColorDialog.value=buttonColor
nameButtonDialog.value=buttonName
iconButtonDialog.value=icon

visibleLink.value=true


}
const confirmLink = async (title:string, label:string,help:string,buttonColor:string,buttonName:string,icon:string)=>{
titleDialog.value=title
lableDialog.value=label
helpdialog.value=help
buttonColorDialog.value=buttonColor
nameButtonDialog.value=buttonName
iconButtonDialog.value=icon

visibleLink.value=true


}
</script>

<template>
  <div class="flex flex-col">
    <p-toast />
    <PConfirmDialog></PConfirmDialog>
    <p-card #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <h1 class=" text-2xl font-bold">Nueva Solicitud de Pago con Tarjeta</h1>

        </div>
        <div class="flex justify-end ">
          <div class="">
             <NuxtLink to="/request/link">
              <p-button label="Regresar" severity="secondary" />
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
          <p-auto-complete class="flex w-full " fluid :disabled="disabled"/>
         <div class="flex flex-col gap-2">
           <label for="">
            Comentario
          </label>

          <p-textarea 
          
           :disabled="disabled"
          />
          <small>Agrege un Comentario</small>
         </div>
           
        </div>



      </div>


    </p-card>

    <p-card #content>
      <div class="">
        <div class="flex justify-between">
          <h3>Solcisitudes {{ formularios }}</h3>
         

        </div>
        <div v-for="(item, index) in formularios" 
          class="my-5 border-2 border-yellow-100 p-5 rounded-2xl bg-yellow-50">
          <div class="flex justify-between">
            <p>Solicitud de Pago #{{ index + 1 }}</p>

            <p-tag severity="warn" value="En Revisión" />
          </div>

          <div class="grid md:grid-cols-2 gap-2 my-5">
          
            <InputNumber label="Monto a Pagar" help="Ingrese el monto a pagar" :minFractionDigits="2"
              :maxFractionDigits="5" 
              :disabled="disabled"
              />
            <InputText label="Número de Oferta" help="Ingrese el número de oferta" :disabled="disabled"/>
           <div class="flex flex-col gap-2">
            <label for="">Tipo de Pago</label>
             <p-select
             :options="payment"
             optionLabel="label"
             optionValue="value"
             class="w-full "
             placeholder="Selecciona un método de pago"
             v-model="selectPyment"
             :disabled="disabled"
             
             
            />
           </div>
            <InputNumber label="Monto de Oferta" help="Ingrese el monto de la oferta" :minFractionDigits="2"
              :maxFractionDigits="5" :disabled="disabled"/>
            <InputNumber label="Diferencia" help="Ingrese la diferencia" :minFractionDigits="2"
              :maxFractionDigits="5" :disabled="disabled" />
               <InputText id="autorizacion" label="Número de autorización" help="Ingrese el número de la autorización" :disabled="disabled"/>

               <div class="flex flex-col gap-2">
              <label>Cargar Comprobante</label>
             <PFileUpload
                  mode="advanced"
                  name="comprobante"
                  chooseLabel="Cargar Comprobante"
                  cancelLabel="Cancelar"
                  @select="onFileSelect"
                  :showUploadButton="false"
                  :multiple="false"
                  cancelIcon="pi pi-times"
                  :maxFileSize="5000000"
                  accept="image/*"
                  @upload="onAdvancedUpload"
              >
              </PFileUpload>
            
              <small>Cargue Comprobante</small>
             
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

            </template>
          </p-card>
          
        

          
        
         <div class="flex">
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
        </div>
        <div class="border-2 border-yellow-100 p-5 rounded-2xl bg-yellow-50">
          <div class="flex justify-between">
            <p>Monto Total:</p>
            <p>Q 0.000</p>
          </div>
        </div>
        <div class="flex my-5 justify-end " >
            <div class="flex my-5 justify-end  gap-2">
             
        <div class=" flex gap-2" v-if="statusRequest ===1">
        
                <p-button
            class="pi pi-pause"
            label="Pausar Solicitud de Pago"
            severity="info"
            @click="pauseLink(
                'Pausar Envío de Enlace',
                'Motivo de la Pausa',
                'Indique el motivo para pausar el envío del enlace de pago.',
                'info',
                'Pausar Solicitud de Pago',
                'pi-pause'
            )"
        />
        <p-button
            class="pi pi-times"
            label="Cancelar Solicitud de Pago"
            severity="danger"
            @click="cancelLink(
                'Cancelar Envío de Enlace',
                'Motivo de la Cancelación',
                'Indique la razón para cancelar el envío del enlace de pago al cliente.',
                'danger',
                'Cancelar Solicitud de Pago',
                'pi-times'
            )"
        />
        <p-button
            class="pi pi-check"
            label="Confirmar Envío de Enlace"
            severity="success"
            @click="confirmLink(
                'Confirmar Enlace de Pago',
                'Confirmación de Envío',
                '¿Desea confirmar el envío del enlace de pago al cliente?',
                'success',
                'Confirmar Envío de Enlace',
                'pi-check'
            )"
        />
        </div>
        <div class=" flex gap-2" v-if="statusRequest === 3">
    <p-button
        class="pi pi-pause"
        label="Pausar Solicitud de Pago"
        severity="info"
        @click="pauseLink(
            'Pausar Validación',
            'Motivo de la Pausa',
            'Indique la razón por la que se pausa la validación del pago (ej: comprobante ilegible, monto incorrecto).',
            'info',
            'Pausar Solicitud',
            'pi-pause'
        )"
    />
    
    <p-button
        class="pi pi-times"
        label="Rechazar/Cancelar Solicitud"
        severity="danger"
        @click="cancelLink(
            'Rechazar Validación',
            'Motivo de la Cancelación',
            'Indique la razón para rechazar y cancelar la solicitud (ej: pago no recibido, fraude).',
            'danger',
            'Rechazar Solicitud',
            'pi-times'
        )"
    />
    
    <p-button
        class="pi pi-check"
        label="Validar Pago y Comprobante"
        severity="success"
        @click="confirmLink(
            'Validación Final del Pago',
            'Confirmación de Acreditación',
            '¿Confirma que el comprobante es correcto y el pago ha sido acreditado?',
            'success',
            'Validar Pago',
            'pi-check'
        )"
    />
</div>
         <p-button v-if="statusRequest ===2" icon="pi pi-plus" label="Comprobante de Pago" severity="success" @click="confirmPayment" />
      </div>
         
        </div>
      </div>
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


          <p-dialog
        v-model:visible="visibleLink"
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
              @click="visibleLink=false"
            />
            <p-button 
              :label="nameButtonDialog"
              :severity="buttonColorDialog"
              :class="['pi',iconButtonDialog]"
              @click="visibleLink=false"
            />
           </div>
        </div>
        </div>

      </p-dialog>
  </div>
</template>
<style></style>