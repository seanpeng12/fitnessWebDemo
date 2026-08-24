<!-- src/components/CtaSection.vue -->
<template>
  <section id="cta" class="py-20 bg-[#FEF2F2] text-center">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 class="text-4xl font-bold text-[#DC2626]" style="font-family: 'Barlow Condensed', sans-serif;">{{ t('fitness.ready') }}</h3>
      <p class="mt-4 text-lg" style="font-family: 'Barlow', sans-serif;">{{ t('fitness.readyCopy') }}</p>
      <a href="#" class="mt-8 inline-block bg-[#16A34A] text-white py-4 px-10 rounded-full text-xl font-semibold hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 cta-glow">{{ t('fitness.trial') }}</a>
    </div>
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
