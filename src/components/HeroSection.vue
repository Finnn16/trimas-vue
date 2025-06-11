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
          to="/about-us"
          class="cta-button primary"
          @click="closeMenu"
          >More Info</router-link
        >
        <button @click="openContactModal" class="cta-button secondary">
          Contact Us
        </button>
      </div>
    </div>

    <!-- Contact Modal -->
    <div
      v-if="showContactModal"
      class="modal-overlay"
      @click="closeContactModal"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Contact Information</h2>
          <button @click="closeContactModal" class="close-button">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="contact-item">
            <div class="contact-info">
              <h3>Address</h3>
              <p>
                Jl. Raya Kopo KM.7 No.82, Sayati, Kec. Margahayu<br />
                Kota Bandung, Jawa Barat 40228
              </p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-info">
              <h3>Phone</h3>
              <p>+62 812 3456 7890</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-info">
              <h3>Email</h3>
              <p>trimas-hc@trisula.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-info">
              <h3>Business Hours</h3>
              <p>
                Monday - Friday: 8:00 AM - 5:00 PM<br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-info">
              <h3>Follow Us</h3>
              <div class="social-links-modal">
                <a
                  href="https://www.instagram.com/trimassgi.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path
                      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    ></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://id.linkedin.com/company/pt-trimas-sarana-garment-industry"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                    ></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
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
    const showContactModal = ref(false);

    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxOffset.value = scrollY * 0.5;
      requestAnimationFrame(updateParallax);
    };

    const openContactModal = () => {
      showContactModal.value = true;
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    };

    const closeContactModal = () => {
      showContactModal.value = false;
      document.body.style.overflow = "auto"; // Restore scrolling
    };

    onMounted(() => {
      requestAnimationFrame(updateParallax);
    });

    onUnmounted(() => {
      document.body.style.overflow = "auto"; // Cleanup
    });

    return {
      parallaxOffset,
      showContactModal,
      openContactModal,
      closeContactModal,
    };
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
  overflow: hidden;
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
  will-change: transform;
  transition: transform 0.1s linear;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  border: none;
  cursor: pointer;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 12px 12px 0 0;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 25px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;
  transition: transform 0.2s;
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-icon {
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 12px;
  margin-right: 15px;
  color: white;
  flex-shrink: 0;
}

.contact-icon svg {
  width: 24px;
  height: 24px;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-info h3 {
  margin: 0 0 8px 0;
  color: #1f2937;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.contact-info p {
  margin: 0;
  color: #4b5563;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

.social-links-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b5563;
  text-decoration: none;
  padding: 8px 12px;
  font-size: 14px;
  transition: all 0.2s;
  border-radius: 6px;
}

.social-link:hover {
  color: #1e40af;
  background-color: #eff6ff;
}

.social-link svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
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

  .modal-content {
    width: 95%;
    margin: 20px;
  }

  .modal-header {
    padding: 15px 20px;
  }

  .modal-header h2 {
    font-size: 20px;
  }

  .modal-body {
    padding: 20px;
  }

  .contact-item {
    padding: 12px;
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 24px;
  }

  p {
    font-size: 14px;
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
  }

  .contact-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
