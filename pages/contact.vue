<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Section Image à gauche -->
    <div class="hidden lg:block lg:w-1/2 aspect-square rounded-xl overflow-hidden">
      <img src="/hero_cadillac.jpeg" style="aspect-ratio: 400/400; object-fit: cover;" alt="Image d'une jolie Cadillac Escalade" class="h-full object-cover">
    </div>
    <!-- Section Formulaire à droite -->
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-center mb-4">
          <img src="/logo-white.svg" alt="Petite image" class="w-24 h-24 object-contain">
        </div>
        <form>
          <!-- Row 1: Nom et Prénom -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="lastName" class="text-sm text-gray-700">Nom</label>
              <InputText id="lastName" v-model="lastNameField" />
            </div>
            <div>
              <label for="firstName" class="text-sm text-gray-700">Prénom</label>
              <InputText id="firstName" v-model="firstNameField"/>
            </div>
          </div>
          <!-- Row 2: Téléphone et Adresse Mail -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="phone" class="text-sm text-gray-700">Téléphone</label>
              <InputText id="phone" type="tel" v-model="phoneField" />
            </div>
            <div>
              <label for="mail" class="text-sm text-gray-700">Adresse mail</label>
              <AutoComplete v-model="mailField" :suggestions="suggestions" @complete="search" />
            </div>
          </div>
          <!-- Véhicule -->
          <div class="mb-4">
            <label for="vehicle" class="text-sm text-gray-700">Véhicule</label>
            <Dropdown v-model="carField" id="vehicle" editable :options="cars" optionLabel="nom" class="w-full" />
          </div>
          <!-- Date de la prestation -->
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">Date de la prestation</label>
            <Calendar v-model="datePrestationField" />
          </div>
          <!-- Type de prestation -->
          <div class="mb-4">
            <label for="service_type" class="block text-sm font-medium text-gray-700">Type de prestation</label>
            <Dropdown id="service_type" v-model="typeServiceField" editable :options="typeServices" optionLabel="label" class="w-full" />
          </div>
          <!-- Message -->
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <Textarea id="message" class="w-full" rows="4" v-model="messageField" />
          </div>
          <!-- Checkbox: J'accepte les conditions -->
          <div class="mb-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <Checkbox v-model="isConditionField" id="terms" :binary="true" />
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
                <Checkbox v-model="isRgpdField" id="rgpd" :binary="true" />
              </div>
              <div class="ml-3 text-sm">
                <label for="rgpd" class="font-medium text-gray-700">J'accepte le RGPD</label>
              </div>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="flex justify-end">
            <Button label="Envoyer" severity="primary" @submit="checkForm" />

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Voiture } from '@prisma/client'

const typeServices = [
  { value: 'mariage', label: 'Mariage' },
  { value: 'anniversaire', label: 'Anniversaire' },
  { value: 'soiree', label: 'Soirée' },
  { value: 'enterrement', label: 'Enterrement' },
  { value: 'autre', label: 'Autre' },
];

const cars = ref<Voiture[]>([]);
const error = ref<string | null>(null);

useFetch<Voiture[]>(`/api/car`)
.then((response) => {
  if (response.data.value) {
    cars.value = response.data.value
  } else {
    error.value = 'Aucune donnée disponible'
  }
})
.catch((err) => {
  error.value = err.message || 'Erreur lors du chargement des données'
})

const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

const value = ref("");
const typePrestation = ref("");
const suggestions = ref<string[]>([]);

//Form v-model
const lastNameField = ref("");
const firstNameField = ref("");
const phoneField = ref("");
const mailField = ref("");
const carField = ref("");
const datePrestationField = ref<Date | null>(null);
const typeServiceField = ref("");
const messageField = ref("");
const isConditionField = ref(false);
const isRgpdField = ref(false);

watchEffect(() => {

})
;
// Fonction pour rechercher les suggestions d'email
const search = (event: any) => {
  const query = event.query;
  if (query.includes("@")) {
    const [localPart, domainPart] = query.split("@");
    suggestions.value = emailDomains
      .filter((domain) => domain.startsWith(domainPart))
      .map((domain) => `${localPart}@${domain}`);
  } else {
    suggestions.value = emailDomains.map((domain) => `${query}@${domain}`);
  }
};

function checkForm() {
  if (
    lastNameField.value === "" ||
    firstNameField.value === "" ||
    phoneField.value === "" ||
    mailField.value === "" ||
    carField.value === "" ||
    datePrestationField.value === null ||
    typeServiceField.value === "" ||
    messageField.value === "" ||
    !isConditionField.value ||
    !isRgpdField.value
  ) {
    alert("Veuillez remplir tous les champs");
  } else {
    alert("Formulaire envoyé");
  }
}

</script>
