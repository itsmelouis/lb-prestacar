<template>
  <div class="flex flex-col items-center min-h-screen p-4 bg-gray-100">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      <NuxtLink to="/admin/vehicules" class="w-64 h-40 flex items-center justify-center bg-white border border-gray-300 rounded-xl shadow-md hover:bg-gray-50 transition">
        <span class="text-yellow-500 font-bold text-lg">Véhicules</span>
      </NuxtLink>
      <router-link to="/admin/prestations" class="w-64 h-40 flex items-center justify-center bg-white border border-gray-300 rounded-xl shadow-md hover:bg-gray-50 transition">
        <span class="text-yellow-500 font-bold text-lg">Prestations</span>
      </router-link>
      <router-link to="/admin/avis" class="w-64 h-40 flex items-center justify-center bg-white border border-gray-300 rounded-xl shadow-md hover:bg-gray-50 transition">
        <span class="text-yellow-500 font-bold text-lg">Avis</span>
      </router-link>
      <NuxtLink to="/admin/mails" class="w-64 h-40 flex items-center justify-center bg-white border border-gray-300 rounded-xl shadow-md hover:bg-gray-50 transition">
        <span class="text-yellow-500 font-bold text-lg">Mails</span>
      </NuxtLink>
    </div>
  </div>
</template>
