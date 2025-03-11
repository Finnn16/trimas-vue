<template>
  <div class="garment-showcase">
    <!-- Hero Section - Premium Quality -->
    <section class="quality-section">
      <div class="container">
        <div class="section-header">
          <h1>We Serve <span class="text-accent">Since 1991</span></h1>
          <p class="section-tagline">
            Premium garment manufacturing with decades of expertise
          </p>
        </div>

        <div class="quality-content">
          <div class="quality-text">
            <h3>Premium <span class="text-accent">Quality</span></h3>
            <p>
                We are dedicated to creating garments of the highest quality,
                paying meticulous attention to every detail. Our commitment to
                excellence ensures that each product we manufacture meets the
                highest standards of craftsmanship and durability.
            </p>
            <p>
                From the selection of premium materials to the precision of our
                stitching, we strive to deliver garments that not only look great
                but also stand the test of time.
            </p>
            <div class="quality-features">
              <div class="feature">
                <span class="material-icons">verified</span>
                <span>Premium Materials</span>
              </div>
              <div class="feature">
                <span class="material-icons">verified</span>
                <span>Expert Craftsmanship</span>
              </div>
              <div class="feature">
                <span class="material-icons">verified</span>
                <span>Rigorous Quality Control</span>
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
                <span>Premium Craftsmanship</span>
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
          <h2>Our <span class="text-accent">Process</span></h2>
          <p class="section-tagline">
            How we create premium garments from start to finish
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
                    :alt="processSteps[activeStep].title"
                  />
                </div>
                <div class="process-details">
                  <h3>{{ processSteps[activeStep].title }}</h3>
                  <p>{{ processSteps[activeStep].description }}</p>
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
                      <span>{{ tool }}</span>
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
          <h2>Our <span class="text-accent">Numbers</span></h2>
          <p class="section-tagline">
            Metrics that reflect our commitment to excellence
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
            <div class="stat-title">{{ stat.title }}</div>
            <p class="stat-desc">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";

