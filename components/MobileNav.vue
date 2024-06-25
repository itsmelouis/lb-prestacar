<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const nuxtApp = useNuxtApp();
const isAuthenticated = computed(() => !!nuxtApp.$auth.loggedIn.value);

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
  <div>
    <button @click="toggleMenu">
      <Icon name="material-symbols:menu" class="text-yellow-500" size="48" />
    </button>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-30" @click="toggleMenu">
      <div 
        class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-40 p-4 transition-transform duration-300 ease-in-out transform" 
        :class="{'translate-x-0': isOpen, 'translate-x-full': !isOpen}"
        @click.stop>
        <nav class="flex flex-col gap-6 font-semibold">
          <RouterLink to="/vehicules" @click="toggleMenu" class="group relative flex items-center justify-center">
            <span>Véhicules</span>
            <div class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100"></div>
          </RouterLink>
          <RouterLink to="/contact" @click="toggleMenu" class="group relative flex items-center justify-center">
            <span>Contact</span>
            <div class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100"></div>
          </RouterLink>
          <RouterLink to="/about" @click="toggleMenu" class="group relative flex items-center justify-center">
            <span>À propos</span>
            <div class="absolute top-7 rounded-lg inline-block h-[0.2rem] bg-yellow-500 transition-all duration-300 ease-out w-0 opacity-0 group-hover:w-full group-hover:opacity-100"></div>
          </RouterLink>
          <Button label="Devis personnalisé" severity="primary" @click="toggleMenu"></Button>
          <div v-if="isAuthenticated" class="mt-4">
            <Button label="Déconnexion" severity="danger" @click="handleLogout"></Button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
