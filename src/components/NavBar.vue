<template>
  <nav class="navbar" :class="{ 'navbar-open': isOpen }">
    <div class="navbar-container">
      <div class="mobile-header">
        <div class="logo mobile-logo">
          <img src="../assets/img/TrimasTransparan.webp" alt="Logo" />
        </div>
        <div class="burger" @click="toggleMenu">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
      </div>
      
      <div class="menu-items" :class="{ active: isOpen }">
        <a href="#" class="nav-link" @click="closeMenu">Home</a>
        <router-link to="/company-details" class="nav-link" @click="closeMenu">
          About
        </router-link>
        <div class="logo desktop-logo">
          <img src="../assets/img/TrimasTransparan.webp" alt="Logo" />
        </div>
        <a href="#" class="nav-link" @click="closeMenu">Career</a>
        <a href="#" class="nav-link" @click="closeMenu">Contact</a>
      </div>
    </div>
  </nav>
  <!-- Spacer div to prevent content from hiding under fixed navbar -->
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
      
      // Prevent scrolling when menu is open
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  },
  // Clean up when component is destroyed
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: white;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.navbar-spacer {
  height: 70px;
}

.navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  position: relative;
}

.mobile-header {
  display: none;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  height: 45px;
  transition: height 0.3s ease;
}

.menu-items {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
}

.menu-items a {
  padding: 10px;
  font-weight: 600;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: black;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: #333;
  transition: all 0.3s ease;
}

.nav-link:hover::after {
  width: 80%;
  left: 10%;
}

.burger {
  display: none;
  cursor: pointer;
  z-index: 1001;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 5px;
  transition: all 0.3s ease;
}

/* Responsiveness */
@media screen and (max-width: 992px) {
  .navbar-container {
    padding: 0 1.5rem;
  }
  
  .menu-items {
    gap: 1.5rem;
  }
  
  .logo img {
    height: 40px;
  }
  
  .nav-link {
    font-size: 1rem;
  }
}

@media screen and (max-width: 768px) {
  .navbar {
    height: 60px;
  }
  
  .navbar-spacer {
    height: 60px;
  }
  
  .navbar-container {
    padding: 0 1rem;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .mobile-header {
    display: flex;
    height: 60px;
  }
  
  .mobile-logo {
    display: flex;
  }
  
  .desktop-logo {
    display: none;
  }
  
  .menu-items {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 60px);
    text-align: center;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    gap: 0;
    padding: 1.5rem 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }
  
  .menu-items.active {
    transform: translateX(0);
  }
  
  .nav-link {
    padding: 1.2rem;
    width: 100%;
    display: block;
    font-size: 1.1rem;
    border-bottom: 1px solid #f1f1f1;
  }
  
  .nav-link::after {
    display: none;
  }
  
  .nav-link:hover {
    background-color: #f9f5f5;
  }
  
  .burger {
    display: block;
  }
  
  /* Animasi untuk burger menu */
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
  .navbar, .navbar-spacer {
    height: 55px;
  }
  
  .mobile-header {
    height: 55px;
  }
  
  .logo img {
    height: 35px;
  }
  
  .menu-items {
    top: 55px;
    height: calc(100vh - 55px);
    padding: 1rem 0;
  }
  
  .nav-link {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>