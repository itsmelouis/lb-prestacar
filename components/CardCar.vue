<script setup lang="ts">

interface CardCarProps {
  id: string
  title: string
  description?: string
  image: string
  price?: string
  displayTitle?: boolean
}

const props = defineProps<CardCarProps>()

</script>

<template>
  <div class="relative max-w-fit">
    <div class="absolute top-2 right-2 z-10">
      <Tag class="inline-block" :value="`à partir de ${props.price ?? '200'}`" />
    </div>
    <NuxtLink :to="`/vehicules/${props.id}`">
      <div class="w-80 h-80 overflow-hidden rounded-xl">
        <CldImage class="object-cover transition-transform duration-300 hover:scale-105" :src="`${props.image}/1`" width="987" height="987" alt="My Awesome Image" />
        <!-- <img :alt="`${props.title}`"
          class="object-cover transition-transform duration-300 hover:scale-105 w-full h-full" :src="props.image" /> -->
      </div>
    </NuxtLink>
    <div class="flex flex-col justify-center items-center my-2">
      <div v-if="props.displayTitle" class="py-4">
        <h3 class="font-bold text-base md:text-lg lg:text-xl">{{ props.title }}</h3>
      </div>
      <div class="flex gap-2">
        <NuxtLink :to="`/vehicules/${props.id}`">
          <Button label="Plus d'infos" severity="secondary" />
        </NuxtLink>
        <NuxtLink to="/contact">
          <Button label="Réserver" severity="primary" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
