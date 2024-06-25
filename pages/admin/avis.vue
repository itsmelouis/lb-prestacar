<template>
    <div class="flex flex-col min-h-screen">
      <main class="flex flex-grow p-4">
        <div class="container mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <section class="lg:w-1/2">
            <h2 class="text-xl font-semibold mb-4">En attente de validation</h2>
            <ul class="space-y-4">
              <CardReviewAdmin
                v-for="review in pendingReviews"
                :key="review.id"
                :id="review.id"
                :name="review.nom"
                :firstname="review.prenom"
                :email="review.email"
                :message="review.message"
                :isValidated="review.estValide"
                @approve="approveReview"
                @delete="deleteReview"
              />
            </ul>
          </section>
          <div class="w-full lg:w-px bg-gray-300"></div>
          <section class="lg:w-1/2">
            <h2 class="text-xl font-semibold mb-4">Validé</h2>
            <ul class="space-y-4">
              <CardReviewAdmin
                v-for="review in approvedReviews"
                :key="review.id"
                :id="review.id"
                :name="review.nom"
                :firstname="review.prenom"
                :email="review.email"
                :message="review.message"
                :isValidated="review.estValide"
                @delete="deleteReview"
              />
            </ul>
          </section>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">

  
  interface Review {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    message: string;
    estValide: boolean;
    estRgpd: boolean;
    estCondition: boolean;
  }
  
  const pendingReviews = ref<Review[]>([]);
  const approvedReviews = ref<Review[]>([]);
  
  const fetchReviews = async () => {
    try {
      const response = await $fetch<Review[]>('/api/admin/review/');
      pendingReviews.value = response.filter(review => !review.estValide);
      approvedReviews.value = response.filter(review => review.estValide);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
    }
  };
  
  const approveReview = async (id: number) => {
    try {
      await $fetch(`/api/admin/review/${id}`, {
        method: 'PUT',
      });
      fetchReviews();
    } catch (error) {
      console.error('Erreur lors de la validation de l\'avis:', error);
    }
  };
  
  const deleteReview = async (id: number) => {
    try {
      await $fetch(`/api/admin/review/${id}`, {
        method: 'DELETE',
      });
      fetchReviews();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'avis:', error);
    }
  };
  
  onMounted(() => {
    fetchReviews();
  });
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  