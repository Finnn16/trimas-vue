<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view></router-view>
    <LanguageSwitcher />
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import LanguageSwitcher from "./components/LanguageSwitcher.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
    LanguageSwitcher,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
