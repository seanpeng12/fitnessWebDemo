<!-- src/components/HeroSection.vue -->
<template>
  <section class="relative overflow-hidden bg-[#F7F7F7]">
    <div class="editorial-lines pointer-events-none absolute inset-0" aria-hidden="true"></div>
    <div class="pointer-events-none absolute left-[8%] top-0 hidden h-full w-px bg-[#BEB4AA]/25 lg:block" aria-hidden="true"></div>
    <div class="pointer-events-none absolute right-[7%] top-[18%] hidden h-px w-[36%] bg-[#BEB4AA]/35 lg:block" aria-hidden="true"></div>
    <div class="relative max-w-screen-2xl mx-auto px-6 lg:px-12 py-24 lg:py-40 flex flex-col lg:flex-row items-center justify-between">
      <!-- Text Content -->
      <div class="z-10 mb-12 lg:mb-0 lg:w-1/2">
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
      <div class="mobile-image-layout relative w-full lg:w-1/2 lg:pl-10">
        <div class="editorial-outline absolute -right-5 -top-5 hidden h-full w-[88%] border border-[#D8D0C8] lg:block"></div>
        <figure class="editorial-frame relative mx-auto w-full max-w-2xl bg-[#EFEAE4] p-3 sm:p-4">
          <div class="editorial-photo relative aspect-[5/4] overflow-hidden bg-[#DDD6CF]">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
              :alt="t('hero.imageAlt')"
              class="h-full w-full scale-[1.03] object-cover object-center saturate-[0.62] contrast-[0.92] brightness-[0.96]"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#59483A]/15 via-transparent to-white/10"></div>
          </div>
          <figcaption class="hidden items-center justify-between px-1 pb-1 pt-4 text-[9px] font-medium uppercase tracking-[0.28em] text-[#8D8177] lg:flex">
            <span>{{ t('hero.principles') }}</span>
            <span class="flex items-center gap-3">
              <span class="h-px w-8 bg-[#B8ADA3]"></span>
              2026
            </span>
          </figcaption>
        </figure>
        <div class="mt-4 flex items-center justify-end gap-3 pr-1 text-[8px] font-medium uppercase tracking-[0.26em] text-[#8D8177] lg:hidden">
          <span class="h-px w-10 bg-[#AFA399]"></span>
          <span>{{ t('hero.principles') }}</span>
        </div>
        <div class="absolute -bottom-4 left-2 hidden h-9 w-9 bg-bb-blue/80 lg:block"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.editorial-lines {
  background-image:
    repeating-linear-gradient(90deg, rgba(126, 111, 98, 0.055) 0, rgba(126, 111, 98, 0.055) 1px, transparent 1px, transparent 96px),
    repeating-linear-gradient(0deg, rgba(126, 111, 98, 0.04) 0, rgba(126, 111, 98, 0.04) 1px, transparent 1px, transparent 96px);
  -webkit-mask-image: linear-gradient(to right, transparent, black 16%, black 84%, transparent);
  mask-image: linear-gradient(to right, transparent, black 16%, black 84%, transparent);
}

.editorial-outline {
  transform: rotate(1.15deg);
  transform-origin: center;
}

.editorial-frame {
  clip-path: polygon(1.2% 0, 98.7% 1.8%, 100% 95.5%, 96.8% 100%, 2% 98.2%, 0 4%);
}

.editorial-photo {
  clip-path: polygon(0.8% 0, 100% 1.2%, 98.8% 100%, 0 98%);
}

@media (max-width: 1023px) {
  .mobile-image-layout {
    align-self: flex-start;
    width: calc(100% + 1.5rem);
    margin-left: -1.5rem;
  }

  .editorial-frame {
    background: transparent;
    clip-path: none;
    padding: 0;
  }

  .editorial-photo {
    clip-path: none;
  }

  .editorial-lines {
    background-image: repeating-linear-gradient(90deg, rgba(126, 111, 98, 0.045) 0, rgba(126, 111, 98, 0.045) 1px, transparent 1px, transparent 72px);
  }
}
</style>
