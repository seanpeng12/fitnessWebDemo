<!-- src/components/BlogDetail.vue -->
<template>
  <article class="bg-white min-h-screen pb-32">
    <!-- Breadcrumbs -->
    <nav class="max-w-screen-md mx-auto px-6 pt-12 mb-16 text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
      <router-link to="/" class="hover:text-bb-blue transition-colors">{{ t('blog.home') }}</router-link>
      <span class="mx-3">/</span>
      <router-link to="/#blog" class="hover:text-bb-blue transition-colors">{{ t('blog.breadcrumb') }}</router-link>
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
          {{ t('blog.paragraph1') }}
        </p>
        <p>
          {{ t('blog.paragraph2') }}
        </p>
        
        <div class="py-12">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800" class="w-full h-auto mb-4" />
          <p class="text-[9px] text-gray-400 text-center italic tracking-normal">{{ t('blog.caption') }}</p>
        </div>

        <p>
          {{ t('blog.paragraph3') }}
        </p>
      </div>

      <!-- Footer Actions -->
      <footer class="mt-32 pt-12 border-t border-[#E8E3DE] flex justify-between items-center">
        <router-link to="/#blog" class="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-bb-blue transition-colors">
          {{ t('blog.back') }}
        </router-link>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-bb-blue"><span class="text-[10px] tracking-widest font-bold">{{ t('blog.share') }}</span></a>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({ slug: { type: String, required: true } });
const { t } = useI18n();

// Mock Blog Database
const blogs = {
  'kanda-cafe': {
    titleKey: 'blog.posts.kanda',
    date: '2026.03.15',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200'
  },
  'spring-edition': {
    titleKey: 'blog.posts.spring',
    date: '2026.03.10',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200'
  },
  'brewing-gear': {
    titleKey: 'blog.posts.gear',
    date: '2026.03.05',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200'
  }
};

const blogData = computed(() => {
  const post = blogs[props.slug] || blogs['kanda-cafe'];
  return { ...post, title: t(post.titleKey) };
});
</script>
