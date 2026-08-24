<template>
  <div class="min-h-screen bg-[#F7F5F2] py-20 sm:py-28">
    <div class="mx-auto max-w-5xl px-6 lg:px-12">
      <header class="mb-14 border-b border-[#DCD5CE] pb-10">
        <p class="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">{{ t('guide.eyebrow') }}</p>
        <h1 class="text-3xl font-light tracking-wide text-bb-text sm:text-4xl">{{ t('guide.title') }}</h1>
        <p class="mt-5 max-w-2xl text-sm font-light leading-7 text-gray-500">
          {{ t('guide.intro') }}
        </p>
      </header>

      <div class="space-y-4">
        <details class="guide-card">
          <summary class="guide-title"><span>01</span>{{ t('guide.order.title') }}</summary>
          <ol class="guide-list list-decimal">
            <li v-for="item in tm('guide.order.items')" :key="item">{{ item }}</li>
          </ol>
        </details>

        <details class="guide-card">
          <summary class="guide-title"><span>02</span>{{ t('guide.payment.title') }}</summary>
          <p class="guide-copy">
            {{ t('guide.payment.copy') }}
          </p>

          <div class="mt-7 overflow-hidden border border-[#D8CEC5] bg-white">
            <div class="border-b border-[#E8E3DE] bg-[#F1ECE7] px-6 py-4">
              <h3 class="text-xs font-semibold tracking-[0.2em] text-bb-text">{{ t('guide.payment.bankInfo') }}</h3>
            </div>
            <dl class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 px-6 py-6 text-sm">
              <dt class="text-gray-400">{{ t('guide.payment.bank') }}</dt>
              <dd class="font-medium text-bb-text">{{ t('guide.payment.bankName') }}</dd>
              <dt class="text-gray-400">{{ t('guide.payment.bankCode') }}</dt>
              <dd class="font-medium text-bb-text">808</dd>
              <dt class="text-gray-400">{{ t('guide.payment.account') }}</dt>
              <dd class="font-mono text-base font-semibold tracking-wider text-[#8A4B25]">1230-940-028604</dd>
              <dt class="text-gray-400">{{ t('guide.payment.accountName') }}</dt>
              <dd class="font-medium text-bb-text">{{ t('guide.payment.company') }}</dd>
            </dl>
          </div>

          <div class="mt-5 border-l-2 border-bb-blue bg-[#EEF5F5] px-5 py-4 text-xs leading-6 text-gray-600">
            {{ t('guide.payment.notice') }}
          </div>
        </details>

        <details class="guide-card">
          <summary class="guide-title"><span>03</span>{{ t('guide.shipping.title') }}</summary>
          <ul class="guide-list list-disc">
            <li v-for="item in tm('guide.shipping.items')" :key="item">{{ item }}</li>
          </ul>
        </details>

        <details class="guide-card">
          <summary class="guide-title"><span>04</span>{{ t('guide.returns.title') }}</summary>
          <ul class="guide-list list-disc">
            <li v-for="item in tm('guide.returns.items')" :key="item">{{ item }}</li>
          </ul>
        </details>

        <section class="border border-[#D8CEC5] bg-[#2F2925] px-7 py-8 text-white sm:px-10">
          <h2 class="text-sm font-semibold tracking-[0.25em]">{{ t('guide.reminder.title') }}</h2>
          <p class="mt-4 text-xs font-light leading-6 text-white/70">
            {{ t('guide.reminder.copy') }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t, tm } = useI18n();
</script>

<style scoped>
.guide-card {
  border: 1px solid #ded7d0;
  background: #fff;
  padding: 2rem 1.5rem;
}

.guide-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #5a5450;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  cursor: pointer;
  list-style: none;
}

.guide-title::-webkit-details-marker {
  display: none;
}

.guide-title::after {
  content: '+';
  margin-left: auto;
  color: #6b9a9b;
  font-size: 1.25rem;
  font-weight: 300;
}

.guide-card[open] .guide-title {
  margin-bottom: 1.5rem;
}

.guide-card[open] .guide-title::after {
  content: '−';
}

.guide-title span {
  color: #6b9a9b;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
}

.guide-copy,
.guide-list {
  color: #666;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.9;
}

.guide-list {
  padding-left: 1.25rem;
}

.guide-list li + li {
  margin-top: 0.65rem;
}

@media (min-width: 640px) {
  .guide-card {
    padding: 2.5rem;
  }
}
</style>
