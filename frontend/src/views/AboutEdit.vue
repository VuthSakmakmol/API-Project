<template>
  <div class="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto mt-6">
    <h2 class="text-xl font-bold mb-4 text-center">Edit About Us</h2>

    <!-- Vision -->
    <label class="block text-sm font-semibold">Vision:</label>
    <textarea v-model="aboutData.vision" class="border p-2 w-full rounded-lg text-sm"></textarea>

    <!-- Team Section -->
    <label class="block text-sm font-semibold mt-2">Team Title:</label>
    <input v-model="aboutData.team.title" class="border p-2 w-full rounded-lg text-sm" />

    <label class="block text-sm font-semibold">Team Description:</label>
    <textarea v-model="aboutData.team.description" class="border p-2 w-full rounded-lg text-sm"></textarea>

    <label class="block text-sm font-semibold">Team Image URL:</label>
    <input v-model="aboutData.team.image" class="border p-2 w-full rounded-lg text-sm" />

    <!-- Core Values -->
    <label class="block text-sm font-semibold mt-2">Core Values:</label>
    <div v-for="(value, index) in aboutData.coreValues" :key="index" class="space-y-2">
      <input v-model="value.title" class="border p-2 w-full rounded-lg text-sm" placeholder="Title" />
      <textarea v-model="value.description" class="border p-2 w-full rounded-lg text-sm" placeholder="Description"></textarea>
      <input v-model="value.image" class="border p-2 w-full rounded-lg text-sm" placeholder="Image URL" />
    </div>

    <!-- Contact CTA -->
    <label class="block text-sm font-semibold mt-2">Contact CTA Text:</label>
    <input v-model="aboutData.contactCTA.text" class="border p-2 w-full rounded-lg text-sm" />

    <label class="block text-sm font-semibold">Button Label:</label>
    <input v-model="aboutData.contactCTA.buttonLabel" class="border p-2 w-full rounded-lg text-sm" />

    <label class="block text-sm font-semibold">Button Link:</label>
    <input v-model="aboutData.contactCTA.link" class="border p-2 w-full rounded-lg text-sm" />

    <!-- Action Buttons -->
    <div class="flex justify-between mt-4">
      <router-link to="/admin/dashboard" class="px-4 py-2 bg-gray-400 text-white text-sm rounded-lg">
        Cancel
      </router-link>
      <button @click="updateAbout" class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
        Save Changes
      </button>
    </div>

    <!-- Loading and Error states -->
    <div v-if="isLoading" class="text-center mt-4">Loading...</div>
    <div v-if="errorMessage" class="text-center mt-4 text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const aboutData = ref({
      vision: "",
      team: { title: "", description: "", image: "" },
      coreValues: [],
      contactCTA: { text: "", buttonLabel: "", link: "" },
    });
    const isLoading = ref(true);
    const errorMessage = ref(null);

    // Fetch About Data
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/about");
        if (response.data) {
          aboutData.value = response.data;
        }
      } catch (error) {
        console.error("❌ Error fetching About Us data:", error);
        errorMessage.value = "Failed to load About Us data. Please try again later.";
      } finally {
        isLoading.value = false;
      }
    };

    // Update About Us
    const updateAbout = async () => {
      try {
        if (!aboutData.value.vision || !aboutData.value.team.title) {
          errorMessage.value = "Please fill all required fields.";
          return;
        }

        await axios.put("http://localhost:5000/api/about", aboutData.value);
        alert("✅ About Us updated successfully!");
        errorMessage.value = null; // Clear any previous error message
      } catch (error) {
        console.error("❌ Error updating About Us:", error);
        errorMessage.value = "Failed to save About Us data. Please try again.";
      }
    };

    onMounted(fetchAboutData);

    return { aboutData, updateAbout, isLoading, errorMessage };
  },
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
  