export default {
  name: "ProductionInfo",
  setup() {
    const activeStat = ref(null);
    const activeStep = ref(0);

    // Company stats
    const stats = ref([
      {
        icon: "inventory_2",
        value: "6",
        title: "Production Lines",
        description:
          "We operate 6 advanced sewing lines, ensuring high-quality garments with every stitch.",
      },
      {
        icon: "history",
        value: "33",
        title: "Years Experience",
        description:
          "Established in 1991, our company has amassed decades of experience in the garment industry.",
      },
      {
        icon: "groups",
        value: "1000",
        title: "Skilled Employees",
        description:
          "Our skilled employees ensure the quality of our garments, maintaining high standards.",
      },
      {
        icon: "inventory",
        value: "10K+",
        title: "Products Monthly",
        description:
          "We produce thousands of high-quality garments each month with precision and care.",
      },
    ]);

    // Enhanced process steps
    const processSteps = ref([
      {
        title: "Material Selection",
        description:
          "We source only the finest fabrics and materials for our garments. Each material is carefully evaluated for quality, durability, and comfort before being approved for production.",
        image: "https://cdn.propercloth.com/fab_gallery/f95c9e1d2b3c8df6e66b00356faeadc5.jpg",
        tools: ["Material Testing Kit", "Quality Inspection Tools"],
      },
      {
        title: "Pattern Making",
        description:
          "Our expert pattern makers create precise templates for each garment. These patterns are the foundation of our clothing, ensuring perfect fit and style for every piece we produce.",
        image: "https://i0.wp.com/textilelearner.net/wp-content/uploads/2023/11/Pattern-Making.jpg?fit=600%2C400&ssl=1",
        tools: ["CAD Software", "Precision Cutting Tools"],
      },
      {
        title: "Cutting & Stitching",
        description:
          "Using Juki machines, we cut and stitch each piece with precision. Our skilled operators follow strict quality guidelines to ensure every seam is perfect and every detail is carefully executed.",
        image: "https://images-cdn.ubuy.com.sa/634fef3d0f9ef1365518f4b7-juki-ddl-8100-economy-straight-stitch.jpg",
        tools: ["Juki Sewing Machines", "Precision Cutters"],
      },
      {
        title: "Quality Control",
        description:
          "Every garment undergoes rigorous quality checks before leaving our facility. Our QC team inspects each piece for stitching quality, measurements, and overall finish to ensure only the best reaches our customers.",
        image: "https://img.freepik.com/premium-photo/garment-factory-quality-control-check-defects_508835-1985.jpg",
        tools: ["Quality Inspection Forms", "Measurement Tools"],
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

    // Auto advance process steps every 10 seconds
    const autoAdvanceInterval = setInterval(() => {
      activeStep.value = (activeStep.value + 1) % processSteps.value.length;
    }, 10000);

    // Clean up interval on component unmount
    onUnmounted(() => {
      clearInterval(autoAdvanceInterval);
    });

    return {
      stats,
      processSteps,
      activeStat,
      activeStep,
      nextStep,
      prevStep,
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

section {
  padding: 5rem 0;
  position: relative;
}

h1,
h2,
h3 {
  margin: 0;
  line-height: 1.3;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
}

h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--primary-color);
}

p {
  line-height: 1.6;
  color: #6c757d;
}

.text-accent {
  color: var(--accent-color);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h1,h2 {
  font-family: 'MDPrimer', sans-serif;
  font-weight: 800;
  font-size: 6rem;
}

.section-tagline {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Quality Section */
.quality-section {
  background-color: white;
}

.quality-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.quality-features {
  margin-top: 2rem;
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
  height: 350px;
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
  padding: 1rem;
  text-align: center;
  transform: translateY(100%);
  transition: var(--transition);
}

.gallery-item:hover .product-overlay {
  transform: translateY(0);
}

/* Process Section */
.process-section {
  background-color: var(--light-gray);
  padding: 6rem 0;
}

.process-showcase {
  max-width: 900px;
  margin: 0 auto;
}

.process-indicators-container {
  position: relative;
  max-width: 700px;
  margin: 0 auto 3rem;
  padding: 0 30px;
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
}

.process-indicators {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.process-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.indicator-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.process-indicator.active .indicator-number {
  background-color: #092e5e;
  color: white;
}
.process-content-container {
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 2rem;
}

.process-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.process-image {
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
}

.process-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.process-details h3 {
  margin-bottom: 1rem;
}

.process-tools {
  display: flex;
  margin-top: 1.5rem;
  gap: 1rem;
}

.tool-item {
  display: flex;
  align-items: center;
  background-color: var(--light-gray);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
}

.tool-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.process-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.nav-button {
  width: 45px;
  height: 45px;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background-color: var(--light-gray);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  z-index: 1;
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
  font-size: 2.5rem;
  color: var(--accent-color);
  transition: var(--transition);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  transition: var(--transition);
}

.stat-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: var(--transition);
}

.stat-desc {
  transition: var(--transition);
}

.vertical-text {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 700;
  color: #e9ecef;
  text-align: center;
  line-height: 1.5;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  h1 {
    font-size: 2.8rem;
  }

  h2 {
    font-size: 2rem;
  }

  .quality-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .vertical-text {
    display: none;
  }
}

@media (max-width: 768px) {
  section {
    padding: 3rem 0;
  }

  .process-content {
    grid-template-columns: 1fr;
  }

  .indicator-line {
    width: 50px;
  }

  .process-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2.2rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  .process-indicators {
    overflow-x: auto;
    padding-bottom: 1rem;
    justify-content: flex-start;
  }

  .indicator-number {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .indicator-line {
    width: 30px;
  }

  .process-tools {
    flex-direction: column;
  }

  .stats-grid {
    gap: 1rem;
  }
}
</style>
