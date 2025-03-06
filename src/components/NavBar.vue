<template>
  <nav class="navbar" :class="{ 'navbar-open': isOpen }">
    <div class="navbar-container">
      <div class="menu-items" :class="{ active: isOpen }">
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">About Us</a>
        <div class="logo">
          <img src="../assets/img/TrimasTransparan.webp" alt="Logo" />
        </div>
        <a href="#" class="nav-link">Career</a>
        <a href="#" class="nav-link">Contact</a>
      </div>

      <div class="burger" @click="toggleMenu">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
  </nav>
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
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  height: 50px;
}

.menu-items {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.menu-items a {
  padding: 10px;
  font-weight: 600;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: black;
  background-color: rgb(249, 245, 245);
  border-radius: 25%;
}

.burger {
  display: none;
  cursor: pointer;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 5px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 768px) {
  .navbar {
    height: 0px;
  }

  .menu-items {
    position: absolute;
    right: 0;
    top: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    flex-direction: column;
    width: 100%;
    text-align: center;
    transform: translateY(-150%);
    transition: transform 0.5s ease;
    gap: 0;
  }

  .menu-items.active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .nav-link {
    padding: 1rem;
    width: 100%;
    display: block;
  }

  .burger {
    display: block;
    position: absolute;
    top: 40px;
    right: 2rem;
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
</style>
