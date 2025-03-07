<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const contactData = ref({
  phone: "",
  email: "",
  location: "",
  socialLinks: {
    facebook: "",
    telegram: "",
    linkedin: "",
    email: "",
  },
  mapImageUrl: "",
});

const loading = ref(true);
const successMessage = ref(null);
const errorMessage = ref(null);

// Fetch existing contact details
const fetchContactData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/contact");
    contactData.value = response.data;
  } catch (error) {
    errorMessage.value = "Failed to load contact details.";
    console.error("❌ Error fetching contact data:", error);
  } finally {
    loading.value = false;
  }
};

// Update contact details
const updateContact = async () => {
  try {
    const response = await axios.put("http://localhost:5000/api/contact", contactData.value);
    successMessage.value = "✅ Contact details updated successfully!";
    console.log("✅ Update response:", response.data);
  } catch (error) {
    errorMessage.value = "❌ Failed to update contact details.";
    console.error("❌ Error updating contact:", error);
  }
};

// Load data on component mount
onMounted(fetchContactData);
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6 mt-17">
    <div v-if="loading" class="text-lg text-gray-600">Loading...</div>
    <div v-else class="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">✏️ Edit Contact Details</h2>

      <div v-if="successMessage" class="bg-green-100 text-green-800 p-3 rounded mb-4">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="bg-red-100 text-red-800 p-3 rounded mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="updateContact">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Phone</label>
          <input v-model="contactData.phone" type="text" class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Email</label>
          <input v-model="contactData.email" type="email" class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Location</label>
          <input v-model="contactData.location" type="text" class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Facebook</label>
          <input v-model="contactData.socialLinks.facebook" type="url" class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Telegram</label>
          <input v-model="contactData.socialLinks.telegram" type="url" class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium">LinkedIn</label>
          <input v-model="contactData.socialLinks.linkedin" type="url" class="w-full p-2 border rounded" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Map Image URL</label>
          <input v-model="contactData.mapImageUrl" type="url" class="w-full p-2 border rounded" />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
          Update Contact
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
input {
  border: 1px solid #ccc;
}
</style>
