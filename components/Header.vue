<template>
  <header class="bg-white">
    <div class="container mx-auto md:flex md:justify-between md:items-center">
      <img class="h-24 sm:h-28" src="/logo_prestacar.png" alt="Logo prestacar">
      <div class="flex flex-row gap-6 items-center">
        <nav class="flex flex-row items-center font-semibold gap-6">
          <RouterLink to="/vehicules" class="text-gray-700 hover:text-gray-900">Véhicules</RouterLink>
          <RouterLink to="/contact" class="text-gray-700 hover:text-gray-900">Contact</RouterLink>
          <RouterLink to="/about" class="text-gray-700 hover:text-gray-900">À propos</RouterLink>
        </nav>
        <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Devis personnlisé
        </button>
      </div>
    </div>
  </header>
</template>
