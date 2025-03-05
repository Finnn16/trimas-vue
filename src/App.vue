<template>
  <div id="app">
    <NavBar />
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
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import PresidentMessage from './components/PresidentMessage.vue';
import CompanyCard from './components/CardVision.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    PresidentMessage,
    CompanyCard
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
  max-width: 1400px;
  padding-top: 80px; 
}

.values-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
}

.head-content {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 800;
  font-size: 5.5rem;
  text-align: center;
  margin: 2% 0;
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