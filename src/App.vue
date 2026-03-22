<!-- src/App.vue -->
<template>
  <div class="bg-white text-bb-text font-sans">
    <PageHeader />
    <main>
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

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>
