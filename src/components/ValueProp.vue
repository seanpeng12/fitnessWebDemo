<!-- src/components/ValueProp.vue -->
<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 class="text-4xl font-bold text-[#DC2626]" style="font-family: 'Barlow Condensed', sans-serif;">{{ t('fitness.era') }}</h3>
      <p class="mt-4 text-lg max-w-3xl mx-auto" style="font-family: 'Barlow', sans-serif;">{{ t('fitness.eraCopy') }}</p>
    </div>
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
