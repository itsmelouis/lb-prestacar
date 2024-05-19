<template>
  <div class="mt-32">
    <section class="relative">
      <img alt="Luxury vehicle" class="w-full h-auto" height="500" src="/hero_limo.png" />
      <div
        class="absolute left-10 bottom-10 flex flex-col justify-center items-start p-8 max-w-fit max-h-fit rounded-lg">
        <h2 class="text-3xl font-bold text-white">{{ cars?.nom }}</h2>
        <div class="mt-4 space-x-4">
            <Button label="Voir les tarifs" severity="primary" @click="activeTabIndex = 1" />
          <NuxtLink to="/contact">
            <Button label="Devis personnalisé" severity="secondary" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mt-16 px-8">
      <TabView v-model:activeIndex="activeTabIndex">
        <TabPanel header="Détails du véhicule">
          <Carousel :value="products" :numVisible="1" :numScroll="1">
            <template #item="slotProps">
              <Image :src="slotProps.data.image" :alt="slotProps.data.name" preview>
                <template #indicatoricon>
                  <Icon name="material-symbols:search" size="24" class="text-white" />
                </template>
              </Image>
            </template>
          </Carousel>
          {{ cars?.description }}
        </TabPanel>
        <TabPanel header="Tarifs">
          <p>salut</p>
        </TabPanel>
      </TabView>
    </section>

    <section class="mt-16 px-8">
      <h2 class="text-3xl font-bold text-center">Comment nos clients parlent de nous :</h2>
      <div class="mt-8 flex justify-center items-center flex-col space-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ul v-for="review in reviews" :key="review.nom" class="w-full max-w-xl">
            <CardReview :firstname="review.prenom" :name="review.nom" :message="review.message" />
          </ul>
        </div>
      </div>
      <div class="flex justify-center items-center mt-12">
        <NuxtLink to="/avis">
          <Button label="Laissez nous votre avis" severity="secondary" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Voiture, Avis } from '@prisma/client'
import Image from 'primevue/image';

const route = useRoute()
const cars = ref<Voiture | null>(null)
const reviews = ref<Avis[] | null>(null)

const error = ref<string | null>(null)

const activeTabIndex = ref(0);

const products = ref([
  { image: '/hero_limo.png', },
  { image: '/hero_cadillac.jpeg', },
  { image: '/hero_limo.png', },
  { image: '/hero_cadillac.jpeg', },
  { image: '/hero_limo.png', },
  { image: '/hero_cadillac.jpeg', },
  { image: '/hero_limo.png', },
  { image: '/hero_cadillac.jpeg', },
  { image: '/hero_limo.png', },
  { image: '/hero_cadillac.jpeg', },

])

useFetch<Voiture>(`/api/car/${route.params.id}`)
  .then((response) => {
    if (response.data.value) {
      cars.value = response.data.value
    } else {
      error.value = 'Aucune donnée disponible'
    }
  })
  .catch((err) => {
    error.value = err.message || 'Erreur lors du chargement des données'
  })

const fetchCars = async () => {
  try {
    reviews.value = await $fetch<Avis[]>('/api/review');
  } catch (error) {
    console.error('Failed to fetch cars:', error);
  }
};

onMounted(() => {
  fetchCars();
});
watch(reviews, (value) => {
  console.log(value)
});
</script>


<style>
li[data-pc-section="inkbar"] {
  width: 0 !important;
}
</style>
