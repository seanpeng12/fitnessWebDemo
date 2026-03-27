<!-- src/components/InformationSection.vue -->
<template>
  <section class="py-24 bg-white border-t border-gray-100">
    <div class="max-w-screen-xl mx-auto px-6 lg:px-12">
      <h2 class="text-[10px] font-bold tracking-[0.4em] text-center mb-16 uppercase text-bb-text">INFORMATION</h2>
      
      <div class="max-w-3xl mx-auto space-y-6 mb-16">
        <div v-for="info in infoList" :key="info.title" class="flex items-center py-4 border-b border-gray-100 cursor-pointer group">
          <span class="text-[10px] text-gray-400 tracking-widest min-w-[100px]">{{ info.date }}</span>
          <span class="bg-bb-blue text-white text-[8px] font-bold tracking-widest px-3 py-1 mr-6 uppercase">{{ info.tag }}</span>
          <span class="text-[11px] text-bb-text tracking-widest font-medium uppercase group-hover:text-bb-blue transition-colors truncate">
            {{ info.title }}
          </span>
        </div>
      </div>

      <div class="text-center">
        <a href="#" class="inline-block bg-bb-blue text-white px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-opacity-90 transition-all">
          VIEW ALL
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const infoList = [
  { date: '2026.03.18', tag: 'News', title: 'New Signature Blends Now Available Online' },
  { date: '2026.03.12', tag: 'Cafe', title: 'Grand Opening: Blue Bottle Coffee Shibuya Cafe' },
  { date: '2026.03.01', tag: 'Event', title: 'Coffee Tasting Workshop Series 2026' }
];
</script>
