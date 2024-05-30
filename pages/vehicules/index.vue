<template>
  <section class="mt-32 flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center">
      <div class="w-full max-w-lg mb-6 flex gap-4">
        <span class="relative flex-1">
          <Icon name="material-symbols:search-rounded" size="24px" class="z-50 absolute top-1/2 transform -translate-y-1/2 right-3" />
          <InputText v-model="search" placeholder="Rechercher un véhicule" class="w-full" />
        </span>
        <MultiSelect v-model="selectedCategories" :options="categories" optionLabel="nom" placeholder="Sélectionner des catégories" :maxSelectedLabels="3" class="w-full md:w-20" />
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
            :price="car.GrillesTarifiaires[0]?.prix.toString()"
            displayTitle
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
// Définir les types personnalisés pour Voiture, GrilleTarifaire, Option et Categorie
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

interface Categorie {
  id: number;
  nom: string;
}

const search = ref('');
const cars = ref<Voiture[]>([]);
const categories = ref<Categorie[]>([]);
const selectedCategories = ref<number[]>([]);

// Fonction pour récupérer les voitures
const fetchCars = async () => {
  try {
    cars.value = await $fetch<Voiture[]>('/api/car');
    console.log('Voitures récupérées:', cars.value);
  } catch (error) {
    console.error('Failed to fetch cars:', error);
  }
};

// Fonction pour récupérer les catégories
const fetchCategories = async () => {
  try {
    categories.value = await $fetch<Categorie[]>('/api/category');
    console.log('Catégories récupérées:', categories.value);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

// Appel des fonctions fetchCars et fetchCategories au montage du composant
onMounted(() => {
  fetchCars();
  fetchCategories();
});

// Filtrage des voitures en fonction de la recherche et des catégories sélectionnées
const filteredCars = computed(() => {
  return cars.value.filter(car => {
    const matchesSearch = car.nom.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = selectedCategories.value.length === 0 || selectedCategories.value.includes(car.id_categorie);
    console.log('Voiture:', car.nom, 'Correspond à la recherche:', matchesSearch, 'Correspond à la catégorie:', matchesCategory);
    return matchesSearch && matchesCategory;
  });
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
