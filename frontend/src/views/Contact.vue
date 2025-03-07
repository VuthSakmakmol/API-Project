<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTelegram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const contactData = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchContactData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/contact");
    contactData.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch contact data.";
    console.error("❌ Error fetching contact data:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchContactData);
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 mt-16">
    <div v-if="loading" class="text-lg text-gray-600">Loading...</div>
    <div v-else-if="error" class="text-red-600 font-semibold">{{ error }}</div>
    
    <div v-else class="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
      <h2 class="text-3xl font-bold text-gray-800 text-center mb-6">📞 Contact Us</h2>

      <!-- Contact Details -->
      <div class="space-y-4">
        <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow">
          <FontAwesomeIcon :icon="faPhone" class="text-blue-500 text-2xl mr-3" />
          <p class="text-lg font-medium">{{ contactData.phone }}</p>
        </div>

        <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow">
          <FontAwesomeIcon :icon="faEnvelope" class="text-red-500 text-2xl mr-3" />
          <a :href="'mailto:' + contactData.email" class="text-lg font-medium text-blue-600 hover:underline">
            {{ contactData.email }}
          </a>
        </div>

        <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow">
          <FontAwesomeIcon :icon="faMapMarkerAlt" class="text-green-500 text-2xl mr-3" />
          <p class="text-lg font-medium">{{ contactData.location }}</p>
        </div>
      </div>

      <!-- Social Media Links -->
      <div class="mt-6 text-center">
        <h3 class="text-xl font-semibold text-gray-700 mb-3">Connect with us</h3>
        <div class="flex justify-center space-x-6">
          <a :href="contactData.socialLinks.facebook" target="_blank" class="text-blue-600 text-3xl hover:text-blue-800">
            <FontAwesomeIcon :icon="faFacebook" />
          </a>
          <a :href="contactData.socialLinks.telegram" target="_blank" class="text-blue-400 text-3xl hover:text-blue-600">
            <FontAwesomeIcon :icon="faTelegram" />
          </a>
          <a :href="contactData.socialLinks.linkedin" target="_blank" class="text-blue-700 text-3xl hover:text-blue-900">
            <FontAwesomeIcon :icon="faLinkedin" />
          </a>
        </div>
      </div>

      <!-- Google Map -->
      <div class="mt-6">
        <img :src="contactData.mapImageUrl" alt="Map Location" class="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
