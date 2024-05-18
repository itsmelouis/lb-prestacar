<script setup lang="ts">
</script>

<template>
  <header class="bg-white fixed w-full z-20 top-0 start-0 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] py-4">
    <div class="container mx-auto md:flex md:justify-between md:items-center">
      <img src="/logo-white.svg" alt="Logo prestacar" width="150" />
      <div class="flex flex-row gap-6 items-center">
        <nav class="flex flex-row items-center font-semibold gap-6">
          <RouterLink to="/vehicules" class="group relative flex items-center justify-center self-stretch">
            <span>Véhicules</span>
            <div class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100" ></div>
          </RouterLink>
          <RouterLink to="/contact" class="group relative flex items-center justify-center self-stretch">
            <span>Contact</span>
            <div class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100" ></div>
          </RouterLink>
          <RouterLink to="/about" class="group relative flex items-center justify-center self-stretch">
            <span>À propos</span>
            <div class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100" ></div>
          </RouterLink>
        </nav>
        <Button label="Devis personnalisé" severity="primary"></Button>
        <div class="md:hidden">
          <button class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400">
            <Icon name="cil:hamburger-menu" color="black" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.router-link-active span {
  @apply font-extrabold;
}
/* .router-link-active:hover {
  @apply bg-green-200 font-medium;
} */
</style>
