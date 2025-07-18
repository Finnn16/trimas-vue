<!-- src/views/Home.vue -->
<template>
  <main class="main-content">
    <HeroSection />
    <BrandSlider />
    <ProductionInfo />
    <h1 class="head-content">
      Shipping<span style="color: #092e5e"> Brands</span>
    </h1>
    <ShippingMap />
  </main>
</template>

<script>
import PresidentMessage from "../components/PresidentMessage.vue";
import BrandSlider from "../components/BrandCarousel.vue";
import ProductionInfo from "../components/ProductionInfo.vue";
import HeroSection from "../components/HeroSection.vue";
import { useRouter } from "vue-router"; // Impor useRouter
import ShippingMap from "@/components/ShippingMap.vue";

export default {
  name: "Home",
  components: {
    PresidentMessage,
    BrandSlider,
    ProductionInfo,
    HeroSection,
    ShippingMap,
  },
  data() {
    return {
      companyValues: [
        {
          title: "Quality",
          description:
            "We believe in achieving the highest quality in everyting we do.",
          iconSrc: "src/assets/img/icon/quality.png",
          productImage: "src/assets/img/blazer.webp",
        },
        {
          title: "Care",
          description:
            "We apply world-class handling standards to everything we do.",
          iconSrc: "src/assets/img/icon/care.png",
          productImage: "src/assets/img/pants.webp",
        },
        {
          title: "Commitment",
          description:
            "We all promise to commit to Trisula, a promise to work hand and fight.",
          iconSrc: "src/assets/img/icon/handshake.png",
          productImage: "src/assets/img/tshirt.webp",
        },
      ],
    };
  },
  setup() {
    const router = useRouter(); // Gunakan composition API untuk router
    return { router };
  },
  mounted() {
    document.title =
      this.router.currentRoute.value.meta?.title || "Home - Trimas SGI";
  },
};
</script>

<style scoped>
@import "../assets/styles/reset.css";
html {
  scroll-behavior: smooth;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

.main-content {
  width: 100%;
  max-width: 1600px;
}

.values-container {
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
  background-color: transparent;
  margin-left: 150px;
  font-family: "MDPrimer", sans-serif;
}

.head-content {
  font-family: "MDPrimer", sans-serif;
  font-weight: 800;
  font-size: 5.1rem;
  text-align: center;
  margin: 2% 0;
  color: black;
}

@media (max-width: 992px) {
  .values-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .head-content {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .values-container {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 0;
  }
}
</style>
