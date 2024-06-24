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
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <InputText id="email" v-model="email" class="w-full" required type="email" />
          </div>
          <!-- Mot de passe -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <InputText id="password" type="password" v-model="password" class="w-full" required />
          </div>
          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="mb-4 text-red-500">
            {{ errorMessage }}
          </div>
          <!-- Submit Button -->
          <div class="flex justify-end">
            <Button :label="loading ? 'Connexion...' : 'Se connecter'" type="submit" severity="primary" :disabled="loading" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


const email = ref('');
const password = ref('');

const errorMessage = ref('');
const loading = ref(false);

// Utilisation du routeur Vue pour la redirection
const router = useRouter();

const handleSubmit = async () => {
  // Réinitialiser les messages d'erreur et l'état de chargement
  errorMessage.value = '';
  loading.value = true;

  try {
    // Envoyer les données de connexion à l'API backend
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const result = await response.json();

    if (response.ok) {
      // Si la connexion réussit, stocker la session et rediriger
      await useFetch<AuthSession>('/api/auth/session', { method: 'GET' });
      navigateTo('/admin');
    } else {
      errorMessage.value = result.message || 'Erreur de connexion';
    }
  } catch (error) {
    errorMessage.value = 'Erreur de connexion, veuillez réessayer plus tard.';
  } finally {
    loading.value = false;
  }
};
</script>
