<template>
  <section class="mt-32 flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center">
      <div class="mb-6 flex justify-center items-center gap-4">
        <span class="relative flex-1">
          <Icon name="material-symbols:search-rounded" size="24px"
            class="z-50 absolute top-1/2 transform -translate-y-1/2 right-3" />
          <InputText v-model="search" placeholder="Rechercher un véhicule" class="w-full" />
        </span>
        <MultiSelect v-model="selectedCategories" :options="categoryOptions" optionValue="id" optionLabel="nom"
          placeholder="Sélectionner des catégories" :maxSelectedLabels="3" class="" />
      </div>
      <section class="w-full flex flex-col items-center my-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10">
          <CardCar v-for="car in filteredCars" :key="car.id" :title="car.nom" :id="car.id.toString()"
            :image="car.nom_image" :description="car.description" :price="car.GrillesTarifiaires[0]?.prix.toString()"
            displayTitle />
        </div>
      </section>
    </div>
  </section>

  <section class="relative mx-52 py-12">
    <h3 class="font-semibold text-2xl text-center mb-4">FAQ :</h3>
    <ClientOnly>
      <Accordion>
        <AccordionTab v-for="tab in tabs" :key="tab.id" :header="tab.title">
          <p>{{ tab.content }}</p>
        </AccordionTab>
      </Accordion>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import type { Voiture, Categorie } from '@prisma/client';

// Définir les types personnalisés pour Voiture avec les relations
interface VoitureWithRelations extends Voiture {
  Categories: { categorieId: number }[];
  GrillesTarifiaires: { prix: number }[];
  Options: { nom: string }[];
}

const search = ref('');
const selectedCategories = ref<number[]>([]);

const { data: cars, error: carsError } = useFetch<VoitureWithRelations[]>('/api/car');
const { data: categories, error: categoriesError } = useFetch<Categorie[]>('/api/category');

const categoryOptions = computed(() => categories.value ?? []);

// Filtrage des voitures en fonction de la recherche et des catégories sélectionnées
const filteredCars = computed(() => {
  if (cars.value) {
    return cars.value.filter(car => {
      const matchesSearch = car.nom.toLowerCase().includes(search.value.toLowerCase());
      const matchesCategory = selectedCategories.value.length === 0 ||
        selectedCategories.value.every(selectedCategoryId => 
          car.Categories && car.Categories.some(category => category.categorieId === selectedCategoryId)
        );
      return matchesSearch && matchesCategory;
    });
  }
  return [];
});

watchEffect(() => console.log(cars.value));

const tabs = ref([
  {
    id: 1,
    title: 'Quels types de voitures proposez-vous à la location ?',
    content: 'Nous proposons une large gamme de véhicules à la location, allant des voitures de luxe aux voitures pour particuliers, ainsi que des voitures spécialement conçues pour les mariages. Notre flotte comprend des marques prestigieuses telles que Mercedes, BMW, Audi, et bien d\'autres.'
  },
  {
    id: 2,
    title: 'Comment puis-je réserver une voiture chez Prestacar ?',
    content: 'Vous pouvez réserver une voiture directement sur notre site internet en utilisant notre formulaire de réservation en ligne. Vous pouvez également nous contacter par téléphone ou par email pour effectuer une réservation.'
  },
  {
    id: 3,
    title: 'Quels sont les documents nécessaires pour louer une voiture ?',
    content: 'Pour louer une voiture, vous aurez besoin d\'une pièce d\'identité valide (passeport ou carte d\'identité), d\'un permis de conduire en cours de validité, et d\'une carte de crédit au nom du conducteur principal.'
  },
  {
    id: 4,
    title: 'Proposez-vous des services de location de voiture avec chauffeur ?',
    content: 'Oui, nous proposons des services de location de voiture avec chauffeur pour ceux qui souhaitent un service haut de gamme et personnalisé. Ce service est disponible pour nos voitures de luxe ainsi que pour les événements spéciaux comme les mariages.'
  },
  {
    id: 5,
    title: 'Quels sont vos tarifs de location ?',
    content: 'Nos tarifs varient en fonction du type de véhicule, de la durée de la location et des services supplémentaires choisis. Vous pouvez consulter nos tarifs détaillés sur notre site internet ou nous contacter directement pour obtenir un devis personnalisé.'
  },
  {
    id: 6,
    title: 'Est-il possible de louer une voiture pour une longue durée ?',
    content: 'Oui, nous offrons des options de location à court et à long terme. Pour les locations de longue durée, nous proposons des tarifs préférentiels et des conditions flexibles. Contactez-nous pour discuter de vos besoins spécifiques.'
  },
  {
    id: 7,
    title: 'Proposez-vous des voitures pour les mariages ?',
    content: 'Absolument ! Nous avons une sélection de voitures de luxe parfaites pour les mariages. Nous pouvons également organiser des services supplémentaires tels que la décoration du véhicule et un chauffeur pour le jour J.'
  },
  {
    id: 8,
    title: 'Puis-je modifier ou annuler ma réservation ?',
    content: 'Oui, vous pouvez modifier ou annuler votre réservation. Les conditions de modification et d\'annulation varient en fonction de la politique de l\'entreprise et de la période de préavis. Veuillez consulter nos conditions générales de location pour plus de détails.'
  },
  {
    id: 9,
    title: 'Y a-t-il une limite de kilométrage pour les voitures louées ?',
    content: 'Nos locations incluent généralement un kilométrage limité. Toutefois, nous proposons des options de kilométrage illimité pour certaines catégories de véhicules moyennant un supplément. Veuillez vérifier les détails spécifiques lors de la réservation.'
  },
  {
    id: 10,
    title: 'Quels sont vos tarifs de location ?',
    content: 'Nos tarifs varient en fonction du type de véhicule, de la durée de la location et des services supplémentaires choisis. Vous pouvez consulter nos tarifs détaillés sur notre site internet ou nous contacter directement pour obtenir un devis personnalisé.'
  },
]);
</script>
