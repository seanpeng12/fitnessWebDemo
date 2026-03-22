<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <HeroSection />
    <ShopSection />
    <BlogSection />
    <InformationSection />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue';
import ShopSection from '../components/ShopSection.vue';
import BlogSection from '../components/BlogSection.vue';
import InformationSection from '../components/InformationSection.vue';
</script>
