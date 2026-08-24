<!-- src/components/HeroSection.vue -->
<template>
  <section class="relative bg-[#F7F7F7] overflow-hidden">
    <div class="max-w-screen-2xl mx-auto px-6 lg:px-12 py-24 lg:py-40 flex flex-col lg:flex-row items-center justify-between">
      <!-- Text Content -->
      <div class="lg:w-1/2 z-10 mb-12 lg:mb-0">
        <h1 class="text-4xl md:text-6xl font-light tracking-tight text-bb-text mb-6 leading-tight">
          <!-- Trinity Coffee Roaster <br /> -->
          <span class="font-medium">Trinity Coffee Roaster</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-500 font-light mb-4 max-w-lg leading-relaxed">
          {{ t('hero.tagline') }}
        </p>
        <p class="text-sm md:text-base tracking-[0.3em] uppercase text-bb-blue font-medium mb-6 max-w-lg">
          {{ t('hero.principles') }}
        </p>
        <p class="text-base md:text-lg text-gray-400 font-light mb-12 max-w-lg leading-relaxed">
          {{ t('hero.description') }}
        </p>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <router-link :to="{ path: '/', hash: '#shop' }" class="bb-button bg-bb-blue text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase text-center">
            {{ t('hero.shop') }}
          </router-link>
          <router-link to="/story" class="bb-button border border-bb-text text-bb-text px-10 py-4 text-sm font-semibold tracking-widest uppercase text-center">
            {{ t('hero.learnMore') }}
          </router-link>
        </div>
      </div>

      <!-- Editorial Hero Image -->
      <div class="relative w-full lg:w-1/2 lg:pl-10">
        <div class="absolute -right-5 -top-5 hidden h-full w-[88%] border border-[#D8D0C8] lg:block"></div>
        <figure class="relative mx-auto w-full max-w-2xl bg-[#EFEAE4] p-3 sm:p-4">
          <div class="relative aspect-[5/4] overflow-hidden bg-[#DDD6CF]">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
              :alt="t('hero.imageAlt')"
              class="h-full w-full scale-[1.03] object-cover object-center saturate-[0.62] contrast-[0.92] brightness-[0.96]"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#59483A]/15 via-transparent to-white/10"></div>
          </div>
          <figcaption class="flex items-center justify-between px-1 pb-1 pt-4 text-[9px] font-medium uppercase tracking-[0.28em] text-[#8D8177]">
            <span>{{ t('hero.principles') }}</span>
            <span class="flex items-center gap-3">
              <span class="h-px w-8 bg-[#B8ADA3]"></span>
              2026
            </span>
          </figcaption>
        </figure>
        <div class="absolute -bottom-4 left-2 hidden h-9 w-9 bg-bb-blue/80 lg:block"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
