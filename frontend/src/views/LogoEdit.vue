<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const logoUrl = ref(""); 
const loading = ref(true);
const error = ref(null);

// ✅ Fetch current logo from backend
const fetchLogo = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/logo");
    if (response.data && response.data.imageUrl) {
      logoUrl.value = response.data.imageUrl;
    }
  } catch (err) {
    console.error("❌ Failed to fetch logo:", err);
  } finally {
    loading.value = false;
  }
};

// ✅ Update logo function
const updateLogo = async () => {
  try {
    if (!logoUrl.value.trim()) {
      alert("⚠️ Please enter a valid logo URL.");
      return;
    }

    const payload = { imageUrl: logoUrl.value };  // ✅ Ensure correct payload structure

    const response = await axios.put(
      "http://localhost:5000/api/logo",
      payload,
      { headers: { "Content-Type": "application/json" } }  // ✅ Fix Content-Type
    );

    console.log("✅ Logo Updated:", response.data);
    alert("✅ Logo updated successfully!");
  } catch (err) {
    console.error("❌ Error updating logo:", err);
    alert("❌ Failed to update logo. Check console for details.");
  }
};

// ✅ Load logo on page load
onMounted(fetchLogo);
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center mt-5">
    <h1 class="text-2xl font-bold">Edit Logo</h1>

    <div class="mt-6 p-6 bg-white shadow rounded-lg w-full max-w-sm">
      <label class="block text-sm font-semibold">Logo URL</label>
      <input
        v-model="logoUrl"
        type="text"
        class="w-full border rounded p-2 mt-2"
        placeholder="Enter new logo URL"
      />
      
      <div v-if="logoUrl" class="mt-4">
        <img :src="logoUrl" alt="Preview" class="w-32 mx-auto" />
      </div>

      <button 
        @click="updateLogo"
        class="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Update Logo
      </button>
    </div>
  </div>
</template>
