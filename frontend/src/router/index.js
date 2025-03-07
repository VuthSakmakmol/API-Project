import { createRouter, createWebHistory } from 'vue-router';

import LogoEdit from "../views/LogoEdit.vue";

import Home from "../views/Home.vue";
import HomeEdit from "../views/HomeEdit.vue";



import About from '../views/About.vue';
import AboutEdit from "../views/AboutEdit.vue"; 

import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';


import Product from '../views/Product.vue';
import ProductDetail from "../views/ProductDetail.vue";
import ProductEdit from "../views/ProductEdit.vue";

import Contact from "../views/Contact.vue";
import ContactEdit from "../views/ContactEdit.vue";
import Register from '../views/Register.vue';

import Services from "../views/Service.vue"; 
import ServiceEdit from "../views/ServiceEdit.vue";

const routes = [
  { path: "/admin/logo-edit", component: LogoEdit, meta: { requiresAdmin: true } },
  
  { path: "/", name: "Home", component: Home },
  { path: "/home-edit", name: "HomeEdit", component: HomeEdit },
   
  { path: '/login', component: Login },
  { 
    path: '/admin/dashboard', 
    component: AdminDashboard,
    meta: { requiresAdmin: true } // ✅ Protect this route
  },
  { path: "/products", component: Product },
  { path: "/product/:name", component: ProductDetail },
  { path: "/product/:name/edit", component: ProductEdit },

  { path: '/about', component: About },
  { path: "/admin/about-edit", component: AboutEdit },



  { path: '/services', component: Services },
  { path: '/product', component: Product },
  
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/admin/contact-edit", name: "ContactEdit", component: ContactEdit, meta: { requiresAdmin: true } },

  { path: "/service", name: "Service", component: Services },
  { path: "/admin/service-edit", name: "ServiceEdit", component: ServiceEdit, meta: { requiresAdmin: true } }, // ✅ Route for Service Edit Page


  { path: '/register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Navigation Guard: Only allow admin access to the dashboard
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem("role") === "admin";
  if (to.meta.requiresAdmin && !isAdmin) {
    alert("🚫 Access Denied: Admins only.");
    return next('/'); // Redirect non-admins to home
  }
  next();
});

export default router;
