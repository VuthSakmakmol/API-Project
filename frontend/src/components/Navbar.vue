<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const role = ref(localStorage.getItem("role") || null);
const menuOpen = ref(false);
const authMenuOpen = ref(false);
const logoUrl = ref(null);  // ✅ Holds the logo URL

// ✅ Fetch logo from API on mount
const fetchLogo = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/logo");
    console.log("✅ Logo Fetched:", response.data);

    if (response.data && response.data.imageUrl) {
      logoUrl.value = response.data.imageUrl;
    } else {
      console.warn("⚠️ No logo found, using default placeholder.");
      logoUrl.value = "/default-logo.png";  // ✅ Use default logo if missing
    }
  } catch (err) {
    console.error("❌ Failed to fetch logo:", err);
    logoUrl.value = "/default-logo.png";  // ✅ Fallback in case of error
  }
};

onMounted(fetchLogo);

// ✅ Watch localStorage to dynamically update role
watch(() => localStorage.getItem("role"), (newRole) => {
  role.value = newRole;
});

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleAuthMenu = () => {
  authMenuOpen.value = !authMenuOpen.value;
};

const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  role.value = null;
  authMenuOpen.value = false;
  router.push("/");
  window.location.reload();
};

// ✅ Navigation Links
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/product" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" }
];
</script>

<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container mx-auto flex justify-between items-center p-3">
      
      <!-- ✅ Logo (Fetched from API) -->
      <router-link to="/">
        <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="h-10">
        <span v-else class="text-gray-500">Loading logo...</span>
      </router-link>

      <!-- ✅ Desktop Navigation (All Pages) -->
      <div class="hidden lg:flex space-x-4">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path" 
          class="px-3 py-1 text-sm font-semibold uppercase text-black transition-all duration-200 rounded-md"
          :class="{ 'bg-gray-300': route.path === link.path }"
        >
          {{ link.name }}
        </router-link>

        <!-- ✅ Admin Dashboard (only for admins) -->
        <router-link 
          v-if="role === 'admin'" 
          to="/admin/dashboard" 
          class="px-3 py-1 text-sm font-semibold uppercase text-black transition-all duration-200 rounded-md"
          :class="{ 'bg-gray-300': route.path === '/admin/dashboard' }"
        >
          Admin
        </router-link>
      </div>

        <!-- ✅ Authentication Button -->
        <div class="relative">
          <button 
            @click="toggleAuthMenu" 
            class="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-all">
            <span>⚙️</span> <!-- Gear Icon -->
          </button>

          <!-- ✅ Dropdown Menu -->
          <div v-if="authMenuOpen" class="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md">
            <!-- ✅ Show Register & Login for Guests -->
            <router-link v-if="!role" to="/register" class="block px-4 py-2 text-sm hover:bg-gray-100">
              Register
            </router-link>
            <router-link v-if="!role" to="/login" class="block px-4 py-2 text-sm hover:bg-gray-100">
              Login
            </router-link>

            <!-- ✅ Show Logout for Logged-In Users -->
            <button v-if="role" @click="logout" class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>


      <!-- ✅ Hamburger Icon (Mobile Menu) -->
      <button @click="toggleMenu" class="lg:hidden focus:outline-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- ✅ Mobile Navigation (Hidden by Default) -->
    <div v-if="menuOpen" class="lg:hidden bg-white border-t shadow-md">
      <div class="flex flex-col items-center py-3 space-y-3">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path" 
          class="text-sm font-semibold text-black"
          @click="toggleMenu"
        >
          {{ link.name }}
        </router-link>

        <!-- ✅ Admin Dashboard (only for admins) -->
        <router-link 
          v-if="role === 'admin'" 
          to="/admin/dashboard" 
          class="text-sm font-semibold text-black"
          @click="toggleMenu"
        >
          Admin
        </router-link>

        <!-- ✅ Authentication Button -->
        <button @click="toggleAuthMenu" class="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-all">
          <span>⚙️</span> <!-- Gear Icon -->
        </button>

        <!-- ✅ Dropdown Menu (Mobile) -->
        <div v-if="authMenuOpen" class="w-40 bg-white border shadow-lg rounded-md text-center">
          <router-link v-if="!role" to="/register" class="block px-4 py-2 text-sm hover:bg-gray-100">
            Register
          </router-link>
          <router-link v-if="!role" to="/login" class="block px-4 py-2 text-sm hover:bg-gray-100">
            Login
          </router-link>
          <button v-if="role" @click="logout" class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
