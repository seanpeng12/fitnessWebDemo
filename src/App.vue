<template>
  <div class="bg-white text-bb-text font-sans">
    <PageHeader @go-home="resetToHome" />
    <main>
      <!-- Home Page -->
      <div v-if="!selectedProductHandle && !selectedBlogSlug">
        <HeroSection />
        <ShopSection @select-product="handleProductSelect" />
        <BlogSection @select-blog="handleBlogSelect" />
        <InformationSection />
      </div>

      <!-- Product Detail Page -->
      <ProductDetail v-else-if="selectedProductHandle" :handle="selectedProductHandle" @close="resetToHome" />

      <!-- Blog Detail Page -->
      <BlogDetail v-else-if="selectedBlogSlug" :slug="selectedBlogSlug" @close="resetToHome" />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import PageHeader from './components/PageHeader.vue';
import HeroSection from './components/HeroSection.vue';
import ShopSection from './components/ShopSection.vue';
import BlogSection from './components/BlogSection.vue';
import InformationSection from './components/InformationSection.vue';
import PageFooter from './components/PageFooter.vue';
import ProductDetail from './components/ProductDetail.vue';
import BlogDetail from './components/BlogDetail.vue';

const selectedProductHandle = ref(null);
const selectedBlogSlug = ref(null);

const handleProductSelect = async (handle) => {
  resetToHome();
  await nextTick();
  selectedProductHandle.value = handle;
  window.scrollTo(0, 0);
};

const handleBlogSelect = async (slug) => {
  resetToHome();
  await nextTick();
  selectedBlogSlug.value = slug;
  window.scrollTo(0, 0);
};

const resetToHome = () => {
  selectedProductHandle.value = null;
  selectedBlogSlug.value = null;
};
</script>

<style>
/* Since we are using the Play CDN, we'll add the base Tailwind layers here */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add any other global styles here if needed */
html {
  scroll-behavior: smooth;
}
</style>