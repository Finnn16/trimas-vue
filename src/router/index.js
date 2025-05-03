// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CareerPage from "../views/CareerPage.vue";
import JobDetail from "../views/JobDetail.vue";
import path from "path";
import AboutUs from "../views/AboutUs.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/career-page",
    name: "CareerPage",
    component: CareerPage,
  },
  {
    path: "/job-detail/:id",
    name: "JobDetail",
    component: JobDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
