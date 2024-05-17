<template>
  <div class="mt-32"></div>
    <div class="w-full max-w-lg mx-auto">
    <span class="relative">
      <Icon name="material-symbols:search-rounded" size="24px" class="z-50 absolute top-1/3 -mt-2 right-3 text-surface-400 self-center" />
      <InputText v-model="search" placeholder="Rechercher un véhicule" class="w-full" />
    </span>
    </div>
</template>

<script setup lang="ts">

const search = ref('');
</script>