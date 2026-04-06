<!-- src/App.vue -->
<template>
  <div class="bg-white text-bb-text font-sans">
    <PageHeader />
    <main>
      <!-- Remove transition, render content directly via router-view -->
      <router-view></router-view>
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';
</script>

<style>
/* Since we are using the Play CDN, we'll add the base Tailwind layers here */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global Styles */
html {
  scroll-behavior: smooth;
  background-color: #3A3A3A;
  touch-action: manipulation;
}
body {
  background-color: #ffffff;
  color: #333333;
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
}
a, button {
  touch-action: manipulation;
}

/* Remove previous page transition CSS */
</style>
