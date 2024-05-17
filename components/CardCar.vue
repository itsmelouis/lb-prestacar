<script setup lang="ts">

// interface CardCarProps {
//   title: string
//   description: string
//   image: string
//   price? : string
// }

// const props = defineProps<CardCarProps>()

</script>

<template>
  <div class="relative max-w-fit">
    <div class="absolute top-2 right-2 z-10">
      <Tag class="inline-block" value="à partir de 200€" />
    </div>
    <div class="w-80 h-80">
      <img alt="Photo" class="object-cover w-full h-full rounded-xl" src="/hero_limo.png" />
    </div>
    <div class="flex justify-center items-center my-2">
      <div class="flex gap-2">
        <NuxtLink to="/vehicules/oui">
          <Button label="Plus d'infos" severity="secondary" />
        </NuxtLink>
        <NuxtLink to="/vehicules">
          <Button label="Réserver" severity="primary" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
