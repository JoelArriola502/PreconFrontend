<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const drawer = userDrawerStore();
const nameUser = useAuthStore()
const letraPrimera = ref<any>("");
const primeraLetra = async (letra: any) => {
  if (!letra || typeof letra !== "string") {
    return ""; // Si no hay palabra o no es un string, retornamos una cadena vacía
  }
  letraPrimera.value = letra[0];
  console.log(letraPrimera);
};
onMounted(async () => {
  await primeraLetra(nameUser.user?.name);
});
</script>

<template>
  <AppDrawer />
  <p-toolbar>
    <template #start>
      <!-- Botón para abrir el drawer -->
      <p-button
        icon="pi pi-bars"
        class="mr-2"
        severity="secondary"
        text
        rounded
        @click="drawer.togle()"
      />
    </template>

    <template #end>
      <span class="mr-4 font-semibold">{{ nameUser.user?.name }} {{ nameUser.user?.lastName }}</span>
      <p-Avatar
        :label="letraPrimera"
        class="mr-2"
        size="large"
        style="background-color: #ece9fc; color: #2a1261"
        shape="circle"
      />
    </template>
  </p-toolbar>
</template>