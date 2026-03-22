<!-- src/components/BlogSection.vue -->
<template>
  <section id="blog" class="py-24 bg-white">
    <div class="max-w-screen-xl mx-auto px-6 lg:px-12">
      <h2 class="text-[10px] font-bold tracking-[0.4em] text-center mb-16 uppercase text-bb-text">BLOG</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <router-link 
          v-for="blog in blogs" 
          :key="blog.slug" 
          :to="`/blogs/${blog.slug}`"
          class="group cursor-pointer"
        >
          <div class="aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
            <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <p class="text-[10px] text-gray-400 tracking-widest mb-2">{{ blog.date }}</p>
          <h3 class="text-xs font-bold leading-relaxed text-bb-text group-hover:text-bb-blue transition-colors uppercase">
            {{ blog.title }}
          </h3>
        </router-link>
      </div>

      <div class="text-center">
        <a href="#" class="inline-block bg-bb-blue text-white px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-opacity-90 transition-all">
          一覧を見る
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const blogs = [
  {
    slug: 'kanda-cafe',
    title: 'BLUE BOTTLE COFFEE KANDA CAFE',
    date: '2026.03.15',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600'
  },
  {
    slug: 'spring-edition',
    title: 'COFFEE ENJOYMENT AT HOME: SPRING EDITION',
    date: '2026.03.10',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600'
  },
  {
    slug: 'brewing-gear',
    title: 'NEW BREWING GEAR: THE PATH TO PERFECTION',
    date: '2026.03.05',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600'
  }
];
</script>
