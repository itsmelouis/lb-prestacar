<template>
  <div class="flex justify-center">
    <div class="w-full max-w-4xl">
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
          <Dropdown v-model="selectedCategories" :options="categories" optionLabel="nom" placeholder="Liste catégorie" class="border rounded-md p-2" multiple />
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
          <label for="category" class="block text-sm font-semibold">Choisir une ou plusieurs catégories</label>
          <MultiSelect v-model="selectedCategories" :options="categories" optionValue="id" optionLabel="nom" placeholder="Sélectionner des catégories" :maxSelectedLabels="3" class="w-full" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold">Ajouter des prix</label>
          <DataTable :value="prices" class="w-full mb-4">
            <Column field="temps" header="Temps" />
            <Column field="prix" header="Prix" />
          </DataTable>
          <div class="flex items-center justify-end mb-4">
            <button class="cursor-pointer p-2 border w-8 h-8 rounded-full flex items-center hover:bg-gray-200" @click="showPriceDialog = true">
              <Icon name="material-symbols:add" size="24px" />
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold">Ajouter des options</label>
          <DataTable :value="options" class="w-full mb-4">
            <Column field="option" header="Options" />
            <Column field="prix" header="Prix" />
          </DataTable>
          <div class="flex items-center justify-end mb-4">
            <button class="cursor-pointer p-2 border w-8 h-8 rounded-full flex items-center hover:bg-gray-200" @click="showOptionDialog = true">
              <Icon name="material-symbols:add" size="24px" />
            </button>
          </div>
        </div>

        <Button label="Ajouter" severity="primary" type="submit" class="w-full mt-4" @click="submitForm" />
      </div>
    </div>

    <!-- Dialog for adding prices -->
    <Dialog header="Ajouter un prix" v-model:visible="showPriceDialog" modal>
      <div class="p-fluid">
        <div class="field">
          <label for="newPriceTemps" class="block">Temps</label>
          <InputText id="newPriceTemps" v-model="newPrice.temps" />
        </div>
        <div class="field">
          <label for="newPricePrix" class="block">Prix</label>
          <InputText id="newPricePrix" v-model="newPrice.prix" />
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <Button label="Ajouter" @click="addPrice" severity="primary" />
      </div>
    </Dialog>

    <!-- Dialog for adding options -->
    <Dialog header="Ajouter une option" v-model:visible="showOptionDialog" modal>
      <div class="p-fluid">
        <div class="field">
          <label for="newOptionOption" class="block">Option</label>
          <InputText id="newOptionOption" v-model="newOption.option" />
        </div>
        <div class="field">
          <label for="newOptionPrix" class="block">Prix</label>
          <InputText id="newOptionPrix" v-model="newOption.prix" />
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <Button label="Ajouter" @click="addOption" severity="primary" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">

interface Categorie {
  id: number;
  nom: string;
}

const categoryName = ref('');
const selectedCategories = ref<number[]>([]);
const categories = ref<Categorie[]>([]);
const carName = ref('');
const imageUrl = ref('');
const description = ref('');
const prices = ref<{ temps: string, prix: string }[]>([]);
const options = ref<{ option: string, prix: string }[]>([]);
const showPriceDialog = ref(false);
const showOptionDialog = ref(false);
const newPrice = ref({ temps: '', prix: '' });
const newOption = ref({ option: '', prix: '' });

const fetchCategories = async () => {
  try {
    categories.value = await $fetch<Categorie[]>('/api/category');
    console.log('Catégories récupérées:', categories.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
};

onMounted(() => {
  fetchCategories();
});

const addPrice = () => {
  if (newPrice.value.temps && newPrice.value.prix) {
    prices.value.push({ ...newPrice.value });
    newPrice.value = { temps: '', prix: '' };
    showPriceDialog.value = false;
  }
};

const addOption = () => {
  if (newOption.value.option && newOption.value.prix) {
    options.value.push({ ...newOption.value });
    newOption.value = { option: '', prix: '' };
    showOptionDialog.value = false;
  }
};

const addCategory = async () => {
  try {
    const response = await $fetch('/api/admin/category', {
      method: 'POST',
      body: { nom: categoryName.value }
    });
    if (response.hasOwnProperty('error') && response.error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', response.error);
    } else {
      categories.value.push(response);
      categoryName.value = '';
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie:', error);
  }
};

const deleteCategory = async () => {
  if (selectedCategories.value.length === 0) {
    return;
  }

  try {
    const response = await $fetch(`/api/admin/category/${selectedCategories.value[0]}`, {
      method: 'DELETE'
    });
    if (response.statusCode !== 200) {
      console.error('Erreur lors de la suppression de la catégorie:', response.message);
    } else {
      categories.value = categories.value.filter(category => category.id !== selectedCategories.value[0]);
      selectedCategories.value = [];
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
  }
};

const submitForm = async () => {
  // Vérifiez que selectedCategories est un tableau
  if (!Array.isArray(selectedCategories.value)) {
    console.error('Les catégories sélectionnées ne sont pas valides.');
    return;
  }

  // Vérifiez que tous les champs obligatoires sont remplis
  if (!carName.value || !imageUrl.value || !description.value || selectedCategories.value.length === 0) {
    console.error('Tous les champs obligatoires ne sont pas remplis.');
    return;
  }

  const carData = {
    name: carName.value,
    pictureName: imageUrl.value,
    description: description.value,
    idCategorie: selectedCategories.value,
    options: options.value.map(option => ({
      name: option.option,
      price: option.prix
    })),
    prices: prices.value.map(price => ({
      duration: price.temps,
      price: price.prix
    }))
  };

  try {
    const response = await $fetch('/api/admin/car', {
      method: 'POST',
      body: carData,
    });

    if (response.error) {
      console.error('Erreur lors de l\'ajout de la voiture:', response.error);
    } else {
      console.log('Voiture ajoutée avec succès:', response);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la voiture:', error);
  }
};
</script>

<style scoped>
/* Ajoutez ici vos styles personnalisés */
</style>
