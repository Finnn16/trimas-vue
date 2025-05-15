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
        <router-link to="/" class="nav-link" @click="closeMenu"
          >Home</router-link
        >
        <router-link to="/company-article" class="nav-link" @click="closeMenu"
          >Article</router-link
        >
        <router-link to="/career-page" class="nav-link" @click="closeMenu"
          >Career</router-link
        >
        <router-link to="/about-us" class="nav-link" @click="closeMenu"
          >About Us</router-link
        >
      </div>
    </div>
  </nav>

  <div class="navbar-spacer"></div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
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

.nav-link {
  color: #2d3748;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1a4971;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 50%;
  background-color: #1a4971;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
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

  .nav-link {
    font-size: 1.2rem;
    padding: 0.75rem;
    width: 100%;
    text-align: center;
  }

  .nav-link::after {
    display: none;
  }

  .nav-link:hover {
    background-color: #f7fafc;
    color: #1a4971;
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

  .nav-link {
    font-size: 1.1rem;
    padding: 0.5rem;
  }
}
</style>
