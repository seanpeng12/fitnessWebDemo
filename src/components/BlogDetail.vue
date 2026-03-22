<!-- src/components/BlogDetail.vue -->
<template>
  <article class="bg-white min-h-screen pb-32">
    <!-- Breadcrumbs -->
    <nav class="max-w-screen-md mx-auto px-6 pt-12 mb-16 text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
      <router-link to="/" class="hover:text-bb-blue transition-colors">Home</router-link>
      <span class="mx-3">/</span>
      <router-link to="/#blog" class="hover:text-bb-blue transition-colors">Blog</router-link>
      <span class="mx-3">/</span>
      <span class="text-bb-text">{{ blogData.title }}</span>
    </nav>

    <!-- Hero Image -->
    <div class="max-w-screen-xl mx-auto px-6 lg:px-12 mb-20">
      <div class="aspect-[21/9] overflow-hidden bg-gray-50">
        <img :src="blogData.image" :alt="blogData.title" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Content Area -->
    <div class="max-w-screen-md mx-auto px-6">
      <header class="text-center mb-20">
        <p class="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-4">{{ blogData.date }}</p>
        <h1 class="text-2xl md:text-3xl font-normal tracking-tight text-bb-text mb-8 leading-tight uppercase">
          {{ blogData.title }}
        </h1>
        <div class="w-12 h-[1px] bg-bb-blue mx-auto"></div>
      </header>

      <div class="prose prose-sm max-w-none text-gray-600 font-light leading-loose space-y-8 uppercase tracking-widest text-[11px]">
        <p>
          春の訪れとともに、新しい季節の始まりを感じるこの頃。ブルーボトルコーヒーでは、季節の移ろいを感じていただけるような特別な体験をご用意しています。
        </p>
        <p>
          今回のブログでは、新しくオープンしたカフェのこだわりや、ご自宅でのコーヒータイムをより豊かにするヒント、そして私たちが大切にしているクラフトマンシップについてお届けします。
        </p>
        
        <div class="py-12">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800" class="w-full h-auto mb-4" />
          <p class="text-[9px] text-gray-400 text-center italic tracking-normal">Meticulously roasted beans waiting for the perfect pour.</p>
        </div>

        <p>
          私たちのコーヒーは、産地からカフェまで、関わるすべての人の情熱によって形作られています。一杯のコーヒーが、あなたの日常に小さな変化と喜びをもたらすことを願っています。
        </p>
      </div>

      <!-- Footer Actions -->
      <footer class="mt-32 pt-12 border-t border-gray-100 flex justify-between items-center">
        <router-link to="/#blog" class="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-bb-blue transition-colors">
          ← Back to List
        </router-link>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-bb-blue"><span class="text-[10px] tracking-widest font-bold">SHARE</span></a>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ slug: { type: String, required: true } });

// 模擬 Blog 資料庫
const blogs = {
  'kanda-cafe': {
    title: 'BLUE BOTTLE COFFEE KANDA CAFE',
    date: '2026.03.15',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200'
  },
  'spring-edition': {
    title: 'COFFEE ENJOYMENT AT HOME: SPRING EDITION',
    date: '2026.03.10',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200'
  },
  'brewing-gear': {
    title: 'NEW BREWING GEAR: THE PATH TO PERFECTION',
    date: '2026.03.05',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200'
  }
};

const blogData = computed(() => blogs[props.slug] || blogs['kanda-cafe']);
</script>
