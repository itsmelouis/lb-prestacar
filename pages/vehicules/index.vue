<template>
  <section class="mt-32 flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center">
      <div class="w-full max-w-lg mb-6 flex gap-4">
        <span class="relative flex-1">
          <Icon name="material-symbols:search-rounded" size="24px" class="z-50 absolute top-1/2 transform -translate-y-1/2 right-3" />
          <InputText v-model="search" placeholder="Rechercher un véhicule" class="w-full" />
        </span>
        <MultiSelect v-model="selectedCategories" :options="categories" optionValue="id" optionLabel="nom" placeholder="Sélectionner des catégories" :maxSelectedLabels="3" class="w-full md:w-20" />
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
    <Accordion>
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
    title: 'Quels types de voitures proposez-vous à la location ?',
    content: 'Nous proposons une large gamme de véhicules à la location, allant des voitures de luxe aux voitures pour particuliers, ainsi que des voitures spécialement conçues pour les mariages. Notre flotte comprend des marques prestigieuses telles que Mercedes, BMW, Audi, et bien d\'autres.'
  },
  {
    title: 'Comment puis-je réserver une voiture chez Prestacar ?',
    content: 'Vous pouvez réserver une voiture directement sur notre site internet en utilisant notre formulaire de réservation en ligne. Vous pouvez également nous contacter par téléphone ou par email pour effectuer une réservation.'
  },
  {
    title: 'Quels sont les documents nécessaires pour louer une voiture ?',
    content: 'Pour louer une voiture, vous aurez besoin d\'une pièce d\'identité valide (passeport ou carte d\'identité), d\'un permis de conduire en cours de validité, et d\'une carte de crédit au nom du conducteur principal.'
  },
  {
    title: 'Proposez-vous des services de location de voiture avec chauffeur ?',
    content: 'Oui, nous proposons des services de location de voiture avec chauffeur pour ceux qui souhaitent un service haut de gamme et personnalisé. Ce service est disponible pour nos voitures de luxe ainsi que pour les événements spéciaux comme les mariages.'
  },
  {
    title: 'Quels sont vos tarifs de location ?',
    content: 'Nos tarifs varient en fonction du type de véhicule, de la durée de la location et des services supplémentaires choisis. Vous pouvez consulter nos tarifs détaillés sur notre site internet ou nous contacter directement pour obtenir un devis personnalisé.'
  },
  {
    title: 'Est-il possible de louer une voiture pour une longue durée ?',
    content: 'Oui, nous offrons des options de location à court et à long terme. Pour les locations de longue durée, nous proposons des tarifs préférentiels et des conditions flexibles. Contactez-nous pour discuter de vos besoins spécifiques.'
  },
  {
    title: 'Proposez-vous des voitures pour les mariages ?',
    content: 'Absolument ! Nous avons une sélection de voitures de luxe parfaites pour les mariages. Nous pouvons également organiser des services supplémentaires tels que la décoration du véhicule et un chauffeur pour le jour J.'
  },
  {
    title: 'Puis-je modifier ou annuler ma réservation ?',
    content: 'Oui, vous pouvez modifier ou annuler votre réservation. Les conditions de modification et d\'annulation varient en fonction de la politique de l\'entreprise et de la période de préavis. Veuillez consulter nos conditions générales de location pour plus de détails.'
  },
  {
    title: 'Y a-t-il une limite de kilométrage pour les voitures louées ?',
    content: 'Nos locations incluent généralement un kilométrage limité. Toutefois, nous proposons des options de kilométrage illimité pour certaines catégories de véhicules moyennant un supplément. Veuillez vérifier les détails spécifiques lors de la réservation.'
  },
  {
    title: 'Quels sont vos tarifs de location ?',
    content: 'Nos tarifs varient en fonction du type de véhicule, de la durée de la location et des services supplémentaires choisis. Vous pouvez consulter nos tarifs détaillés sur notre site internet ou nous contacter directement pour obtenir un devis personnalisé.'
  },
]);
</script>
