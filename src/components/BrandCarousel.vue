<template>
  <div>
    <div class="logos" ref="logosContainer">
      <div class="logos-slide" ref="logosSlide">
        <div class="logo-container" v-for="(logo, index) in logos" :key="index">
          <img :src="logo.src" :alt="logo.alt" />
        </div>
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
  transform: translateY(-5px);
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

.brand-desk {
  font-family: "IBM Plex Serif", serif;
  font-size: 1rem;
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

  .logo-container {
    width: 100px;
    height: 60px;
    margin: 0 20px;
  }

  .brand-desk {
    font-size: 1.1rem;
  }
}
</style>
