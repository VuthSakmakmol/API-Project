<template>
  <div class="min-h-screen bg-gray-100 py-12 mt-15">
    <div class="container mx-auto px-6 md:px-12 lg:px-24">
      <!-- About Us -->
      <h1 class="text-4xl font-bold text-center text-gray-900">About Us</h1>
      <p class="text-center text-gray-600 mt-4">{{ about.vision }}</p>

      <!-- Our Team Section -->
      <div class="mt-12 flex flex-col md:flex-row items-center">
        <img :src="about.team.image" alt="Our Team" class="w-80 h-auto object-cover rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8" />
        <div>
          <h2 class="text-2xl font-semibold">{{ about.team.title }}</h2>
          <p class="text-gray-600 mt-2">{{ about.team.description }}</p>
        </div>
      </div>

      <!-- Our Core Values -->
      <h2 class="text-3xl font-bold text-center mt-12">Our Core Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div
          v-for="(value, index) in about.coreValues"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <img
            :src="value.image"
            alt="Core Value Image"
            class="w-24 h-24 object-cover mx-auto rounded-full mb-4"
          />
          <h3 class="text-xl font-semibold">{{ value.title }}</h3>
          <p class="text-gray-600 mt-2">{{ value.description }}</p>
        </div>
      </div>


      <!-- Call to Action -->
      <div class="text-center mt-12">
        <h2 class="text-2xl font-semibold">{{ about.contactCTA.text }}</h2>
        
        <a :href="about.contactCTA.link" target="_blank" rel="noopener noreferrer"
          class="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            {{ about.contactCTA.buttonLabel }}
        </a>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const about = ref({
  vision: "",
  team: { title: "", description: "", image: "" },
  coreValues: [],
  contactCTA: { text: "", buttonLabel: "", link: "" }
});

const fetchAboutData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/about");
    about.value = response.data;
  } catch (error) {
    console.error("❌ Error fetching About Us data:", error);
  }
};

onMounted(fetchAboutData);
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
