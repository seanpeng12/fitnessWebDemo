<template>
  <div class="bg-[#FEF2F2] text-[#1F2937]">
    <PageHeader />
    <main>
      <HeroSection />
      <ValueProp />
      <FeaturesSection />
      <ShopSection />
      <CtaSection />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue';
import HeroSection from './components/HeroSection.vue';
import ValueProp from './components/ValueProp.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import ShopSection from './components/ShopSection.vue';
import CtaSection from './components/CtaSection.vue';
import PageFooter from './components/PageFooter.vue';
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