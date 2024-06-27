<template>
  <section class="relative">
    <img alt="Luxury vehicle" class="w-full h-auto object-cover" height="500" src="/hero_limo.png" width="768" />
    <div
      class="hidden md:absolute left-4 bottom-4 md:left-10 md:bottom-10 bg-black bg-opacity-50 md:flex flex-col justify-center items-start p-4 md:p-8 rounded-lg max-w-full sm:max-w-md lg:max-w-lg">
      <h2 class="text-xl md:text-3xl font-bold text-white">PRESTACAR, <br> le meilleur de la location de voitures de
        luxe.</h2>
      <ul class="text-white mt-4 space-y-2 text-sm md:text-base">
        <li>• Véhicules haut de gamme</li>
        <li>• Des prix justes</li>
        <li>• Une équipe disponible & réactive</li>
      </ul>
      <div class="mt-4 space-x-2 md:space-x-4">
        <NuxtLink to="/vehicules">
          <Button label="Découvrir nos véhicules" severity="primary" />
        </NuxtLink>
        <NuxtLink to="/contact">
          <Button label="Devis personnalisé" severity="secondary" />
        </NuxtLink>
      </div>
    </div>
  </section>
  <section class="flex flex-col justify-center items-center my-10">
    <h3 class="font-semibold text-2xl text-center mb-4">Nos top véhicules</h3>
    <div class="flex flex-col md:flex-row justify-items-center gap-8 flex-wrap">
      <CardCar title="Limousine Chrysler" id="3" image="limo_chrysler" price="350€" />
      <CardCar title="Cadillac Escalade" id="4" image="cadillac_escalade" price="350€" />
      <CardCar title="Porsche Boxster" id="5" image="porsche_986" price="300€" />

    </div>
    <NuxtLink to="/vehicules" class="mt-10">
      <Button label="Voir tout nos véhicules" severity="primary" />
    </NuxtLink>
  </section>
  <section class="relative w-full py-12">
    <div class="flex flex-col gap-4 px-4 md:px-6">
      <div class="grid w-full items-center gap-16 sm:grid-cols-2">
        <div class="aspect-square rounded-xl overflow-hidden">
          <img alt="Photo" class="object-cover w-full transition-transform hover:scale-105 duration-300" height="400"
            src="/logo_prestacar.png" style="aspect-ratio: 400/400; object-fit: cover;" width="400" />
        </div>
        <div class="space-y-4">
          <div class="space-y-2">
            <h2 class="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Qui sommes nous?</h2>
          </div>
          <div class="space-y-4">
            <p class="text-lg leading-loose md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relax">
              Prestacar vous propose de la location de voitures pour différents évènements, mariage, nouvel an,
              anniversaire, EVJF, etc… Un grand nombre de voitures qui vous permet de faire votre choix en fonction de
              vos goûts et votre budget. Nos voitures sont louées avec chauffeurs d’assurer un moment en toute sécurité
              et sans se soucier de “qui va conduire” ! Une location de voiture de luxe pour tous les amoureux du monde
              automobile !
            </p>
            <div class="flex gap-2">
              <NuxtLink to="/vehicules">
                <Button label="Découvrir nos véhicules" severity="primary" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="relative w-full py-12">
    <h3 class="font-semibold text-2xl text-center mb-4">Nos prestations</h3>
    <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <div class="mx-2">
          <CldImage :src="slotProps.data.image" width="987" height="987" alt="My Awesome Image" />
          <p class="text-center font-semibold">{{ slotProps.data.name }}</p>
        </div>
      </template>
    </Carousel>
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
  <section class="relative mx-52 py-12">
    <h3 class="font-semibold text-2xl text-center mb-4">FAQ :</h3>
    <ClientOnly>
      <Accordion class="w-full">
        <AccordionTab v-for="tab in tabs" :key="tab.id" :header="tab.title">
          <p>{{ tab.content }}</p>
        </AccordionTab>
      </Accordion>
    </ClientOnly>
  </section>
</template>


<script setup lang="ts">
import type { Avis } from '@prisma/client';
const products = ref([
  { image: 'cadillac_escalade/18', name: 'Mariage' },
  { image: 'lincoln_towncar/4', name: 'Anniversaire' },
  { image: 'limo_chrysler/6', name: 'Soirée' },
  { image: 'audi_a4/7', name: 'Transport Aéroport/Gare' },
])

const { data: reviewData, error: reviewError } = useFetch<Avis[]>('/api/review');

// Fonction pour générer une note fixe (ou dynamique si elle provient des données)
const getRating = () => {
  return Math.floor(Math.random() * (5 - 3.5 + 1)) + 3.5;
};

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


const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
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
</script>
