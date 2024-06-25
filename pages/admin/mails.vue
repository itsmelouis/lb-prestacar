<template>
  <div class="mt-8">
    <div class="flex justify-around items-center">
      <h2 class="font-semibold text-2xl">Liste des mails clients</h2>
      <div>
        <Dropdown v-model="mailASuppr" :options="mails" optionLabel="email" placeholder="Choisis un email" />
        <Button label="Supprimer" severity="primary" />
      </div>
      <Button label="Ajouter" severity="primary" />
    </div>
    <DataTable />
  </div>
</template>

<script setup lang="ts">
interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

const mailASuppr = ref('');
const { data } = useFetch<User[]>('/api/admin/mail', { method: 'GET' });
const mails = computed(() => data.value || []);

watchEffect(() => {
  console.log(mails.value);
});
</script>
