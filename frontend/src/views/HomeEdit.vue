<template>
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
      <h2 class="text-xl font-bold mb-2">Home Page</h2>
      <p class="text-sm text-gray-600">Manage homepage content</p>
      <button 
        @click="openModal" 
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Edit Homepage
      </button>
    </div>
  
    <!-- ✅ Full-Screen Responsive Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[90vh] overflow-auto">
        <h2 class="text-3xl font-semibold mb-4 text-center">Edit Homepage</h2>
  
        <!-- ✅ Title Input -->
        <div class="mb-4">
          <label class="block text-lg font-semibold">Title</label>
          <input v-model="form.title" type="text" class="w-full px-4 py-3 border rounded-lg text-lg"
            :placeholder="existingData.title || 'Enter homepage title'" />
        </div>
  
        <!-- ✅ Description Input -->
        <div class="mb-4">
          <label class="block text-lg font-semibold">Description</label>
          <textarea v-model="form.description" class="w-full px-4 py-3 border rounded-lg text-lg"
            :placeholder="existingData.description || 'Enter homepage description'"></textarea>
        </div>
  
        <!-- ✅ Image Upload or URL -->
        <div v-for="(image, index) in form.images" :key="index" class="mb-4">
          <label class="block text-lg font-semibold">Image {{ index + 1 }}</label>
          <input v-model="form.images[index]" type="text" class="w-full px-4 py-3 border rounded-lg text-lg mb-2"
            :placeholder="existingData.images[index] || 'Enter Image URL'" />
          <input type="file" @change="uploadImage($event, index)" class="w-full p-2 border rounded-lg" />
        </div>
  
        <!-- ✅ Buttons -->
        <div class="flex justify-between mt-6">
          <button @click="closeModal" class="px-6 py-3 bg-gray-400 text-white text-lg rounded-lg">
            Cancel
          </button>
          <button @click="saveChanges" class="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  // ✅ Modal State
  const isModalOpen = ref(false);
  
  // ✅ Data Storage
  const existingData = ref({
    title: "",
    description: "",
    images: ["", "", ""], // Ensure it's an array
  });
  
  const form = ref({
    title: "",
    description: "",
    images: ["", "", ""],
  });
  
  // ✅ Open Modal & Load Existing Data
  const openModal = async () => {
    isModalOpen.value = true;
    await fetchHomeData();
  };
  
  // ✅ Close Modal
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  // ✅ Fetch Existing Homepage Data
  const fetchHomeData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/home");
      existingData.value = response.data;
      form.value = { ...response.data }; // Copy data for editing
    } catch (error) {
      console.error("❌ Error fetching homepage data:", error);
    }
  };
  
  // ✅ Handle Image Upload
  const uploadImage = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      form.value.images[index] = response.data.imageUrl; // Set uploaded URL
    } catch (error) {
      console.error("❌ Error uploading image:", error);
    }
  };
  
  // ✅ Save Changes
  const saveChanges = async () => {
    try {
      await axios.put("http://localhost:5000/api/home", form.value);
      console.log("✅ Homepage updated successfully!");
      closeModal();
    } catch (error) {
      console.error("❌ Error updating homepage:", error);
    }
  };
  
  // ✅ Load data on mount
  onMounted(fetchHomeData);
  </script>
