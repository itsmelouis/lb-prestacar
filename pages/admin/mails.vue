<template>
  <Toast />
  <div class="mt-8">
    <div class="flex flex-col md:flex-row justify-around items-center gap-5 md:gap-0">
      <div class="flex flex-row justify-center items-center gap-5">
        <Dropdown v-model="mailASuppr" :options="mails" optionLabel="email" optionValue="email"
          placeholder="Choisir un email" />
        <Button label="Supprimer" severity="primary" @click="handleDeleteEmail" />
      </div>
      <Button label="Lancer une campagne de mailing" severity="primary" @click="handleMailing" />
      <Button label="Ajouter" severity="primary" @click="showAddMailDialog = true" />
    </div>
    <main class="container mx-auto my-10">
      <DataTable :value="contact" showGridlines>
        <Column field="email" header="Email" />
        <Column field="prenom" header="Prénom" />
        <Column field="nom" header="Nom" />
        <Column field="telephone" header="Téléphone" />
        <Column field="date_presation" header="Date de prestation">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.date_presation) }}
          </template>
        </Column>
        <Column field="type_prestation" header="Type de prestation" />
        <Column field="vehicule" header="Véhicule" />
      </DataTable>
    </main>
  </div>

  <Dialog header="Ajouter une réservation" v-model:visible="showAddMailDialog" modal>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Row 1: Nom et Prénom -->

      <div>
        <label for="lastName" class="text-sm text-gray-700">Nom</label>
        <InputText id="lastName" v-model="form.name" class="w-full" />
      </div>
      <div>
        <label for="firstName" class="text-sm text-gray-700">Prénom</label>
        <InputText id="firstName" v-model="form.firstName" class="w-full" />
      </div>

      <!-- Row 2: Téléphone et Adresse Mail -->

      <div>
        <label for="phone" class="text-sm text-gray-700">Téléphone</label>
        <InputText id="phone" type="tel" v-model="form.phone" class="w-full" />
      </div>
      <div>
        <label for="email" class="text-sm text-gray-700">Adresse mail</label>
        <AutoComplete id="email" v-model="form.email" :suggestions="suggestions" @complete="search" class="w-full" />
      </div>
      <!-- Véhicule -->
      <div class="mb-4">
        <label for="vehicle" class="text-sm text-gray-700">Véhicule</label>
        <Dropdown id="vehicle" v-model="form.vehicle" editable :options="cars" optionLabel="nom" optionValue="nom"
          class="w-full" />
      </div>
      <!-- Date de la prestation -->
      <div class="mb-4">
        <label for="serviceDate" class="block text-sm font-medium text-gray-700">Date de la prestation</label>
        <Calendar id="serviceDate" v-model="form.serviceDate" class="w-full" />
      </div>
      <!-- Type de la prestation -->
      <div class="mb-4">
        <label for="serviceDate" class="block text-sm font-medium text-gray-700">Type de la prestation</label>
        <Dropdown id="vehicle" v-model="form.typePrestation" editable :options="typeServices" optionLabel="label"
          optionValue="label" class="w-full" />

      </div>
      <!-- Submit Button -->
      <div class="flex justify-end">
        <Button label="Envoyer" severity="primary" type="submit" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import type { Contact, Voiture } from '@prisma/client';
import { useToast } from 'primevue/usetoast';

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}


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

const toast = useToast();

const showAddMailDialog = ref(false);
const form = ref({
  name: '',
  firstName: '',
  phone: '',
  email: '',
  vehicle: '',
  serviceDate: null,
  typePrestation: '',
  message: 'Réservation ajoutée manuellement par un administrateur. Pas de message donc associé à la réservation.',
  isCondition: true,
  isRgpd: false,
});

const mailASuppr = ref('');
const { data } = useFetch<User[]>('/api/admin/mail', { method: 'GET' });
const { data: contact, refresh } = useFetch<Contact[]>('/api/admin/contact')

const mails = computed(() => data.value || []);

const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const handleMailing = async () => {
  try {
    const response = await $fetch('/api/admin/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    toast.add({ severity: 'success', summary: 'Campagne de mailing lancée !', detail: "La campagne de mailing a bien été envoyé !", life: 3000 });
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteEmail = async () => {
  if (!mailASuppr.value) {
    return; // Si aucun email n'est sélectionné, ne fait rien
  }

  try {
    const response = await $fetch(`/api/admin/contact/${mailASuppr.value}`, {
      method: 'DELETE'
    });
    await refresh();
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async () => {
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
      message: 'Réservation ajoutée manuellement par un administrateur. Pas de message donc associé à la réservation.',
      isCondition: false,
      isRgpd: false,
    };
    refresh();
    showAddMailDialog.value = false;
    toast.add({ severity: 'success', summary: 'Devis créé !', detail: response.message, life: 3000 });
    console.log('Formulaire soumis avec succès:', response);
  } catch (error: any) {
    console.error('Erreur lors de la soumission du formulaire:', error);
  }
};
watchEffect(() => {
  console.log(contact.value);
});
</script>
