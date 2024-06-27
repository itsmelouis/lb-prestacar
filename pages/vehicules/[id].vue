<template>
  <div>
    <section class="relative">
      <CldImage v-if="carData?.cloudinaryAssets?.length" class="w-full h-auto" :src="carData.cloudinaryAssets[0]"
        width="2000" height="700" :alt="`Photo montrant une ${carData.nom}`" />
      <div
        class="hidden absolute left-10 bottom-10 md:flex flex-col justify-center items-start p-8 max-w-fit max-h-fit rounded-lg">
        <h2 class="text-3xl font-bold text-white">{{ carData?.nom }}</h2>
        <div class="mt-4 space-x-4">
          <Button label="Voir les tarifs" severity="primary" @click="activeTabIndex = 1" />
          <NuxtLink to="/contact">
            <Button label="Devis personnalisé" severity="secondary" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mt-16 px-8">
      <ClientOnly>
        <TabView v-model:activeIndex="activeTabIndex">
          <TabPanel header="Détails du véhicule">
            <div class="w-full flex justify-center">
              <Galleria v-if="carData?.cloudinaryAssets" :value="carData.cloudinaryAssets" :numVisible="5"
                containerStyle="max-width: 640px" :showThumbnails="false" :showIndicators="true">
                <template #item="slotProps">
                  <Image :src="getCldUrl(slotProps.item)" style="width: 100%; display: block" preview>
                    <template #indicatoricon>
                      <Icon name="material-symbols:search" size="24" class="text-white" />
                    </template>
                  </Image>
                </template>
              </Galleria>
            </div>
            <div v-html="carData?.description"></div>
          </TabPanel>
          <TabPanel header="Tarifs">
            <h2 v-if="carData?.GrillesTarifiaires" class="font-semibold text-xl">Grilles tarifaires</h2>
            <DataTable v-if="carData?.GrillesTarifiaires" :value="carData.GrillesTarifiaires" class="w-full">
              <Column field="temps" header="Temps" />
              <Column field="prix" header="Prix (en euros)" />
            </DataTable>
            <h2 v-if="carData?.Options" class="font-semibold text-xl mt-5">Options</h2>
            <DataTable v-if="carData?.Options" :value="carData.Options" class="w-full">
              <Column field="intitule" header="Options" />
              <Column field="prix" header="Prix (en euros)" />
            </DataTable>
          </TabPanel>
        </TabView>
      </ClientOnly>
    </section>

    <section class="mt-16 px-8">
      <h2 class="text-3xl font-bold text-center">Comment nos clients parlent de nous :</h2>
      <div class="mt-8 flex justify-center items-center flex-col space-y-8">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full">
          <CardReview v-for="review in reviewData" :key="review.nom" :firstname="review.prenom" :name="review.nom"
            :message="review.message" :rating="getRating()" />
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
import type { Voiture, Avis, GrilleTarifiaire, Option } from '@prisma/client';

interface VoitureWithAssets extends Voiture {
  cloudinaryAssets: string[];
  GrillesTarifiaires: GrilleTarifiaire[];
  Options: Option[];
}

const route = useRoute();
const { data: carData, error: carError } = useFetch<VoitureWithAssets>(`/api/car/${route.params.id}`);
const { data: reviewData, error: reviewError } = useFetch<Avis[]>('/api/review');

const activeTabIndex = ref(0);

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

// Fonction pour générer une note fixe (ou dynamique si elle provient des données)
const getRating = () => {
  return Math.floor(Math.random() * (5 - 3.5 + 1)) + 3.5;
};
</script>

<style>
li[data-pc-section="inkbar"] {
  width: 0 !important;
}
</style>
