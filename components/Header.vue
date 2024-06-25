<script setup lang="ts">

const nuxtApp = useNuxtApp();
const isAuthenticated = computed(() => !!nuxtApp.$auth.loggedIn.value);
const router = useRouter();

const handleLogout = async () => {
  try {
    const response = await $fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.message === "Déconnecté avec succès!") {
      await nuxtApp.$auth.updateSession();
      navigateTo('/login');
    } else {
      console.error('Erreur lors de la déconnexion:', response.message);
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};
</script>

<template>
  <header class="bg-white sticky w-full z-20 top-0 start-0 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] py-4">
    <div class="container md:mx-auto flex justify-between items-center">
      <NuxtLink to="/">
        <img src="/logo-white.svg" alt="Logo prestacar" width="150" />
      </NuxtLink>
      <div class="md:hidden">
        <MobileNav />
      </div>
      <div class="hidden md:flex flex-row gap-6 items-center">
        <nav class="flex flex-row items-center font-semibold gap-6">
          <RouterLink to="/vehicules" class="group relative flex items-center justify-center self-stretch">
            <span>Véhicules</span>
            <div
              class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100">
            </div>
          </RouterLink>
          <RouterLink to="/contact" class="group relative flex items-center justify-center self-stretch">
            <span>Contact</span>
            <div
              class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100">
            </div>
          </RouterLink>
          <RouterLink to="/about" class="group relative flex items-center justify-center self-stretch">
            <span>À propos</span>
            <div
              class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100">
            </div>
          </RouterLink>
        </nav>
        <RouterLink to="/contact">
          <Button label="Devis personnalisé" severity="primary" />
        </RouterLink>
        <div v-if="isAuthenticated" class="ml-4">
          <Button label="Déconnexion" severity="danger" @click="handleLogout"></Button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.router-link-active span {
  @apply font-extrabold;
}
</style>
