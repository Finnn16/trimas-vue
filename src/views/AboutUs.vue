<template>
  <div class="parallax-wrapper">
    <div
      class="parallax-bg"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    ></div>
    <div class="parallax-text">
      <h1 class="parallax-title">Trimas Sarana Garment Industry</h1>
      <p class="parallax-subtitle">Create A Better Life For All</p>
    </div>
  </div>
  <div class="about-us-page">
    <!-- Header Section -->
    <header class="about-header">
      <h1 class="page-title">About Us</h1>
      <p class="page-subtitle">
        Discover the story behind Trimas SGI - Sarana Garment Industry and how
        we make a difference in the garment industry.
      </p>
    </header>

    <!-- Brand Story Section -->
    <section class="section brand-story">
      <h2 class="section-title">Brand Story</h2>
      <div class="section-content">
        <p>
          Trimas SGI was founded in 2010 with a vision to revolutionize the
          garment industry. Specializing in golf apparel and hospital uniforms,
          we started as a small family business with a passion for quality and
          innovation. Over the years, we’ve grown into a trusted name,
          delivering premium garments that combine style, functionality, and
          sustainability. Our journey is rooted in a commitment to creating a
          better future for our community and the environment. Today, we
          continue to innovate, ensuring every stitch reflects our dedication to
          excellence and customer satisfaction.
        </p>
      </div>
    </section>

    <!-- How We Operate the Business Section -->
    <section class="section how-we-operate">
      <h2 class="section-title">How We Operate the Business</h2>
      <div class="section-content">
        <p>
          At Trimas SGI, our operations are guided by efficiency, innovation,
          and sustainability. We source the finest materials globally, ensuring
          every piece meets our high standards. Our production process
          integrates modern technology with skilled craftsmanship to create
          garments that last. From design to delivery, we prioritize ethical
          practices, including fair labor conditions and eco-friendly
          manufacturing. We maintain strict quality control at every stage,
          ensuring our golf apparel and hospital uniforms meet both aesthetic
          and functional needs. Our supply chain is optimized to reduce waste,
          reflecting our commitment to a sustainable future.
        </p>
      </div>
    </section>

    <!-- CSR Section -->
    <section class="section csr">
      <h2 class="section-title">Corporate Social Responsibility (CSR)</h2>
      <div class="section-content">
        <p>
          Giving back is at the heart of Trimas SGI. Our CSR initiatives focus
          on supporting local communities and promoting sustainability. We
          partner with organizations to provide vocational training for
          underprivileged youth, helping them build careers in the garment
          industry. Additionally, we’ve implemented programs to reduce waste in
          our production process and support environmental conservation
          projects, such as reforestation efforts. We also contribute to
          healthcare initiatives by donating uniforms to hospitals in need,
          ensuring a positive impact for future generations and reinforcing our
          role as a socially responsible business.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.parallax-wrapper {
  position: relative;
  height: 520px;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 520px;
  background: url("../assets/img/karyawan.webp") no-repeat center/cover;
  z-index: -1;
  will-change: transform;
  transition: transform 0.1s linear;
}

.parallax-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.parallax-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  z-index: 1;
}

.parallax-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.parallax-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.about-us-page {
  padding-top: 0px;
  position: relative;
  padding: 40px 20px;
  text-align: center;
  z-index: 1;
}

.about-header {
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  color: #1e2a44;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

.section {
  max-width: 800px;
  margin: 0 auto 40px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0;
  box-shadow: none;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  min-height: 200px;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 1.8rem;
  color: #1e2a44;
  margin-bottom: 15px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.section-title:hover {
  color: #2a3b5f;
  transform: scale(1.05);
}

.section-content {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
  text-align: left;
}

@media (max-width: 768px) {
  .parallax-title {
    font-size: 2rem;
  }
  .parallax-subtitle {
    font-size: 1rem;
  }
  .parallax-wrapper {
    height: 400px;
  }
  .parallax-bg {
    height: 400px;
  }
}
</style>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "AboutUs",
  setup() {
    const parallaxOffset = ref(0);

    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxOffset.value = scrollY * 0.2;
      requestAnimationFrame(updateParallax);
    };

    onMounted(() => {
      requestAnimationFrame(updateParallax);

      const sections = document.querySelectorAll(".section");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.2 }
      );

      sections.forEach((section) => {
        observer.observe(section);
      });
    });

    onUnmounted(() => {});
    return {
      parallaxOffset,
    };
  },
};
</script>
