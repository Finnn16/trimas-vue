import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutUs.vue";
import CareerPage from "../views/CareerPage.vue";
import JobDetail from "../views/JobDetail.vue";
import CatalogPage from "@/views/CatalogPage.vue";
import ArticleList from "@/views/ArticleList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Home - Trimas SGI" },
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: AboutUs,
    meta: { title: "About Us - Trimas SGI" },
  },
  {
    path: "/career-page",
    name: "CareerPage",
    component: CareerPage,
    meta: { title: "Career - Trimas SGI" },
  },
  {
    path: "/job-detail/:id",
    name: "JobDetail",
    component: JobDetail,
    meta: { title: "Job Detail - Trimas SGI" },
  },
  {
    path: "/catalog-page",
    name: "CatalogPage",
    component: CatalogPage,
    meta: { title: "Catalog - Trimas SGI" },
  },
  {
    path: "/article-list",
    name: "ArticleList",
    component: ArticleList,
    meta: { title: "Article List - Trimas SGI" },
  },
  {
    path: "/:pathMatch(.*)*", // Fallback untuk path yang tidak dikenali
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
