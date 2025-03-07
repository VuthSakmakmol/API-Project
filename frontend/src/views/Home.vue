<template>
  <div class="min-h-screen bg-gray-100 relative">
    <!-- Hero Section -->
    <div class="relative w-full h-[700px] overflow-hidden">
      <!-- Auto-sliding images -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        :class="{ 'opacity-100': index === activeIndex, 'opacity-0': index !== activeIndex }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>

      <!-- Overlay and Text -->
      <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 class="text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
          {{ title }}
        </h1>
        <p class="text-2xl font-semibold text-white drop-shadow-lg mt-4">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- ✅ Sections -->
    <div class="container mx-auto my-12">
      <Product />
    </div>
    <div class="container mx-auto my-12">
      <About />
    </div>
    <div class="container mx-auto my-12">
      <Service />
    </div>
    <div class="container mx-auto my-12">
      <Contact />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Product from "../views/Product.vue";
import About from "../views/About.vue";
import Service from "../views/Service.vue";
import Contact from "../views/Contact.vue";

export default {
  components: {
    Product,
    About,
    Service,
    Contact,
  },
  data() {
    return {
      activeIndex: 0,
      images: [],
      title: "Loading...",
      description: "Fetching data...",
      intervalId: null,
    };
  },
  async mounted() {
    await this.fetchHomepageData();
    if (this.images.length > 1) {
      this.startImageSlider();
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchHomepageData() {
      try {
        const response = await axios.get("http://localhost:5000/api/home");
        console.log("✅ API Response:", response.data);

        if (response.data) {
          this.images = response.data.images || [];
          this.title = response.data.title || "No Title";
          this.description = response.data.description || "No Description";

          if (this.images.length > 1) {
            this.startImageSlider();
          }
        } else {
          console.error("🚨 Incorrect Data Structure:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching homepage data:", error);
        this.title = "Error loading data";
      }
    },
    startImageSlider() {
      if (this.images.length < 2) return;

      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.images.length;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.opacity-100 {
  opacity: 1;
  transition: opacity 1s ease-in-out;
}
.opacity-0 {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

h1, h2, h3 {
  font-family: 'Poppins', sans-serif;
}
</style>
