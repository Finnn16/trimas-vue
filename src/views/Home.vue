<!-- src/views/Home.vue -->
<template>
<main class="main-content">
    <PresidentMessage />
    <h1 class="head-content">Nilai Kami &<span style="color: #092E5E;"> Keunggulan</span></h1>
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
    <h1 class="head-content">Dipercaya Oleh <span style="color: #092E5E;">Merek Terkemuka</span></h1>
    <BrandSlider />
    <ProductionInfo />
</main>
</template>

<script>
import PresidentMessage from '../components/PresidentMessage.vue';
import CompanyCard from '../components/CardVision.vue';
import BrandSlider from '../components/BrandCarousel.vue';
import ProductionInfo from '../components/ProductionInfo.vue';

export default {
name: 'Home',
components: {
    PresidentMessage,
    CompanyCard,
    BrandSlider,
    ProductionInfo,
},
data() {
    return {
    companyValues: [
        {
        title: 'Visi',
        description: 'Menjadi pilihan utama dunia untuk penyedia garmen yang fleksibel dan inovatif',
        iconSrc: 'src/assets/img/icon/darts.png',
        productImage: 'src/assets/img/blazer.webp',
        },
        {
        title: 'Misi',
        description: 'Pertumbuhan laba yang berkelanjutan. Memberikan kepuasan pelanggan melalui produk berkualitas tinggi.',
        iconSrc: 'src/assets/img/icon/target.png',
        productImage: 'src/assets/img/pants.webp',
        },
        {
        title: 'Nilai Inti',
        description: 'Nilai inti kami didorong oleh semangat kualitas, kepedulian, dan komitmen. Kami percaya dalam menciptakan kehidupan yang lebih baik untuk semua melalui dedikasi kami pada keunggulan.',
        iconSrc: 'src/assets/img/icon/evaluation.png',
        productImage: 'src/assets/img/tshirt.webp',
        },
    ],
    };
},
};
</script>

<style scoped>
@import '../assets/styles/reset.css';
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
font-family: 'MDPrimer', sans-serif;
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