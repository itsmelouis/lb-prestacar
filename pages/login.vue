<template>
    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Section Image à gauche -->
      <div class="hidden lg:block lg:w-1/2 aspect-square rounded-xl overflow-hidden">
        <img src="/supercar.png" style="aspect-ratio: 400/400; object-fit: cover;" alt="Image d'une jolie Cadillac Escalade" class="h-full object-cover">
      </div>
      <!-- Section Formulaire à droite -->
      <div class="flex-1 flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div class="flex justify-center mb-4">
            <img src="/logo-white.svg" alt="Logo" class="w-24 h-24 object-contain">
          </div>
          <form @submit.prevent="handleSubmit">
            <!-- Identifiant -->
            <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-gray-700">Identifiant</label>
              <InputText id="username" v-model="username" class="w-full" required />
            </div>
            <!-- Mot de passe -->
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
              <InputText id="password" type="password" v-model="password" class="w-full" required />
            </div>
            <!-- Submit Button -->
            <div class="flex justify-end">
              <Button label="Se connecter" type="submit" severity="primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const username = ref('');
  const password = ref('');
  
  const handleSubmit = () => {
    // Il faut mettre la logique de connexion ici
    // J'ai mis un console.log pour afficher les valeurs des champs pour le moment
    console.log('Identifiant:', username.value);
    console.log('Mot de passe:', password.value);
  };
  </script>
  