<script setup>
import Navbar from './componentes/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <body>
    <h1>You did it!</h1>
    <p>
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>
  </body>
  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
html,
body,
#app {
  margin: auto;
  position: relatiave;
  background-color: #2B2B2B;
  height: 100vh;
  width: auto;

}

header {
  position: relative;
  box-shadow: #000000 0px 4px 4px 0px;

}
</style>