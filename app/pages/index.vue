  <script setup lang="ts">
  import { useAuthStore } from '~/stores/auth';
   definePageMeta({ middleware: ["auth"],});

   const usuario =useAuthStore().user?.email
  </script>
<template>
  <div>
    <h1>{{ usuario }}</h1>
  </div>
 
</template>


