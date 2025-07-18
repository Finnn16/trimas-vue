<template>
  <nav class="navbar" :class="{ 'navbar-open': isOpen }">
    <div class="navbar-container">
      <!-- Mobile Header -->
      <div class="mobile-header">
        <div class="logo mobile-logo">
          <router-link to="/" @click="closeMenu">
            <img src="../assets/img/Trimas-Logo.png" alt="Garment Co Logo" />
          </router-link>
        </div>
        <div class="burger" @click="toggleMenu">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
      </div>

      <!-- Desktop Logo -->
      <div class="logo desktop-logo">
        <router-link to="/" @click="closeMenu">
          <img src="../assets/img/Trimas-Logo.png" alt="Garment Co Logo" />
        </router-link>
      </div>

      <div class="menu-items" :class="{ active: isOpen }">
        <router-link
          to="/"
          class="navLink"
          active-class="activeLink"
          @click="closeMenu"
          >Home</router-link
        >
        <router-link
          to="/article-list"
          class="navLink"
          active-class="activeLink"
          @click="closeMenu"
          >Article</router-link
        >
        <router-link
          to="/career-page"
          class="navLink"
          active-class="activeLink"
          @click="closeMenu"
          >Career</router-link
        >
        <router-link
          to="/about-us"
          class="navLink"
          active-class="activeLink"
          @click="closeMenu"
          >About Us</router-link
        >
      </div>

      <!-- Language Selector -->
      <div class="language-selector">
        <button @click="cycleLanguage" class="language-button">
          <component :is="currentFlag" class="flag-icon" />
        </button>
      </div>
    </div>
  </nav>

  <div class="navbar-spacer"></div>
</template>

<script>
import { ref } from "vue";

// Define flag components with detailed SVGs
const IndonesiaFlag = {
  template: `
    <svg class="flag-icon" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="12" fill="#FF0000"/>
      <rect y="12" width="32" height="12" fill="#FFFFFF"/>
    </svg>
  `,
};

const JapanFlag = {
  template: `
    <svg class="flag-icon" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="24" fill="#FFFFFF"/>
      <circle cx="16" cy="12" r="8" fill="#BC002D"/>
    </svg>
  `,
};

const USFlag = {
  template: `
    <svg class="flag-icon" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="24" fill="#FFFFFF"/>
      <rect width="32" height="3.69" fill="#B22234"/>
      <rect y="7.38" width="32" height="3.69" fill="#B22234"/>
      <rect y="14.76" width="32" height="3.69" fill="#B22234"/>
      <rect y="22.15" width="32" height="1.85" fill="#B22234"/>
      <rect width="12.8" height="13.84" fill="#3C3B6E"/>
      <g fill="#FFFFFF">
        <rect x="1.6" y="1.6" width="0.8" height="0.8"/>
        <rect x="4.8" y="1.6" width="0.8" height="0.8"/>
        <rect x="8" y="1.6" width="0.8" height="0.8"/>
        <rect x="1.6" y="4.8" width="0.8" height="0.8"/>
        <rect x="4.8" y="4.8" width="0.8" height="0.8"/>
        <rect x="8" y="4.8" width="0.8" height="0.8"/>
        <rect x="1.6" y="8" width="0.8" height="0.8"/>
        <rect x="4.8" y="8" width="0.8" height="0.8"/>
        <rect x="8" y="8" width="0.8" height="0.8"/>
      </g>
    </svg>
  `,
};

// Language options
const languages = [
  { code: "ID", flag: IndonesiaFlag },
  { code: "JP", flag: JapanFlag },
  { code: "US", flag: USFlag },
];

export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
    };
  },
  setup() {
    // Reactive state for language selector
    const currentIndex = ref(0);
    const currentFlag = ref(languages[0].flag);

    // Function to cycle through languages
    const cycleLanguage = () => {
      currentIndex.value = (currentIndex.value + 1) % languages.length;
      currentFlag.value = languages[currentIndex.value].flag;
    };

    return {
      currentFlag,
      cycleLanguage,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      document.body.style.overflow = this.isOpen ? "hidden" : "";
    },
    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = "";
    },
    handleResize() {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  font-family: "Poppins", sans-serif;
}

.navbar-spacer {
  height: 70px;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
}

.mobile-header {
  display: none;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  padding-top: 10px;
  height: 60px;
  width: auto;
  transition: height 0.3s ease;
}

.menu-items {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navLink {
  color: var(--color-gray-700, #495057);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 800;
  position: relative;
  transition: var(--transition-base, 0.2s ease);
  letter-spacing: 1.2px;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md, 6px);
}

.navLink:hover {
  color: var(--color-primary, #1a4971);
}

.navLink::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 50%;
  background-color: var(--color-primary, #1a4971);
  transition: var(--transition-base, 0.2s ease);
  transform: translateX(-50%);
}

.navLink:hover::after {
  width: 100%;
}

/* Active link styles */
.activeLink {
  color: var(--color-primary, #1a4971) !important;
  font-weight: 900;
}

.activeLink::after {
  width: 100% !important;
}

.burger {
  display: none;
  cursor: pointer;
  z-index: 1001;
}

.burger div {
  width: 24px;
  height: 3px;
  background-color: #2d3748;
  margin: 5px;
  transition: all 0.3s ease;
}

/* Language Selector Styles */
.language-selector {
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  z-index: 1001;
}

.language-button {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  padding: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-button:hover {
  background-color: #f3f4f6;
}

.flag-icon {
  width: 24px;
  height: 18px;
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .navbar {
    height: 60px;
  }

  .navbar-spacer {
    height: 60px;
  }

  .navbar-container {
    padding: 0 1rem;
  }

  .mobile-header {
    display: flex;
    height: 60px;
  }

  .desktop-logo {
    display: none;
  }

  .menu-items {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #ffffff;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    transform: translateX(-100%);
    transition: transform 0.4s ease;
  }

  .menu-items.active {
    transform: translateX(0);
  }

  .navLink {
    font-size: 1.2rem;
    padding: 0.75rem;
    width: 100%;
    text-align: center;
  }

  .navLink:hover {
    background-color: #f7fafc;
    color: #1a4971;
  }

  .activeLink {
    background-color: #e3f2fd;
    color: #1a4971;
  }

  .navLink::after,
  .activeLink::after {
    display: none; /* Hide underline on mobile */
  }

  .burger {
    display: block;
  }

  .navbar-open .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .navbar-open .line2 {
    opacity: 0;
  }

  .navbar-open .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
  }

  .language-selector {
    right: 4rem; /* Adjust to avoid overlapping with burger */
  }
}

@media screen and (max-width: 480px) {
  .navbar,
  .navbar-spacer {
    height: 55px;
  }

  .mobile-header {
    height: 55px;
  }

  .logo img {
    height: 40px;
  }

  .menu-items {
    top: 55px;
    height: calc(100vh - 55px);
  }

  .navLink {
    font-size: 1.1rem;
    padding: 0.5rem;
  }

  .language-selector {
    right: 3.5rem;
  }

  .flag-icon {
    width: 20px;
    height: 15px;
  }
}
</style>
