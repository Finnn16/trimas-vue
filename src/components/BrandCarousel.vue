<!-- BrandSlider.vue (Vue 3 Composition API) -->
<template>
  <div>
    <div class="logos" ref="logosContainer">
      <div class="logos-slide" ref="logosSlide">
        <img
          v-for="(logo, index) in logos"
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
        />
      </div>
      <!-- The clone will be added here programmatically -->
    </div>

    <div class="brand-desk">
      <p>
        Our partnerships with globally recognized brands speak volumes about our
        dedication to quality and reliability. Over the years, leading names
        like Jack Nicklaus, Bridgestone, Mizuno, and Srixon have repeatedly
        chosen us for their projects, a testament to the level of trust and
        satisfaction we consistently deliver. We understand the importance of
        maintaining strong, long-term relationships with our clients, and these
        collaborations reflect our commitment to excellence and innovation.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// Import images
// For Vue 3 with Vite you'd use direct import URLs
const logoPath = "/src/assets/img/logo/";
const logos = ref([
  { src: `${logoPath}JackNicklaus.png`, alt: "Jack Nicklaus" },
  { src: `${logoPath}puma.png`, alt: "Puma" },
  { src: `${logoPath}MIZUNO_-2048x1134.png`, alt: "Mizuno" },
  { src: `${logoPath}NHG.jpg.webp`, alt: "NHG" },
  { src: `${logoPath}le-coq-sportif.png`, alt: "Le Coq Sportif" },
  { src: `${logoPath}Logo-bridgestone.png`, alt: "Bridgestone" },
  { src: `${logoPath}srixon.svg`, alt: "Srixon" },
  { src: `${logoPath}jobb-big.png`, alt: "Jobb" },
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
  background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
}

.logos:after {
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
}

.logos:hover .logos-slide {
  animation-duration: 9s;
}

.logos-slide {
  display: inline-block;
  animation: 9s slide infinite linear;
}

.logos-slide img {
  object-fit: contain;
  height: auto;
  width: 130px;
  margin: 0 40px;
}

.brand-desk {
  font-family: "IBM Plex Serif", serif;
  font-size: 1.3rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@media (max-width: 768px) {
  #brand {
    font-size: 3rem;
  }

  .logos-slide img {
    width: 100px;
    margin: 0 20px;
  }

  .brand-desk {
    font-size: 1.1rem;
  }
}
</style>
