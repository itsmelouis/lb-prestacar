<template>
  <Header />
  <section class="relative">
    <img alt="Luxury vehicle" class="w-full h-auto" height="500" src="/hero_limo.png"
       width="768" />
    <div
      class="absolute left-10 bottom-10 bg-black bg-opacity-35 flex flex-col justify-center items-start p-8 max-w-fit max-h-fit rounded-lg">
      <h2 class="text-3xl font-bold text-white">PRESTACAR, <br> le meilleur de la location de véhicules de luxe.</h2>
      <ul class="text-white mt-4 space-y-2">
        <li>✔️ Véhicules haut de gamme</li>
        <li>✔ Des prix justes</li>
        <li>✔ Une équipe disponible & réactive</li>
      </ul>
      <div class="mt-4 space-x-4">
        <NuxtLink class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded" to="/vehicules">
          Découvrir nos véhicules
        </NuxtLink>
        <NuxtLink to="/contact"
          class="bg-transparent hover:bg-yellow-600 text-yellow-500 outline outline-yellow-500 font-bold py-2 px-4 rounded">
          Devis personnlisé
        </NuxtLink>
      </div>
    </div>
  </section>
  <section class="relative w-full py-12 bg-gray-50">
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
              <NuxtLink class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                to="/vehicules">
                Découvrir nos véhicules
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
