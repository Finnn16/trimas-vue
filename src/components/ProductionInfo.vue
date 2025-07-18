<template>
  <div class="garment-showcase">
    <!-- Hero Section - Premium Quality -->
    <section class="quality-section">
      <div class="container">
        <div class="section-header">
          <h1>
            {{ $t("production.heroTitle") }}
            <span class="text-accent">{{ $t("production.since1991") }}</span>
          </h1>
          <p class="section-tagline">
            {{ $t("production.heroTagline") }}
          </p>
        </div>

        <div class="quality-content">
          <div class="quality-text">
            <h3>
              {{ $t("production.premium") }}
              <span class="text-accent">{{ $t("production.quality") }}</span>
            </h3>
            <p>
              {{ $t("production.qualityDescription1") }}
            </p>
            <p>
              {{ $t("production.qualityDescription2") }}
            </p>
            <div class="quality-features">
              <div class="feature">
                <span class="material-icons">verified</span>
                <span>{{ $t("production.features.premiumMaterials") }}</span>
              </div>
              <div class="feature">
                <span class="material-icons">verified</span>
                <span>{{ $t("production.features.expertCraftsmanship") }}</span>
              </div>
              <div class="feature">
                <span class="material-icons">verified</span>
                <span>{{ $t("production.features.qualityControl") }}</span>
              </div>
            </div>
          </div>
          <div class="quality-gallery">
            <div class="gallery-item main-product">
              <img
                src="../assets/img/Catalog/blazer-3-detail.jpg"
                alt="Premium Blazer"
              />
              <div class="product-overlay">
                <span>{{ $t("production.premiumCraftsmanship") }}</span>
              </div>
            </div>
            <div class="gallery-small-items">
              <div class="gallery-item">
                <img
                  src="../assets/img/Catalog/blazer-4-detail.jpg"
                  alt="Quality Shirts"
                />
              </div>
              <div class="gallery-item">
                <img
                  src="../assets/img/Catalog/blazer-5-trans.png"
                  alt="Tailored Pants"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Process Section (Enhanced) -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ $t("production.ourProcess.title") }}
            <span class="text-accent">{{
              $t("production.ourProcess.process")
            }}</span>
          </h2>
          <p class="section-tagline">
            {{ $t("production.ourProcess.subtitle") }}
          </p>
        </div>

        <div class="process-showcase">
          <div class="process-indicators-container">
            <div class="process-indicators">
              <div
                v-for="(step, index) in processSteps"
                :key="`indicator-${index}`"
                class="process-indicator"
                :class="{ active: activeStep === index }"
                @click="activeStep = index"
              >
                <div class="indicator-number">{{ index + 1 }}</div>
                <div class="indicator-title">
                  {{ $t(`production.processSteps.${index}.title`) }}
                </div>
              </div>
            </div>
            <div class="indicator-line"></div>
          </div>

          <!-- Process Content -->
          <div class="process-content-container">
            <transition name="fade" mode="out-in">
              <div class="process-content" :key="activeStep">
                <div class="process-image">
                  <img
                    :src="processSteps[activeStep].image"
                    :alt="$t(`production.processSteps.${activeStep}.title`)"
                  />
                </div>
                <div class="process-details">
                  <h3>
                    {{ $t(`production.processSteps.${activeStep}.title`) }}
                  </h3>
                  <p>
                    {{
                      $t(`production.processSteps.${activeStep}.description`)
                    }}
                  </p>
                  <div
                    class="process-tools"
                    v-if="processSteps[activeStep].tools"
                  >
                    <div
                      class="tool-item"
                      v-for="(tool, index) in processSteps[activeStep].tools"
                      :key="index"
                    >
                      <img
                        src="../assets/img/Mesin.webp"
                        alt="Production Tool"
                        class="tool-img"
                      />
                      <span>{{
                        $t(
                          `production.processSteps.${activeStep}.tools.${index}`
                        )
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <div class="process-navigation">
              <button
                class="nav-button prev"
                @click="prevStep"
                :disabled="activeStep === 0"
              >
                <span class="material-icons">arrow_back</span>
              </button>
              <div class="process-step-indicator">
                {{
                  $t("production.stepIndicator", {
                    current: activeStep + 1,
                    total: processSteps.length,
                  })
                }}
              </div>
              <button
                class="nav-button next"
                @click="nextStep"
                :disabled="activeStep === processSteps.length - 1"
              >
                <span class="material-icons">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section - Our Numbers -->
    <section class="stats-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ $t("production.stats.title") }}
            <span class="text-accent">{{
              $t("production.stats.numbers")
            }}</span>
          </h2>
          <p class="section-tagline">
            {{ $t("production.stats.subtitle") }}
          </p>
        </div>

        <div class="stats-grid">
          <div
            class="stat-card"
            v-for="(stat, index) in stats"
            :key="index"
            @mouseenter="activeStat = index"
            @mouseleave="activeStat = null"
            :class="{ active: activeStat === index }"
          >
            <div class="stat-icon">
              <span class="material-icons">{{ stat.icon }}</span>
            </div>
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-title">
              {{ $t(`production.statsData.${index}.title`) }}
            </div>
            <p class="stat-desc">
              {{ $t(`production.statsData.${index}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onUnmounted, onMounted } from "vue";

export default {
  name: "ProductionInfo",
  setup() {
    const activeStat = ref(null);
    const activeStep = ref(0);
    let autoAdvanceInterval = null;
    let isMobile = ref(window.innerWidth <= 768);

    // Company stats dengan tambahan International Buyers
    const stats = ref([
      {
        icon: "inventory_2",
        value: "6",
      },
      {
        icon: "history",
        value: "34",
      },
      {
        icon: "groups",
        value: "1000",
      },
      {
        icon: "inventory",
        value: "10K+",
      },
      {
        icon: "public",
        value: "18+",
      },
    ]);

    // Enhanced process steps
    const processSteps = ref([
      {
        image:
          "https://cdn.propercloth.com/fab_gallery/f95c9e1d2b3c8df6e66b00356faeadc5.jpg",
        tools: [0, 1], // Index untuk i18n tools
      },
      {
        image:
          "https://i0.wp.com/textilelearner.net/wp-content/uploads/2023/11/Pattern-Making.jpg?fit=600%2C400&ssl=1",
        tools: [0, 1],
      },
      {
        image:
          "https://images-cdn.ubuy.com.sa/634fef3d0f9ef1365518f4b7-juki-ddl-8100-economy-straight-stitch.jpg",
        tools: [0, 1],
      },
      {
        image:
          "https://img.freepik.com/premium-photo/garment-factory-quality-control-check-defects_508835-1985.jpg",
        tools: [0, 1],
      },
    ]);

    // Navigation functions for process steps
    const nextStep = () => {
      if (activeStep.value < processSteps.value.length - 1) {
        activeStep.value++;
      }
    };

    const prevStep = () => {
      if (activeStep.value > 0) {
        activeStep.value--;
      }
    };

    // Window resize handler
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      // Auto advance process steps every 10 seconds
      autoAdvanceInterval = setInterval(() => {
        activeStep.value = (activeStep.value + 1) % processSteps.value.length;
      }, 10000);

      // Add resize event listener
      window.addEventListener("resize", handleResize);
    });

    // Clean up interval on component unmount
    onUnmounted(() => {
      clearInterval(autoAdvanceInterval);
      window.removeEventListener("resize", handleResize);
    });

    return {
      stats,
      processSteps,
      activeStat,
      activeStep,
      nextStep,
      prevStep,
      isMobile,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/* Base Styles */
.garment-showcase {
  font-family: "Poppins", sans-serif;
  color: black;
  --primary-color: #092e5e;
  --accent-color: #092e5e;
  --light-gray: #f8f9fa;
  --dark-gray: #343a40;
  --text-color: #2c3e50;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

section {
  padding: 4rem 0;
  position: relative;
}

h1,
h2,
h3 {
  margin: 0;
  line-height: 1.3;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
}

h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 1rem;
}

h3 {
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  font-weight: 600;
  color: var(--primary-color);
}

p {
  line-height: 1.6;
  color: #6c757d;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.text-accent {
  color: var(--accent-color);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h1,
.section-header h2 {
  font-family: "MDPrimer", sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 6rem);
}

.section-tagline {
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 600px;
  margin: 0 auto;
}

/* Quality Section */
.quality-section {
  background-color: white;
}

.quality-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 768px) {
  .quality-content {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

.quality-features {
  margin-top: 1.5rem;
}

.feature {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.feature span:first-child {
  color: var(--accent-color);
  margin-right: 0.5rem;
}

.quality-gallery {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 1rem;
}

.gallery-small-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.main-product {
  height: 250px;
}

@media (min-width: 768px) {
  .main-product {
    height: 350px;
  }
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(74, 107, 175, 0.9);
  color: white;
  padding: 0.75rem;
  text-align: center;
  transform: translateY(100%);
  transition: var(--transition);
}

.gallery-item:hover .product-overlay {
  transform: translateY(0);
}

/* Process Section */
.process-section {
  padding: 4rem 0;
}

@media (min-width: 768px) {
  .process-section {
    padding: 6rem 0;
  }
}

.process-showcase {
  max-width: 900px;
  margin: 0 auto;
}

.process-indicators-container {
  position: relative;
  max-width: 100%;
  margin: 0 auto 2rem;
  padding: 0 15px;
  overflow-x: auto;
}

@media (min-width: 768px) {
  .process-indicators-container {
    max-width: 700px;
    padding: 0 30px;
    margin-bottom: 3rem;
    overflow-x: visible;
  }
}

/* The horizontal line that connects all indicators */
.indicator-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #e9ecef;
  top: 25px;
  left: 0;
  z-index: 1;
  display: none;
}

@media (min-width: 768px) {
  .indicator-line {
    display: block;
  }
}

.process-indicators {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  min-width: 500px;
}

@media (min-width: 768px) {
  .process-indicators {
    min-width: auto;
  }
}

.process-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0 5px;
}

.indicator-number {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 8px;
}

.indicator-title {
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  max-width: 90px;
  color: #6c757d;
  transition: var(--transition);
  display: none;
}

@media (min-width: 480px) {
  .indicator-title {
    display: block;
  }
}

.process-indicator.active .indicator-number {
  background-color: #092e5e;
  color: white;
}

.process-indicator.active .indicator-title {
  color: var(--accent-color);
  font-weight: 600;
}

.process-content-container {
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .process-content-container {
    padding: 2rem;
  }
}

.process-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (min-width: 768px) {
  .process-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }
}

.process-step-indicator {
  font-size: 0.9rem;
  color: #6c757d;
  text-align: center;
  display: block;
}

@media (min-width: 768px) {
  .process-step-indicator {
    display: none;
  }
}

.process-image {
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .process-image {
    height: 300px;
  }
}

.process-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.process-details h3 {
  margin-bottom: 0.75rem;
}

.process-tools {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  gap: 0.75rem;
}

.tool-item {
  display: flex;
  align-items: center;
  background-color: var(--light-gray);
  padding: 0.5rem 0.75rem;
  border-radius: 30px;
  font-size: 0.85rem;
}

.tool-img {
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.process-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.nav-button:hover:not(:disabled) {
  background-color: var(--accent-color);
  color: white;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Fade transition for process content */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Stats Section */
.stats-section {
  background-color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(5, 1fr); /* Tepat 5 kolom untuk layar besar */
  }
}

.stat-card {
  background-color: var(--light-gray);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

@media (min-width: 768px) {
  .stat-card {
    padding: 2rem;
  }
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--accent-color);
  z-index: -1;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.5s ease;
}

.stat-card:hover::before,
.stat-card.active::before {
  transform: scaleY(1);
}

.stat-card:hover,
.stat-card.active {
  transform: translateY(-10px);
}

.stat-card:hover *,
.stat-card.active * {
  color: white;
}

.stat-icon {
  margin-bottom: 1rem;
}

.stat-icon span {
  font-size: 2.25rem;
  color: var(--accent-color);
  transition: var(--transition);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  transition: var(--transition);
}

@media (min-width: 768px) {
  .stat-number {
    font-size: 3rem;
  }
}

.stat-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  transition: var(--transition);
}

@media (min-width: 768px) {
  .stat-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
}

.stat-desc {
  font-size: 0.9rem;
  transition: var(--transition);
}

@media (min-width: 768px) {
  .stat-desc {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  section {
    padding: 2rem 0;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .quality-features {
    margin-top: 1rem;
  }

  .feature {
    margin-bottom: 0.75rem;
  }

  .main-product {
    height: 200px;
  }

  .process-content-container {
    padding: 1rem;
  }

  .process-tools {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-number {
    font-size: 2.25rem;
  }
}
</style>
