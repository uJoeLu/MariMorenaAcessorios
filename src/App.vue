<script setup>
import Navbar from './componentes/Navbar.vue';
import Footer from './componentes/Footer.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="main-content">
    <router-view />
  </main>
  <footer>
    <Footer />
  </footer>
</template>





<style scoped>

header {
  margin-bottom: 0px;
  position: relative;
  box-shadow: #000000 0px 4px 4px 0px;

}  

.main-content {
  background-color: #2B2B2B;
  display: flex;
  margin: 0;
  padding: 0; 
  min-height: 100%;
}

footer {
  position: relative;
  bottom: 0;
  left: 0;
  margin: 0px;
  width: 100%;
}
</style>