<template>
   <div>
     <!-- Section du menu en haut -->
     <div class="flex justify-center items-center bg-white p-4 border-b border-gray-300">
       <!-- Section gauche: Nom catégorie et Ajouter catégorie -->
       <div class="flex items-center space-x-4">
         <label for="categoryName" class="font-semibold">Nom catégorie</label>
         <InputText id="categoryName" v-model="categoryName" class="border rounded-md p-2" />
         <Button @click="addCategory" label="Ajouter catégorie" severity="primary" type="submit" />
       </div>
       <!-- Séparateur vertical -->
       <div class="border-l border-gray-300 h-8 mx-8"></div>
       <!-- Section droite: Liste catégorie et Supprimer catégorie -->
       <div class="flex items-center space-x-4">
         <Dropdown v-model="selectedCategory" :options="categories" optionLabel="nom" placeholder="Liste catégorie" class="border rounded-md p-2" />
         <Button @click="deleteCategory" label="Supprimer catégorie" severity="primary" type="submit" />
       </div>
     </div>
 
     <!-- Formulaire de gestion des véhicules -->
     <div class="p-6">
       <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
         <div>
           <label for="carName" class="block text-sm font-semibold">Nom de la voiture</label>
           <InputText id="carName" v-model="carName" class="border rounded-md p-2 w-full" />
         </div>
         <div>
           <label for="imageUrl" class="block text-sm font-semibold">Url image</label>
           <InputText id="imageUrl" v-model="imageUrl" class="border rounded-md p-2 w-full" />
         </div>
       </div>
 
       <div class="mb-4">
         <label for="description" class="block text-sm font-semibold">Description de la voiture</label>
         <Textarea id="description" v-model="description" rows="4" class="border rounded-md p-2 w-full" />
       </div>
 
       <div class="mb-4">
         <label for="category" class="block text-sm font-semibold">Choisir une catégorie</label>
         <Dropdown id="category" v-model="selectedCategory" :options="categories" optionLabel="nom" placeholder="Choisir une catégorie" class="border rounded-md p-2 w-full" />
       </div>
 
       
 
       <Button label="Ajouter" severity="primary" type="submit" class="w-full mt-4" @click="submitForm" />
     </div>
   </div>
 </template>
 
 <script setup lang="ts">

 
 const categoryName = ref('');
 const selectedCategory = ref(null);
 const categories = ref([
   { nom: 'SUV', id: 1 },
   { nom: 'Luxe', id: 2 },
   // Ajoutez d'autres catégories si nécessaire
 ]);
 
 const carName = ref('');
 const imageUrl = ref('');
 const description = ref('');

 
 const addCategory = () => {
   console.log('Ajouter catégorie:', categoryName.value);
 };
 
 const deleteCategory = () => {
   console.log('Supprimer catégorie:', selectedCategory.value);
 };
 

 
 const submitForm = () => {
   // Logic pour soumettre le formulaire
   console.log('Nom de la voiture:', carName.value);
   console.log('Url image:', imageUrl.value);
   console.log('Description:', description.value);
   console.log('Catégorie sélectionnée:', selectedCategory.value);
 };
 </script>