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
        <form @submit.prevent="checkForm">
          <!-- Row 1: Nom et Prénom -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="lastName" class="text-sm text-gray-700">Nom</label>
              <InputText id="lastName" v-model="form.lastName" required />
            </div>
            <div>
              <label for="firstName" class="text-sm text-gray-700">Prénom</label>
              <InputText id="firstName" v-model="form.firstName" required />
            </div>
          </div>
          <!-- Row 2: Téléphone et Adresse Mail -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="phone" class="text-sm text-gray-700">Téléphone</label>
              <InputText id="phone" type="tel" v-model="form.phone" required />
            </div>
            <div>
              <label for="mail" class="text-sm text-gray-700">Adresse mail</label>
              <AutoComplete v-model="form.mail" :suggestions="suggestions" @complete="search" required />
            </div>
          </div>
          <!-- Véhicule -->
          <div class="mb-4">
            <label for="vehicle" class="text-sm text-gray-700">Véhicule</label>
            <Dropdown v-model="form.car" id="vehicle" editable :options="cars" optionLabel="nom" class="w-full" />
          </div>
          <!-- Date de la prestation -->
          <div class="mb-4">
            <label for="date" class="block text-sm text-gray-700">Date de la prestation</label>
            <Calendar v-model="form.datePrestation" required />
          </div>
          <!-- Type de prestation -->
          <div class="mb-4">
            <label for="service_type" class="text-sm text-gray-700">Type de prestation</label>
            <Dropdown id="service_type" v-model="form.typeService" editable :options="typeServices" optionLabel="label" class="w-full" required />
          </div>
          <!-- Message -->
          <div class="mb-4">
            <label for="message" class="text-sm text-gray-700">Message</label>
            <Textarea id="message" class="w-full" rows="4" v-model="form.message" required />
          </div>
          <!-- Checkbox: J'accepte les conditions -->
          <div class="mb-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <Checkbox v-model="form.isCondition" id="terms" :binary="true" required />
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
import type { Voiture } from '@prisma/client'
import { ref } from 'vue'

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

const suggestions = ref<string[]>([]);

const form = reactive({
  lastName: '',
  firstName: '',
  phone: '',
  mail: '',
  car: '',
  datePrestation: null,
  typeService: '',
  message: '',
  isCondition: false,
  isRgpd: false
});

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

// Fonction pour vérifier le formulaire
function checkForm() {
  if (Object.values(form).some(value => value === "" || value === null)) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  // Vérification email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.mail)) {
    alert("Veuillez saisir une adresse email valide");
    return;
  }

  // Vérification numéro de téléphone
  const phoneRegex = /^(0|\+33|0033|\\+33)[1-9]([-. ]?[0-9]{2}){4}$/; // France
  const belgianPhoneRegex = /^(0|\+32|0032|\\+32)[1-9]([-. ]?[0-9]){8}$/; // Belgique
  if (!phoneRegex.test(form.phone) || !belgianPhoneRegex.test(form.phone)) {
    alert("Veuillez saisir un numéro de téléphone valide (France ou Belgique)");
    return;
  }

  // Si toutes les vérifications sont passées, le formulaire est valide
  alert("Formulaire envoyé");
}
</script>
