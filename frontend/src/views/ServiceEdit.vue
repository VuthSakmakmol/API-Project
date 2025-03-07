<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const servicesData = ref({
  title: "",
  description: "",
  services: [],
});

const loading = ref(true);
const successMessage = ref(null);
const errorMessage = ref(null);

// Fetch existing services data
const fetchServices = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/services");
    servicesData.value = response.data;
  } catch (error) {
    errorMessage.value = "❌ Failed to load services.";
    console.error("❌ Error fetching services:", error);
  } finally {
    loading.value = false;
  }
};

// Update services data
const updateServices = async () => {
  try {
    const response = await axios.put("http://localhost:5000/api/services", servicesData.value);
    successMessage.value = "✅ Services updated successfully!";
    console.log("✅ Update response:", response.data);
  } catch (error) {
    errorMessage.value = "❌ Failed to update services.";
    console.error("❌ Error updating services:", error);
  }
};

// Load data on component mount
onMounted(fetchServices);
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div v-if="loading" class="text-lg text-gray-600">Loading...</div>
    <div v-else class="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">✏️ Edit Services</h2>

      <div v-if="successMessage" class="bg-green-100 text-green-800 p-3 rounded mb-4">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="bg-red-100 text-red-800 p-3 rounded mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="updateServices">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Title</label>
          <input v-model="servicesData.title" type="text" class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Description</label>
          <textarea v-model="servicesData.description" rows="3" class="w-full p-2 border rounded"></textarea>
        </div>

        <h3 class="text-xl font-semibold text-gray-700 mb-3">Services</h3>

        <div v-for="(service, index) in servicesData.services" :key="index" class="mb-6 p-4 bg-gray-50 rounded shadow">
          <label class="block text-gray-700 font-medium">Service Name</label>
          <input v-model="service.name" type="text" class="w-full p-2 border rounded mb-2" />

          <label class="block text-gray-700 font-medium">Description</label>
          <textarea v-model="service.description" rows="2" class="w-full p-2 border rounded mb-2"></textarea>

          <label class="block text-gray-700 font-medium">Icon URL</label>
          <input v-model="service.icon" type="text" class="w-full p-2 border rounded" />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
input, textarea {
  border: 1px solid #ccc;
}
</style>
