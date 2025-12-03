<script setup lang="ts">
const emit = defineEmits(["update:visible"]);
const props = defineProps<{
  visible: boolean;
}>();

const localVisible = ref(props.visible);

function closeDrawer() {
  emit("update:visible", false);
  localVisible.value = false;
}
</script>
<template>
  <ul class="m-0 list-none">
    <li>
      <NuxtLink
        v-ripple
        to="/Request/link"
        class="p-ripple flex cursor-pointer items-center rounded p-4 text-surface-700 transition-colors duration-150 hover:bg-surface-100"
        @click="closeDrawer()"
      >
        <i class="pi pi-user-plus mr-2" />
        <span class="font-medium">Gestión de Solicitudes Tarjetas</span>
      </NuxtLink>
    </li>
  </ul>
</template>