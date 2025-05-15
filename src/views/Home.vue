<!-- src/views/Home.vue -->
<template>
  <main class="main-content">
    <HeroSection />
    <h1 class="head-content">
      Our Values &<span style="color: #092e5e"> Excellence</span>
    </h1>
    <div class="values-container">
      <CompanyCard
        v-for="(item, index) in companyValues"
        :key="index"
        :title="item.title"
        :description="item.description"
        :iconSrc="item.iconSrc"
        :productImage="item.productImage"
      />
    </div>
    <br /><br />
    <ProductionInfo />
    <h1 class="head-content">
      Shipping<span style="color: #092e5e"> Brands</span>
    </h1>
    <ShippingMap />
    <h1 class="head-content">
      Trusted By <span style="color: #092e5e">Leading Brands</span>
    </h1>
    <BrandSlider />
  </main>
</template>

<script>
import PresidentMessage from "../components/PresidentMessage.vue";
import CompanyCard from "../components/CardVision.vue";
import BrandSlider from "../components/BrandCarousel.vue";
import ProductionInfo from "../components/ProductionInfo.vue";
import HeroSection from "../components/HeroSection.vue";
import { useRouter } from "vue-router"; // Impor useRouter
import ShippingMap from "@/components/ShippingMap.vue";

export default {
  name: "Home",
  components: {
    PresidentMessage,
    CompanyCard,
    BrandSlider,
    ProductionInfo,
    HeroSection,
    ShippingMap,
  },
  data() {
    return {
      companyValues: [
        {
          title: "Vision",
          description:
            "To become the world's premier choice for flexible and innovative garment solutions",
          iconSrc: "src/assets/img/icon/darts.png",
          productImage: "src/assets/img/blazer.webp",
        },
        {
          title: "Mission",
          description:
            "Sustainable profit growth. Delivering customer satisfaction through high-quality products.",
          iconSrc: "src/assets/img/icon/target.png",
          productImage: "src/assets/img/pants.webp",
        },
        {
          title: "Core Values",
          description:
            "Our core values are driven by a spirit of quality, care, and commitment. We believe in creating better lives for all through our dedication to excellence.",
          iconSrc: "src/assets/img/icon/evaluation.png",
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
}

.head-content {
  font-family: "MDPrimer", sans-serif;
  font-weight: 800;
  font-size: 5.5rem;
  text-align: center;
  margin: 5% 0;
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
