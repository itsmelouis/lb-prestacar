<template>
  <section class="relative">
    <img alt="Luxury vehicle" class="w-full h-auto" height="500" src="/hero_limo.png" width="768" />
    <div
      class="absolute left-10 bottom-10 bg-black bg-opacity-35 flex flex-col justify-center items-start p-8 max-w-fit max-h-fit rounded-lg">
      <h2 class="text-3xl font-bold text-white">PRESTACAR, <br> le meilleur de la location de véhicules de luxe.</h2>
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
      <CardCar title="brandon" id="1" image="https://lb-prestacar.com/assets/cox3-e064cf11.jpg" />
      <CardCar title="brandon" id="2" image="https://lb-prestacar.com/assets/cox3-e064cf11.jpg" />
      <CardCar title="brandon" id="3" image="https://lb-prestacar.com/assets/cox3-e064cf11.jpg" />

    </div>
    <NuxtLink to="/vehicules" class="mt-10">
      <Button label="Voir tous nos véhicules" severity="primary" />
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
            <h2 class="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">The Future of Jamstack</h2>
          </div>
          <div class="space-y-4">
            <p
              class="text-lg leading-loose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The Jamstack has taken the web by storm. It's the modern way to build fast, secure, and scalable sites
              and apps. But what does the future hold for the Jamstack? In this article, we'll take a look at some of
              the emerging trends and technologies that are shaping the future of the Jamstack.
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
          <img :src="slotProps.data.image" :alt="slotProps.data.name">
          <p class="text-center font-semibold">{{ slotProps.data.name }}</p>
        </div>
      </template>
    </Carousel>
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

const products = ref([
  { image: 'hero_limo.png', name: 'Mariage' },
  { image: 'hero_limo.png', name: 'Anniversaire' },
  { image: 'hero_limo.png', name: 'Soirée' },
  { image: 'hero_limo.png', name: 'Transport Aéroport/Gare' },
  { image: 'hero_limo.png', name: 'Taxi' },
])

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
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>
