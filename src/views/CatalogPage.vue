<template>
  <div class="catalog-container">
    <!-- Section 1: Golf Outfit -->
    <section class="catalog-section">
      <div class="parallax-bg golf-bg"></div>
      <div class="content">
        <h2 class="title">Setelan Golf Premium</h2>
        <p class="description">
          Dirancang untuk kenyamanan dan gaya di lapangan golf. Bahan
          berkualitas tinggi dengan teknologi breathable.
        </p>
        <button class="cta-button">Pesan Sekarang</button>
      </div>
    </section>

    <!-- Section 2: Hospital Uniform -->
    <section class="catalog-section">
      <div class="parallax-bg hospital-bg"></div>
      <div class="content">
        <h2 class="title">Seragam Rumah Sakit</h2>
        <p class="description">
          Seragam tahan lama, fungsional, dan nyaman untuk tenaga medis.
          Tersedia dalam berbagai ukuran dan warna.
        </p>
        <button class="cta-button">Hubungi Kami</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CatalogPage",
  mounted() {
    // Parallax effect
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const sections = document.querySelectorAll(".catalog-section");
      sections.forEach((section) => {
        const bg = section.querySelector(".parallax-bg");
        const rect = section.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        // Adjust background position for parallax effect
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = scrollPosition * 0.3; // Parallax speed
          bg.style.transform = `translateY(${offset}px)`;
        }
      });
    },
  },
};
</script>

<style scoped>
.catalog-container {
  overflow-x: hidden trop;
}

.catalog-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: transform 0.1s ease-out;
}

.golf-bg {
  background-image: url("https://via.placeholder.com/1920x1080?text=Golf+Outfit");
}

.hospital-bg {
  background-image: url("https://via.placeholder.com/1920x1080?text=Hospital+Uniform");
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-in;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-in 0.3s;
  animation-fill-mode: both;
}

.cta-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #1e90ff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  animation: fadeIn 1s ease-in 0.6s;
  animation-fill-mode: both;
}

.cta-button:hover {
  background-color: #1c86ee;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  .description {
    font-size: 1rem;
  }
  .content {
    padding: 1rem;
  }
}
</style>
