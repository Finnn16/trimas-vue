// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Akan dibuat untuk halaman utama
import CompanyDetails from '../views/CompanyDetails.vue'; // Halaman baru

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/company-details',
    name: 'CompanyDetails',
    component: CompanyDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;