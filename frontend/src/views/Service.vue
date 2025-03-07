<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const servicesData = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchServices = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/services");
    servicesData.value = response.data;
  } catch (err) {
    error.value = "❌ Failed to load services.";
    console.error("❌ Error fetching services:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchServices);
</script>

<template>
  <div class="min-h-screen bg-gray-100 mt-16">
    <div class="container mx-auto py-12 px-6">
      
      <div v-if="loading" class="text-center text-lg text-gray-600">Loading...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>

      <div v-else>
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-4">{{ servicesData.title }}</h1>
        <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">{{ servicesData.description }}</p>

        <!-- Service List (Alternating Layout) -->
        <div class="space-y-12">
          <div 
            v-for="(service, index) in servicesData.services" 
            :key="index" 
            class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
            :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
          >
            <!-- Image -->
            <div class="md:w-1/2 flex justify-center">
              <img :src="service.icon" :alt="service.name" class="w-full max-w-sm rounded-lg shadow-lg">
            </div>

            <!-- Text Content -->
            <div class="md:w-1/2 text-center md:text-left">
              <h2 class="text-3xl font-semibold text-gray-800">{{ service.name }}</h2>
              <p class="text-gray-600 mt-2">{{ service.description }}</p>
              <router-link to="/contact" class="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-indigo-600 hover:to-blue-500 transition-all">
                Contact Us →
              </router-link>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<style scoped>
</style>
