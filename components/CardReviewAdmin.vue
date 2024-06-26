<template>
  <li class="text-sm leading-6 list-none">
    <div class="relative group flex items-center justify-between">
      <div class="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-black flex-grow">
        <div class="flex items-center space-x-4">
          <img
            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Avatar">
          <div>
            <h3 class="text-lg font-semibold">{{ firstname }} {{ name }}</h3>
            <p class="text-sm text-gray-600">{{ email }}</p>
          </div>
        </div>
        <p class="leading-normal text-md">{{ message }}</p>
      </div>
      <div class="flex flex-col space-y-2 ml-4">
        <button
          v-if="!isValidated"
          class="flex items-center justify-center w-12 h-12 border-2 border-green-500 rounded-full text-green-500 hover:text-green-700 hover:border-green-700"
          @click="handleApprove"
        >
          <Icon name="material-symbols:check" class="text-3xl"/>
        </button>
        <button
          class="flex items-center justify-center w-12 h-12 border-2 border-red-500 rounded-full text-red-500 hover:text-red-700 hover:border-red-700"
          @click="confirmDelete"
        >
          <Icon name="radix-icons:cross-1" class="text-3xl"/>
        </button>
      </div>
    </div>
    <Dialog v-model:visible="showDialog" :modal="true" :dismissable-mask="false" :style="{ width: '400px' }">
      <template #header>
        <h3>Confirmation</h3>
      </template>
      <div class="p-4">
        <p>Voulez-vous vraiment supprimer cet avis ?</p>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button label="Annuler" @click="showDialog = false" />
          <Button label="Supprimer" severity="primary" @click="handleDelete" />
        </div>
      </template>
    </Dialog>
  </li>
</template>

<script setup lang="ts">

interface CardReviewProps {
  id: number;
  name: string;
  firstname: string;
  email: string;
  message: string;
  isValidated: boolean;
}

const props = defineProps<CardReviewProps>();
const emit = defineEmits(['approve', 'delete']);
const showDialog = ref(false);

const handleApprove = () => {
  emit('approve', props.id);
};

const handleDelete = () => {
  emit('delete', props.id);
  showDialog.value = false;
};

const confirmDelete = () => {
  showDialog.value = true;
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
