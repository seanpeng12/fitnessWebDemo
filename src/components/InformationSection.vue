<!-- src/components/InformationSection.vue -->
<template>
  <section class="py-24 bg-white border-t border-[#E8E3DE]">
    <div class="max-w-screen-xl mx-auto px-6 lg:px-12">
      <h2 class="text-[10px] font-bold tracking-[0.4em] text-center mb-16 uppercase text-bb-text">{{ t('information.title') }}</h2>
      
      <div class="max-w-3xl mx-auto space-y-6 mb-16">
        <div v-for="info in infoList" :key="info.title" class="flex items-center py-4 border-b border-[#E8E3DE] cursor-pointer group">
          <span class="text-[10px] text-gray-400 tracking-widest min-w-[100px]">{{ info.date }}</span>
          <span class="bg-bb-blue text-white text-[8px] font-bold tracking-widest px-3 py-1 mr-6 uppercase">{{ info.tag }}</span>
          <span class="text-[11px] text-bb-text tracking-widest font-medium uppercase group-hover:text-bb-blue transition-colors truncate">
            {{ info.title }}
          </span>
        </div>
      </div>

      <div class="text-center">
        <a href="#" class="inline-block bg-bb-blue text-white px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-opacity-90 transition-all">
          {{ t('common.viewAll') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const infoList = computed(() => [
  { date: '2026.03.18', tag: t('information.items.newBlend.tag'), title: t('information.items.newBlend.title') },
  { date: '2026.03.12', tag: t('information.items.cafe.tag'), title: t('information.items.cafe.title') },
  { date: '2026.03.01', tag: t('information.items.workshop.tag'), title: t('information.items.workshop.title') }
]);
</script>
