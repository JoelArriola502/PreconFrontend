<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] })

interface paymentType {
  label: string,
  value: number
}

const confirm = useConfirm();
const { alertSuccess, alertError, alertWarning, alertInfo } = useAlert();

const payment = ref<paymentType[]>([
  { label: 'Tarjeta de Crédito', value: 1 },
  { label: 'Tarjeta de Débito', value: 2 }
])
const formularios = ref([{ id: 1 }]);
const contadorId = ref<number>(1);
const src = ref<any>()
const paymentLink = ref<string>('')
const selectPyment = ref<number>()
const agregarFormulario = () => {
  contadorId.value++;
  formularios.value.push({ id: contadorId.value });
};

const eliminarFormulario = (index: number) => {
  if (formularios.value.length > 1) {
    formularios.value.splice(index, 1);
  }
};



function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e: any) => {
    src.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

const confirmCreateSolicitud = () => {
  confirm.require({
    message: '¿Desea crear esta solicitud?',
    header: 'Confirmación de solicitud',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Crear solicitud',
      severity: 'success',
      class: 'pi pi-check'
    },
    accept: () => {

      alertSuccess('La solicitud se creó correctamente.', 'Solicitud creada',)
    },
    reject: () => {


      alertWarning('La creación de la solicitud fue cancelada.', 'Acción cancelada')
    }
  });
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(paymentLink.value);

    alertSuccess('Enlace copiado!')

  } catch (err) {
    console.error('Error al copiar:', err);
    alertError('Error al copiar')

  }
}

const onAdvancedUpload = () => {

  alertInfo('File Uploaded', 'Success')
};
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
            <NuxtLink to="/Request/link/clients">
              <p-button class="pi pi-plus" label=" Nuevo Cliente" />
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
          <p-auto-complete class="flex w-full " fluid />
          <div class="flex flex-col gap-2">
            <label for="">
              Comentario
            </label>

            <p-textarea />
            <small>Agrege un Comentario</small>
          </div>

        </div>



      </div>


    </p-card>

    <p-card #content>
      <div class="">
        <div class="flex justify-between">
          <h3>Solcisitudes {{ formularios.length }}</h3>
          <p-button class="pi pi-plus ms:text-xs" label=" Agregar" @click="agregarFormulario" />

        </div>
        <div v-for="(item, index) in formularios" :key="item.id"
          class="my-5 border-2 border-yellow-100 p-5 rounded-2xl bg-yellow-50">
          <div class="flex justify-between">
            <p>Solicitud {{ index + 1 }}</p>

            <p-button class="pi pi-trash" severity="danger" @click="eliminarFormulario(index)"
              :disabled="formularios.length === 1" />
          </div>

          <div class="grid md:grid-cols-2 gap-2 my-5">

            <InputNumber label="Monto a Pagar" help="Ingrese el monto a pagar" :minFractionDigits="2"
              :maxFractionDigits="5" />
            <InputText label="Número de Oferta" help="Ingrese el número de oferta" />
            <div class="flex flex-col gap-2">
              <label for="">Tipo de Pago</label>
              <p-select :options="payment" optionLabel="label" optionValue="value" class="w-full "
                placeholder="Selecciona un método de pago" v-model="selectPyment" />
            </div>
            <InputNumber label="Monto de Oferta" help="Ingrese el monto de la oferta" :minFractionDigits="2"
              :maxFractionDigits="5" />
            <InputNumber label="Diferencia" help="Ingrese la diferencia" :minFractionDigits="2"
              :maxFractionDigits="5" />
            <!-- <div class="flex flex-col gap-2">
              <label for="">Fecha</label>
              <p-date-picker showIcon fluid iconDisplay="input" dateFormat="dd/mm/yy" lang="es" />
              <small>Ingrese la fecha</small>
            </div> -->
            <div class="flex flex-col gap-2">
              <label>Cargar PDF ofeta</label>
              <PFileUpload mode="advanced" name="pdf" chooseLabel="Cargar pdf" cancelLabel="Cancelar"
                @select="onFileSelect" :showUploadButton="false" accept="application/pdf" :multiple="false"
                cancelIcon="pi pi-times" :maxFileSize="1000000" @upload="onAdvancedUpload">
              </PFileUpload>

              <small>Cargue el PDF de la oferta</small>

            </div>


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
            <NuxtLink to="/request/link">
              <p-button label="Cancelar" severity="secondary" />
            </NuxtLink>
            <p-button class="pi pi-plus" label=" Crear Solicitud" severity="success" @click="confirmCreateSolicitud" />
          </div>
        </div>
      </div>
    </p-card>
  </div>
</template>
<style></style>