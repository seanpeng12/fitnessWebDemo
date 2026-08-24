<!-- src/components/PageFooter.vue -->
<template>
  <footer class="bg-white border-t border-[#E8E3DE] pt-24 pb-12 px-6 lg:px-12 mt-20">
    <div class="max-w-screen-2xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
        <!-- Brand -->
        <div class="md:col-span-4 lg:col-span-2">
          <div class="flex items-center space-x-2 mb-8">
            <img src="/logo.png" alt="Trinity Coffee Roaster" class="w-6 h-8 object-contain transition-transform group-hover:scale-105">
            <span class="text-lg font-medium tracking-tighter text-bb-text">Trinity Coffee Roaster LTD.</span>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed max-w-xs uppercase tracking-widest font-light">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- Links 1 -->
        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">{{ t('footer.shop') }}</h4>
          <ul class="space-y-4 text-[11px] font-light tracking-widest uppercase text-gray-500">
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.coffeeBeans') }}</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.brewingGear') }}</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.subscriptions') }}</a></li>
          </ul>
        </div>

        <!-- Links 2 -->
        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">{{ t('footer.explore') }}</h4>
          <ul class="space-y-4 text-[11px] font-light tracking-widest uppercase text-gray-500">
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.story') }}</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.cafes') }}</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.sustainability') }}</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.help') }}</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">{{ t('footer.connect') }}</h4>
          <div class="flex space-x-4 text-gray-400">
            <a
              href="https://www.instagram.com/trinity.roaster/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D8CEC5] hover:border-bb-blue hover:text-bb-blue"
              title="Instagram"
              aria-label="Instagram"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke-width="1.7" />
                <circle cx="12" cy="12" r="4" stroke-width="1.7" />
                <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          <div class="mt-8 border-t border-[#E8E3DE] pt-6">
            <h5 class="text-[10px] font-bold tracking-[0.25em] text-bb-text">{{ t('footer.contact') }}</h5>
            <dl class="mt-4 space-y-4 text-[11px] font-light leading-5 text-gray-500">
              <div>
                <dt class="mb-1 font-medium text-bb-text">{{ t('footer.addressLabel') }}</dt>
                <dd>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E5%8C%97%E5%B8%82%E6%B1%90%E6%AD%A2%E5%8D%80%E4%B8%AD%E6%AD%A3%E8%B7%AF111%E8%99%9F"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-start gap-2 hover:text-bb-blue"
                  >
                    <svg class="mt-0.5 h-4 w-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
                      <circle cx="12" cy="10" r="2" stroke-width="1.6" />
                    </svg>
                    <span>{{ t('footer.address') }}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt class="mb-1 font-medium text-bb-text">{{ t('footer.phoneLabel') }}</dt>
                <dd><a href="tel:+886226918858" class="hover:text-bb-blue">02-2691-8858</a></dd>
              </div>
            </dl>
          </div>
        </div>

        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">{{ t('footer.payments') }}</h4>
          <ul class="flex flex-wrap items-center gap-x-5 gap-y-4 lg:block lg:space-y-4">
            <li>
              <a href="#" class="inline-flex transition-opacity hover:opacity-80" title="Visa">
                <img src="../../svg/visa.svg" alt="Visa" class="h-5 w-auto object-contain" />
              </a>
            </li>
            <li>
              <a href="#" class="inline-flex transition-opacity hover:opacity-80" title="Line Pay">
                <img src="../../svg/linePay.svg" alt="Line Pay" class="h-5 w-auto object-contain" />
              </a>
            </li>
            <li>
              <a href="#" class="inline-flex transition-opacity hover:opacity-80" title="Apple Pay">
                <img src="../../svg/applePay.svg" alt="Apple Pay" class="h-5 w-auto object-contain" />
              </a>
            </li>
            <li>
              <a href="#" class="inline-flex transition-opacity hover:opacity-80" title="Jko Pay">
                <img src="../../svg/jkopay.svg" alt="Jko Pay" class="h-5 w-auto object-contain" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-[#E8E3DE] pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-gray-400 uppercase font-light">
        <p>{{ t('footer.copyright') }}</p>
        <div class="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 md:mt-0">
          <router-link to="/shopping-guide" class="hover:text-bb-blue transition-colors">{{ t('footer.guide') }}</router-link>
          <a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.privacy') }}</a>
          <a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.terms') }}</a>
          <a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.accessibility') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
