<template>
  <section class="relative">
    <img alt="Luxury vehicle" class="w-full h-auto" height="500" src="/hero_limo.png" width="768" />
    <div
      class="absolute left-10 bottom-10 bg-black bg-opacity-35 flex flex-col justify-center items-start p-8 max-w-fit max-h-fit rounded-lg">
      <h2 class="text-3xl font-bold text-white">PRESTACAR, <br> le meilleur de la location de voitures de luxe.</h2>
      <ul class="text-white mt-4 space-y-2">
        <li>• Véhicules haut de gamme</li>
        <li>• Des prix justes</li>
        <li>• Une équipe disponible & réactive</li>
      </ul>
      <div class="mt-4 space-x-4">
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
    <div class="flex flex-row gap-8 flex-wrap">
      <CardCar title="brandon" id="1" image="aston_martin_volante" />
      <CardCar title="brandon" id="2" image="aston_martin_volante" />
      <CardCar title="brandon" id="3" image="aston_martin_volante" />

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
            <p
              class="text-lg leading-loose md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relax">
Prestacar vous propose de la location de voitures pour différents évènements, mariage, nouvel an, anniversaire, EVJF, etc… Un grand nombre de voitures qui vous permet de faire votre choix en fonction de vos goûts et votre budget. Nos voitures sont louées avec chauffeurs d’assurer un moment en toute sécurité et sans se soucier de “qui va conduire” ! Une location de voiture de luxe pour tous les amoureux du monde automobile !
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
          <CldImage src="aston_martin_volante/1" width="987" height="987" alt="My Awesome Image" />
          <p class="text-center font-semibold">{{ slotProps.data.name }}</p>
        </div>
      </template>
    </Carousel>
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
const products = ref([
  { image: 'hero_limo.png', name: 'Mariage' },
  { image: 'hero_limo.png', name: 'Anniversaire' },
  { image: 'hero_limo.png', name: 'Soirée' },
  { image: 'hero_limo.png', name: 'Transport Aéroport/Gare' },
  { image: 'hero_limo.png', name: 'Taxi' },
])

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
