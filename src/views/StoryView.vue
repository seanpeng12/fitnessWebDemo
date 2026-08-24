<template>
  <article class="overflow-hidden bg-[#F7F5F2] text-bb-text">
    <section class="mx-auto grid max-w-screen-2xl lg:min-h-[720px] lg:grid-cols-[0.92fr_1.08fr]">
      <div class="flex items-center px-6 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
        <div class="max-w-xl">
          <p class="mb-7 text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">{{ t('story.eyebrow') }}</p>
          <h1 class="whitespace-pre-line text-4xl font-light leading-[1.25] tracking-[0.04em] sm:text-6xl">
            {{ t('story.title') }}
          </h1>
          <p class="mt-9 border-l border-bb-blue pl-6 text-sm font-light leading-8 text-gray-600 sm:text-base">
            {{ t('story.lead') }}
          </p>
        </div>
      </div>

      <figure class="relative min-h-[520px] lg:min-h-full">
        <img
          src="/images/story/roastery-machine.jpg"
          :alt="t('story.imageAlt.machine')"
          class="absolute inset-0 h-full w-full object-cover grayscale"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </figure>
    </section>

    <section class="bg-white px-6 py-24 sm:py-32 lg:px-12">
      <div class="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <div>
          <p class="text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">TRINITY COFFEE ROASTER</p>
          <p class="mt-5 text-5xl font-light text-[#D7CEC6]">2026</p>
        </div>
        <div class="space-y-7 text-sm font-light leading-8 text-gray-600 sm:text-base sm:leading-9">
          <p v-for="paragraph in tm('story.paragraphs')" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <section class="px-6 py-24 sm:py-32 lg:px-12">
      <div class="mx-auto max-w-6xl">
        <div class="grid items-end gap-12 lg:grid-cols-2 lg:gap-20">
          <div class="order-2 lg:order-1">
            <p class="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">{{ t('story.craftEyebrow') }}</p>
            <h2 class="text-3xl font-light leading-snug tracking-wide sm:text-4xl">{{ t('story.craftTitle') }}</h2>
            <p class="mt-7 max-w-lg text-sm font-light leading-8 text-gray-600 sm:text-base">{{ t('story.craftCopy') }}</p>
          </div>
          <figure class="order-1 aspect-[3/2] overflow-hidden lg:order-2">
            <img src="/images/story/roasting-beans.jpg" :alt="t('story.imageAlt.beans')" class="h-full w-full object-cover">
          </figure>
        </div>

        <div class="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-20">
          <figure class="aspect-[4/5] overflow-hidden">
            <img src="/images/story/small-batch-roast.jpg" :alt="t('story.imageAlt.batch')" class="h-full w-full object-cover">
          </figure>
          <div class="divide-y divide-[#DCD5CE] border-y border-[#DCD5CE]">
            <div v-for="value in tm('story.values')" :key="value.number" class="grid grid-cols-[3rem_1fr] gap-4 py-8 sm:grid-cols-[4rem_1fr]">
              <span class="text-[10px] font-bold tracking-[0.2em] text-bb-blue">{{ value.number }}</span>
              <div>
                <h3 class="text-base font-medium tracking-[0.16em]">{{ value.title }}</h3>
                <p class="mt-3 text-sm font-light leading-7 text-gray-500">{{ value.copy }}</p>
              </div>
            </div>
          </div>
        </div>

        <p class="mt-10 text-right text-[9px] font-light tracking-wider text-gray-400">
          {{ t('story.photoNote') }} · Photos:
          <a href="https://unsplash.com/photos/WyWbcqwb9oo" target="_blank" rel="noopener noreferrer" class="underline hover:text-bb-blue">Zoshua Colah</a>,
          <a href="https://unsplash.com/photos/G4iBY_MUmtk" target="_blank" rel="noopener noreferrer" class="underline hover:text-bb-blue">Ichsan Chairul</a>,
          <a href="https://unsplash.com/photos/7p4SmQtWFHU" target="_blank" rel="noopener noreferrer" class="underline hover:text-bb-blue">Scott Soltys-Curry</a>
        </p>
      </div>
    </section>
  </article>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();
</script>
