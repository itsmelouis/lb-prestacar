<template>
  <Toast position="top-right" />
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Section Image à gauche -->
    <div class="hidden lg:block lg:w-1/2 rounded-xl">
      <CldImage src="aston_martin_volante/1" width="987" height="987" alt="My Awesome Image" />
    </div>
    <!-- Section Formulaire à droite -->
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-center mb-4">
          <img src="/logo-white.svg" alt="Petite image" class="w-24 h-24 object-contain">
        </div>
        <form @submit.prevent="handleSubmit">
          <!-- Row 1: Nom et Prénom -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="lastName" class="text-sm text-gray-700">Nom</label>
              <InputText id="lastName" v-model="form.name" class="w-full" />
            </div>
            <div>
              <label for="firstName" class="text-sm text-gray-700">Prénom</label>
              <InputText id="firstName" v-model="form.firstName" class="w-full" />
            </div>
          </div>
          <!-- Row 2: Téléphone et Adresse Mail -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="phone" class="text-sm text-gray-700">Téléphone</label>
              <InputText id="phone" type="tel" v-model="form.phone" class="w-full" />
            </div>
            <div>
              <label for="email" class="text-sm text-gray-700">Adresse mail</label>
              <AutoComplete id="email" v-model="form.email" :suggestions="suggestions" @complete="search" class="w-full" />
            </div>
          </div>
          <!-- Véhicule -->
          <div class="mb-4">
            <label for="vehicle" class="text-sm text-gray-700">Véhicule</label>
            <Dropdown id="vehicle" v-model="form.vehicle" editable :options="cars" optionLabel="nom" optionValue="nom" class="w-full" />
          </div>
          <!-- Date de la prestation -->
          <div class="mb-4">
            <label for="serviceDate" class="block text-sm font-medium text-gray-700">Date de la prestation</label>
            <Calendar id="serviceDate" v-model="form.serviceDate" class="w-full" />
          </div>
          <!-- Type de la prestation -->
          <div class="mb-4">
            <label for="serviceDate" class="block text-sm font-medium text-gray-700">Type de la prestation</label>
            <Dropdown id="vehicle" v-model="form.typePrestation" editable :options="typeServices" optionLabel="label" optionValue="label" class="w-full" />
          </div>
          <!-- Message -->
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <Textarea id="message" v-model="form.message" class="w-full" rows="4" />
          </div>
          <!-- Checkbox: J'accepte les conditions -->
          <div class="mb-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <Checkbox v-model="form.isCondition" id="terms" :binary="true" />
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
                <Checkbox v-model="form.isRgpd" id="rgpd" :binary="true" />
              </div>
              <div class="ml-3 text-sm">
                <label for="rgpd" class="font-medium text-gray-700">J'accepte le RGPD</label>
              </div>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="flex justify-end">
            <Button label="Envoyer" severity="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import type { Voiture } from '@prisma/client';
import { ref } from 'vue';

const form = ref({
  name: '',
  firstName: '',
  phone: '',
  email: '',
  vehicle: '',
  serviceDate: null,
  typePrestation: '',
  message: '',
  isCondition: false,
  isRgpd: false,
});

const typeServices = [
  { value: 'mariage', label: 'Mariage' },
  { value: 'anniversaire', label: 'Anniversaire' },
  { value: 'soiree', label: 'Soirée' },
  { value: 'enterrement', label: 'Enterrement' },
  { value: 'autre', label: 'Autre' },
];

const cars = ref<Voiture[]>([]);
const error = ref<string | null>(null);
const suggestions = ref<string[]>([]);
const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
const toast = useToast();

useFetch<Voiture[]>('/api/car')
  .then((response) => {
    if (response.data.value) {
      cars.value = response.data.value;
    } else {
      error.value = 'Aucune donnée disponible';
    }
  })
  .catch((err) => {
    error.value = err.message || 'Erreur lors du chargement des données';
  });

const search = (event: any) => {
  const query = event.query;
  if (query.includes('@')) {
    const [localPart, domainPart] = query.split('@');
    suggestions.value = emailDomains
      .filter(domain => domain.startsWith(domainPart))
      .map(domain => `${localPart}@${domain}`);
  } else {
    suggestions.value = emailDomains.map(domain => `${query}@${domain}`);
  }
};

const handleSubmit = async () => {
  // Client-side validation
  if (!form.value.name || !form.value.firstName || !form.value.phone || !form.value.email || !form.value.vehicle || !form.value.serviceDate || !form.value.typePrestation || !form.value.message || !form.value.isCondition || !form.value.isRgpd) {
    toast.add({ severity: 'warn', summary: 'Erreur', detail: 'Tous les champs doivent être remplis', life: 3000 });
    return;
  }

  if (form.value.message.length < 50) {
    toast.add({ severity: 'warn', summary: 'Erreur', detail: 'Le message ne doit pas dépasser 50 caractères', life: 3000 });
    return;
  }

  if (!form.value.isCondition) {
    toast.add({ severity: 'warn', summary: 'Erreur', detail: 'Vous devez accepter les conditions', life: 3000 });
    return;
  }

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(form.value),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    form.value = {
        name: '',
        firstName: '',
        phone: '',
        email: '',
        vehicle: '',
        serviceDate: null,
        typePrestation: '',
        message: '',
        isCondition: false,
        isRgpd: false,
      };
    toast.add({ severity: 'success', summary: 'Devis créé !', detail: response.message, life: 3000 });
    console.log('Formulaire soumis avec succès:', response);
  } catch (error: any) {
    console.error('Erreur lors de la soumission du formulaire:', error.value);
  }
};
</script>
