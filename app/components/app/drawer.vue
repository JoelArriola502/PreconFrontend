<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const drawer = userDrawerStore();
const auth = useAuthStore()

function logout() {
  drawer.visible = false;
   auth.logout()
}
</script>

<template>
  <p-drawer v-model:visible="drawer.visible">
    <div class="flex h-full flex-col content-end">
      <div
        class="flex shrink-0 items-center justify-between gap-4 p-2 font-bold text-lg "
      >
      </div>
      <div class="flex min-h-0 flex-col overflow-y-auto gap-4">
        <AppNewUser v-model:visible="drawer.visible" v-if="auth.user?.role===1"/>
        <AppRequest v-model:visible="drawer.visible" />
      
      </div>
      <div class="flex min-h-0  flex-col overflow-y-auto">
        <div
          class="mt-auto flex w-full cursor-pointer items-center justify-center "
        >
          <p-Button
            class="h-10 w-full"
            severity="primary"
            icon="pi pi-sign-out mr-2"
            @click="logout"
            label="cerrar sesión"
          />
        </div>
      </div>
    </div>
  </p-drawer>
</template>