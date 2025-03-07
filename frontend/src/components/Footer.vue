<template>
    <footer class="bg-gray-900 text-white py-6 mt-12">
      <div class="container mx-auto text-center">
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/" class="hover:text-gray-400">Home</router-link>
          <router-link to="/about" class="hover:text-gray-400">About</router-link>
          <router-link to="/services" class="hover:text-gray-400">Services</router-link>
          <router-link to="/contact" class="hover:text-gray-400">Contact</router-link>
        </div>
  
        <div class="mt-4">
          <p class="text-sm">© {{ new Date().getFullYear() }} Your Company. All Rights Reserved.</p>
        </div>
  
        <div class="mt-4 flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" class="hover:text-blue-500">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" class="hover:text-blue-400">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" class="hover:text-blue-600">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  footer a {
    transition: color 0.3s;
  }
  </style>
  