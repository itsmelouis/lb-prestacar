<template>
    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Section Image à gauche -->
      <div class="hidden lg:block lg:w-1/2 rounded-xl">
        <CldImage src="aston_martin_volante/1" width="987" height="987" alt="My Awesome Image" />
      </div>
      <!-- Section Formulaire à droite -->
      <div class="flex-1 flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div class="flex justify-center flex-col items-center mb-4">
            <img src="/logo-white.svg" alt="Petite image" class="w-24 h-24 object-contain">
            <h2 class="text-lg md:text-xl font-bold text-gray-800">Laissez un avis</h2>
          </div>
          <form @submit.prevent="handleSubmit">
            <!-- Row 1: Nom et Prénom -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div>
                <label for="name" class="text-sm text-gray-700">Nom</label>
                <InputText id="name" v-model="name" required />
              </div>
              <div>
                <label for="firstName" class="text-sm text-gray-700">Prénom</label>
                <InputText id="firstName" v-model="firstName" required />
              </div>
            </div>
            <!-- Email -->
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <InputText id="email" v-model="email" class="w-full" required type="email" />
            </div>
            <!-- Message -->
            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
              <Textarea id="message" v-model="message" class="w-full" rows="4" required />
            </div>
            <!-- Checkbox: J'accepte les conditions -->
            <div class="mb-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <Checkbox v-model="isCondition" id="terms" :binary="true" required />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-medium text-gray-700">J'accepte les conditions</label>
                </div>
              </div>
            </div>
            <!-- Checkbox: J'accepte le RGPD -->
            <div class="mb-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <Checkbox v-model="isRgpd" id="rgpd" :binary="true" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="rgpd" class="font-medium text-gray-700">J'accepte le RGPD</label>
                </div>
              </div>
            </div>
            <!-- Submit Button -->
            <div class="flex justify-end">
              <Button :label="loading ? 'Envoi...' : 'Envoyer'" type="submit" severity="primary" :disabled="loading" />
            </div>
          </form>
          <div v-if="errorMessage" class="mt-4 text-red-500">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="mt-4 text-green-500">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const name = ref('');
  const firstName = ref('');
  const email = ref('');
  const message = ref('');
  const isCondition = ref(false);
  const isRgpd = ref(false);
  
  const errorMessage = ref('');
  const successMessage = ref('');
  const loading = ref(false);
  
  const router = useRouter();
  
  const handleSubmit = async () => {
    errorMessage.value = '';
    successMessage.value = '';
    loading.value = true;
  
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.value,
          name: name.value,
          email: email.value,
          message: message.value,
          isCondition: isCondition.value,
          isRgpd: isRgpd.value,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        successMessage.value = 'Avis envoyé avec succès!';
        name.value = '';
        firstName.value = '';
        email.value = '';
        message.value = '';
        isCondition.value = false;
        isRgpd.value = false;
      } else {
        errorMessage.value = result.message || 'Erreur lors de l\'envoi de l\'avis';
      }
    } catch (error) {
      errorMessage.value = 'Erreur lors de l\'envoi de l\'avis, veuillez réessayer plus tard.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  