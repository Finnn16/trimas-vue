<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main class="main-content">
      <PresidentMessage />
      <h1 class="head-content">Our Value & Excellence</h1>
      <div class="values-container">
        <CompanyCard v-for="(item, index) in companyValues"
        :key="index"
        :title="item.title"
        :description="item.description"
        :iconSrc="item.iconSrc"
        :productImage="item.productImage"/>
      </div>
      <h1 class="head-content">Trusted By Leading Brands</h1>
      <BrandSlider />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import PresidentMessage from './components/PresidentMessage.vue';
import CompanyCard from './components/CardVision.vue';
import BrandSlider from './components/BrandCarousel.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    PresidentMessage,
    CompanyCard,
    BrandSlider
  },
  data() {
    return {
      companyValues: [
        {
          title: 'Vision',
          description: 'To Be the World\'s Top Choice for a Flexible and Innovative Garment Provider',
          iconSrc: 'src/assets/img/icon/darts.png',
          productImage: 'src/assets/img/blazer.webp'
        },
        {
          title: 'Mission',
          description: 'Sustainable profit growth. Providing customer satisfaction through high-quality products.',
          iconSrc: 'src/assets/img/icon/target.png',
          productImage: 'src/assets/img/pants.webp'
        },
        {
          title: 'Core Value',
          description: 'Our core values are driven by a spirit of quality, care, and commitment. We believe in creating a better life for all through our dedication to excellence.',
          iconSrc: 'src/assets/img/icon/evaluation.png',
          productImage: 'src/assets/img/tshirt.webp'
        }
      ]
    }
  }
}
</script>

<style scoped>
@import './assets/styles/main.css';
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
  padding-top: 80px; 
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
  font-family: MDPrimer;
  font-weight: 800;
  font-size: 6.6rem;
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