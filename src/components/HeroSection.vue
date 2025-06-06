<template>
  <section class="hero-section">
    <div
      class="parallax-bg"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    ></div>
    <div class="overlay"></div>
    <div class="content">
      <h1>
        Crafting Excellence in Every Stitch: Your Premium Garment Solutions
        Partner
      </h1>
      <p>
        We specialize in crafting premium garments with meticulous attention to
        detail, delivering excellence in every product we create. With years of
        experience and unwavering dedication, we're committed to meeting your
        garment needs with unparalleled quality and service.
      </p>
      <div class="cta-buttons">
        <router-link
          to="/catalog-page"
          class="cta-button primary"
          @click="closeMenu"
          >More Info..</router-link
        >
        <a href="/contact" class="cta-button secondary">Contact Us</a>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "HeroSection",
  setup() {
    const parallaxOffset = ref(0);

    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxOffset.value = scrollY * 0.5; // Faktor 0.5 untuk efek parallax (bisa disesuaikan)
      requestAnimationFrame(updateParallax);
    };

    onMounted(() => {
      requestAnimationFrame(updateParallax);
    });

    onUnmounted(() => {
      // Cleanup jika perlu
    });

    return { parallaxOffset };
  },
};
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden; /* Mencegah gambar meluber */
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/karyawan.webp");
  background-size: cover;
  background-position: center;
  z-index: 0;
  will-change: transform; /* Optimasi performa */
  transition: transform 0.1s linear; /* Transisi halus */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Overlay gelap untuk kontras teks */
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 20px;
}

h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

p {
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.cta-button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s;
}

.cta-button.primary {
  background-color: #1e40af;
  color: white;
}

.cta-button.primary:hover {
  background-color: #1e3a8a;
  transform: translateY(-2px);
}

.cta-button.secondary {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

.cta-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-section {
    height: 80vh;
  }

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 16px;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .cta-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 24px;
  }

  p {
    font-size: 14px;
  }
}
</style>
