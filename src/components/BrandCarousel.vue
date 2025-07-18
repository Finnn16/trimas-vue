<template>
  <div class="brand-section">
    <!-- Header Section with same style as ProductionInfo -->
    <div class="container">
      <div class="section-header">
        <h2>
          {{ $t("brands.title") }}
          <span class="text-accent">{{ $t("brands.partners") }}</span>
        </h2>
        <p class="section-tagline">
          {{ $t("brands.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Logo Carousel -->
    <div class="logos" ref="logosContainer">
      <div class="logos-slide" ref="logosSlide">
        <div class="logo-container" v-for="(logo, index) in logos" :key="index">
          <img :src="logo.src" :alt="logo.alt" />
        </div>
      </div>
      <!-- The clone will be added here programmatically -->
    </div>

    <!-- Brand Description -->
    <div class="container">
      <div class="brand-description">
        <p>{{ $t("brands.description") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// Import logo images
import jackNicklausLogo from "/img/logo/JackNicklaus.png";
import pumaLogo from "/img/logo/puma.png";
import mizunoLogo from "/img/logo/MIZUNO_-2048x1134.png";
import nhgLogo from "/img/logo/NHG.jpg.webp";
import leCoqLogo from "/img/logo/le-coq-sportif.png";
import bridgestoneLogo from "/img/logo/Logo-bridgestone.png";
import srixonLogo from "/img/logo/srixon.svg";
import jobbLogo from "/img/logo/jobb-big.png";
import wacLogo from "/img/logo/WAC.png";

const logos = ref([
  { src: jackNicklausLogo, alt: "Jack Nicklaus" },
  { src: pumaLogo, alt: "Puma" },
  { src: mizunoLogo, alt: "Mizuno" },
  { src: nhgLogo, alt: "NHG" },
  { src: leCoqLogo, alt: "Le Coq Sportif" },
  { src: bridgestoneLogo, alt: "Bridgestone" },
  { src: srixonLogo, alt: "Srixon" },
  { src: jobbLogo, alt: "Jobb" },
  { src: wacLogo, alt: "WAC" },
]);

const logosContainer = ref(null);
const logosSlide = ref(null);

// Implement the infinite loop effect
onMounted(() => {
  nextTick(() => {
    if (logosSlide.value && logosContainer.value) {
      const copy = logosSlide.value.cloneNode(true);
      logosContainer.value.appendChild(copy);
    }
  });
});
</script>

<style scoped>
/* Container and Section Header - Same as ProductionInfo */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-family: "MDPrimer", sans-serif;
  font-size: clamp(2.5rem, 6vw, 6rem);
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 20px;
}

.text-accent {
  color: #092e5e;
}

.section-tagline {
  font-family: "Open Sans", sans-serif;
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Logo Carousel Styles - Original Style */
.logos {
  padding: 60px 0;
  overflow-x: hidden;
  white-space: nowrap;
  position: relative;
}

.logos:before,
.logos:after {
  position: absolute;
  top: 0;
  width: 300px;
  height: 100%;
  content: "";
  z-index: 2;
}

.logos:before {
  left: 0;
  background: linear-gradient(to left, rgba(248, 250, 252, 0), #f8fafc);
}

.logos:after {
  right: 0;
  background: linear-gradient(to right, rgba(248, 250, 252, 0), #f8fafc);
}

.logos:hover .logos-slide {
  animation-duration: 9s;
}

.logos-slide {
  display: inline-block;
  animation: 9s slide infinite linear;
}

.logo-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 80px;
  margin: 0 40px;
  position: relative;
  transition: transform 0.3s ease;
}

.logo-container:hover {
  transform: translateY(-8px);
}

.logo-container img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.logo-container:hover img {
  filter: grayscale(0%);
  opacity: 1;
}

/* Brand Description */
.brand-description {
  text-align: center;
  margin-top: 40px;
}

.brand-description p {
  font-family: "Open Sans", sans-serif;
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Responsive Design */
@media (max-width: 992px) {
  .section-header h2 {
    font-size: 2.8rem;
  }

  .section-tagline {
    font-size: 1.1rem;
  }

  .logo-container {
    width: 110px;
    height: 70px;
    margin: 0 30px;
  }
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 40px;
  }

  .section-header h2 {
    font-size: 2.2rem;
  }

  .section-tagline {
    font-size: 1rem;
  }

  .logo-container {
    width: 100px;
    height: 60px;
    margin: 0 20px;
  }

  .brand-description p {
    font-size: 1rem;
    padding: 0 15px;
  }

  .logos {
    padding: 40px 0;
  }

  .logos:before,
  .logos:after {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.8rem;
  }

  .section-tagline {
    font-size: 0.95rem;
  }

  .logo-container {
    width: 80px;
    height: 50px;
    margin: 0 15px;
  }

  .brand-description p {
    font-size: 0.95rem;
  }
}
</style>
