<template>
  <section class="mt-32 flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center">
      <div class="w-full max-w-lg mb-6">
        <span class="relative">
          <Icon name="material-symbols:search-rounded" size="24px" class="z-50 absolute top-1/2 transform -translate-y-1/2 right-3 text-surface-400" />
          <InputText v-model="search" placeholder="Rechercher un véhicule" class="w-full" />
        </span>
      </div>
      <section class="w-full flex flex-col items-center my-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10">
          <CardCar 
            v-for="car in filteredCars" 
            :key="car.id" 
            :title="car.nom" 
            :id="car.id.toString()" 
            :image="car.nom_image" 
            :description="car.description"
            :price="car.GrillesTarifiaires[0].prix.toString()"
          />
        </div>
      </section>
    </div>
  </section>

  <section class="relative mx-52 py-12">
    <h3 class="font-semibold text-2xl text-center mb-4">FAQ :</h3>
    <Accordion :activeIndex="0">
      <AccordionTab v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <p>{{ tab.content }}</p>
      </AccordionTab>
    </Accordion>
  </section>
</template>

<script setup lang="ts">

// Définir les types personnalisés pour Voiture, GrilleTarifaire et Option
interface GrilleTarifiaire {
  id: number;
  voitureId: number;
  prix: number;
}

interface Option {
  id: number;
  voitureId: number;
  nom: string;
}

interface Voiture {
  id: number;
  nom: string;
  nom_image: string;
  description: string;
  id_categorie: number;
  GrillesTarifiaires: GrilleTarifiaire[];
  Options: Option[];
}

const search = ref('');
const cars = ref<Voiture[]>([]);

// Fonction pour récupérer les voitures
const fetchCars = async () => {
  try {
    cars.value = await $fetch<Voiture[]>('/api/car');
  } catch (error) {
    console.error('Failed to fetch cars:', error);
  }
};

// Appel de la fonction fetchCars au montage du composant
onMounted(() => {
  fetchCars();
});

watch(cars, () => {
  console.log(cars.value);
});

// Filtrage des voitures en fonction de la recherche
const filteredCars = computed(() => {
  return cars.value.filter(car => 
    car.nom.toLowerCase().includes(search.value.toLowerCase())
  );
});

const tabs = ref([
  {
    title: 'Question 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
  },
  {
    title: 'Question 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
  },
  {
    title: 'Question 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
  },
  {
    title: 'Question 4',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
  },
  {
    title: 'Question 5',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
  }
]);
</script>
