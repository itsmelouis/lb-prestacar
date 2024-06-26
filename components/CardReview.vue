<template>
  <li class="text-sm leading-6 list-none">
    <div class="relative group">
      <div class="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-yellow-400">
        <div class="flex items-center space-x-4">
          <img
            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West">
          <div>
            <h3 class="text-lg font-semibold">{{ firstname }} {{ name }}</h3>
          </div>
        </div>
        <p class="leading-normal text-md">{{ message }}</p>
        <Rating v-model="rating" readonly :cancel="false" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
interface CardReviewProps {
  name: string
  firstname: string
  message: string
  rating: number // Ajout de la prop rating
}

const props = defineProps<CardReviewProps>();

// Utilisation de la prop rating au lieu de générer dynamiquement
const rating = ref(props.rating);
</script>
