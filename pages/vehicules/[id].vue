<template>
  <div>
    <section class="relative">
      <!-- <img alt="Luxury vehicle" class="w-full h-auto" height="500" src="/hero_limo.png" /> -->
      <CldImage class="w-full h-auto" :src="cars!.cloudinaryAssets[0]" width="2000" height="700"
        alt="My Awesome Image" />
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
          <div class="w-full">
            <!-- <Carousel :value="cars?.cloudinaryAssets" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions"
              :pt="{ item: { class: ['flex shrink-0 grow w-full'] } }">
              <template #item="slotProps">
                <Image :src="getCldUrl(slotProps.data)" :alt="slotProps.data.name" preview>
                  <template #indicatoricon>
                    <Icon name="material-symbols:search" size="24" class="text-white" />
                  </template>
</Image>
</template>
</Carousel> -->

            <Galleria :value="cars?.cloudinaryAssets" :numVisible="5" containerStyle="max-width: 640px" :showThumbnails="false"
              :showIndicators="true">
              <template #item="slotProps">
                <Image :src="getCldUrl(slotProps.item)" style="width: 100%; display: block" preview />
                <!-- <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" /> -->
              </template>
            </Galleria>
            <!-- <CldImage :src="slotProps.data" width="1200" height="800" alt="My Awesome Image" /> -->
          </div>
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
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full">
          <CardReview v-for="review in reviews" :key="review.nom" :firstname="review.prenom" :name="review.nom"
            :message="review.message" />
        </ul>
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

interface VoitureWithAssets extends Voiture {
  cloudinaryAssets: string[];
}

const route = useRoute()
const cars = ref<VoitureWithAssets | null>(null)
const reviews = ref<Avis[] | null>(null)

const error = ref<string | null>(null)

const activeTabIndex = ref(0);

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

useFetch<VoitureWithAssets>(`/api/car/${route.params.id}`)
  .then((response) => {
    if (response.data.value) {
      cars.value = response.data.value
      console.log(cars.value)
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
// watch(reviews, (value) => {
//   console.log(value)
// });

const getCldUrl = (publicId: string) => {
  const { url } = useCldImageUrl({
    options: {
      crop: 'fill',
      src: publicId,
      width: 1200,
      height: 800,
      format: 'auto',
      quality: 'auto',
    },
  });
  return url;
};
</script>


<style>
li[data-pc-section="inkbar"] {
  width: 0 !important;
}
</style>
