<template>
  <div class="min-h-screen bg-gray-100 p-6 pt-24">
  
    <h1 class="text-3xl font-semibold mb-6 text-center">Admin Dashboard</h1>

    <!-- Grid Layout for Admin Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Logo Edit Section -->
      <router-link to="/admin/logo-edit" 
        class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center justify-center border hover:shadow-xl transition">
        <h2 class="text-xl font-bold mb-2">Logo</h2>
        <p class="text-sm text-gray-600">Manage logo settings</p>
        <button class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition">
          ✏️ Edit Logo
        </button>
      </router-link>

      <!-- About Us Section -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
        <h2 class="text-xl font-bold mb-2">About Us</h2>
        <p class="text-sm text-gray-600">Manage About Us details</p>
        <button 
          @click="$router.push('/admin/about-edit')"
          class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition">
          ✏️ Edit About Us
        </button>
      </div>

      <!-- Services Section -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
        <h2 class="text-xl font-bold mb-2">Services</h2>
        <p class="text-sm text-gray-600">Manage services details</p>
        <button 
          @click="$router.push('/admin/service-edit')"
          class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition">
          ✏️ Edit Services
        </button>
      </div>

      <!-- Contact Us Section -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
        <h2 class="text-xl font-bold mb-2">Contact Us</h2>
        <p class="text-sm text-gray-600">Manage Contact Information</p>
        <button 
          @click="$router.push('/admin/contact-edit')"
          class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition">
          ✏️ Edit Contact 
        </button>
      </div>

      <!-- Home Page Section -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
        <h2 class="text-xl font-bold mb-2">Home Page</h2>
        <p class="text-sm text-gray-600">Manage homepage content</p>
        <button 
          @click="$router.push('/home-edit')"
          class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition">
          ✏️ Edit Homepage
        </button>
      </div>

      <!-- Product Management Section -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
        <h2 class="text-xl font-bold mb-2">Products</h2>
        <p class="text-sm text-gray-600">Manage product details</p>
        <button 
          @click="openProductListModal"
          class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition">
        ✏️ Edit Products
        </button>
      </div>

    </div>
  


    <!-- Product List Modal -->
    <div v-if="isProductListModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[90vh] overflow-auto">
        <h2 class="text-lg font-semibold mb-4 text-center">Edit Products</h2>

        <!-- Display All Products -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(product, index) in products" :key="index" class="bg-gray-100 p-3 rounded-lg shadow-md">
            <img :src="product.images[0]" :alt="product.name" class="w-full h-32 object-cover rounded-lg mb-2">
            <h3 class="text-sm font-semibold">{{ product.name }}</h3>
            <p class="text-xs text-gray-600">{{ product.description }}</p>
            <button 
              @click="selectProduct(product)" 
              class="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </div>
        </div>

        <button @click="closeModals" class="mt-4 px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition">
          Close
        </button>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[90vh] overflow-auto">
        <h2 class="text-lg font-semibold mb-4 text-center">Edit Product</h2>

        <div class="space-y-2">
          <label class="block text-sm font-semibold">Product Name:</label>
          <input v-model="selectedProduct.name" class="border p-2 w-full rounded-lg text-sm" />

          <label class="block text-sm font-semibold">Description:</label>
          <textarea v-model="selectedProduct.description" class="border p-2 w-full rounded-lg text-sm"></textarea>

          <label class="block text-sm font-semibold">Size:</label>
          <input v-model="selectedProduct.size" class="border p-2 w-full rounded-lg text-sm" />

          <label class="block text-sm font-semibold">Type:</label>
          <input v-model="selectedProduct.type" class="border p-2 w-full rounded-lg text-sm" />

          <label class="block text-sm font-semibold">Images:</label>
          <div v-for="(image, index) in selectedProduct.images" :key="index">
            <input v-model="selectedProduct.images[index]" class="border p-2 w-full rounded-lg text-sm" />
          </div>
          <div class="flex justify-between mt-4">
            <button @click="closeModals" class="px-4 py-2 bg-gray-400 text-white text-sm rounded-lg">
              Cancel
            </button>
            <button @click="updateProduct" class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

---

### **📌 Updated `AdminDashboard.vue` Script**
```vue
<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    // ✅ Products Management
    const products = ref([]);
    const selectedProduct = ref(null);
    const isEditModalOpen = ref(false);
    const isProductListModalOpen = ref(false);

    // ✅ Fetch Products
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        products.value = response.data || [];
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    // ✅ Open Modals
    const openProductListModal = () => {
      fetchProducts();
      isProductListModalOpen.value = true;
    };

    const selectProduct = (product) => {
      selectedProduct.value = { ...product };
      isEditModalOpen.value = true;
    };

    // ✅ Update Product
    const updateProduct = async () => {
      try {
        await axios.put(`http://localhost:5000/api/products/${selectedProduct.value._id}`, selectedProduct.value);
        alert("✅ Product updated successfully!");
        isEditModalOpen.value = false;
        fetchProducts();
      } catch (err) {
        console.error("❌ Error updating product:", err);
      }
    };

    const closeModals = () => {
      isEditModalOpen.value = false;
      isProductListModalOpen.value = false;
    };

    onMounted(fetchProducts);

    return {
      products, selectedProduct, isEditModalOpen, isProductListModalOpen,
      openProductListModal, selectProduct, updateProduct, closeModals,
    };
  },
};
</script>
