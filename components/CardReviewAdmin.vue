<template>
  <li class="text-sm leading-6 list-none">
    <div class="relative group flex items-center justify-between">
      <div class="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-yellow-400 flex-grow">
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
        <button v-if="!isValidated" class="p-2 bg-green-500 text-white rounded-full hover:bg-green-600" @click="handleApprove">
          <Icon name="check" />
        </button>
        <button class="p-2 bg-red-500 text-white rounded-full hover:bg-red-600" @click="handleDelete">
          <Icon name="times" />
        </button>
      </div>
    </div>
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

const handleApprove = () => {
  emit('approve', props.id);
};

const handleDelete = () => {
  emit('delete', props.id);
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
