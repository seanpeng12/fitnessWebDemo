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
            <li><router-link to="/story" class="hover:text-bb-blue transition-colors">{{ t('footer.story') }}</router-link></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.cafes') }}</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">{{ t('footer.sustainability') }}</a></li>
            <li><router-link to="/faq" class="hover:text-bb-blue transition-colors">{{ t('footer.help') }}</router-link></li>
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
                <dd>
                  <a href="tel:+886226918858" class="inline-flex items-center gap-2 hover:text-bb-blue">
                    <svg class="h-4 w-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M7.5 3.75 5.25 6c0 7.04 5.71 12.75 12.75 12.75l2.25-2.25-4-3-2.25 2.25a10.1 10.1 0 0 1-5.75-5.75l2.25-2.25-3-4Z" />
                    </svg>
                    <span>02-2691-8858</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">{{ t('footer.payments') }}</h4>
          <ul class="payment-orbit">
            <li class="payment-item payment-item--visa">
              <span class="payment-badge" title="Visa">
                <img src="../../svg/visa.svg" alt="Visa" class="payment-logo" />
              </span>
            </li>
            <li class="payment-item payment-item--line">
              <span class="payment-badge" title="Line Pay">
                <img src="../../svg/linePay.svg" alt="Line Pay" class="payment-logo" />
              </span>
            </li>
            <li class="payment-item payment-item--apple">
              <span class="payment-badge" title="Apple Pay">
                <img src="../../svg/applePay.svg" alt="Apple Pay" class="payment-logo" />
              </span>
            </li>
            <li class="payment-item payment-item--jko">
              <span class="payment-badge" title="Jko Pay">
                <img src="../../svg/jkopay.svg" alt="Jko Pay" class="payment-logo" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-[#E8E3DE] pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-gray-400 uppercase font-light">
        <p>{{ t('footer.copyright') }}</p>
        <div class="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 md:mt-0">
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

<style scoped>
.payment-orbit {
  position: relative;
  width: min(60%, 8.667rem);
  aspect-ratio: 1;
  margin-inline: auto;
  border-radius: 9999px;
  background-color: #f8f6f3;
  background-image: radial-gradient(circle, rgba(107, 154, 155, 0.42) 1.25px, transparent 1.5px);
  background-size: 11px 11px;
}

.payment-item {
  position: absolute;
  width: 5.5rem;
}

.payment-item--visa {
  top: 16%;
  left: -15%;
}

.payment-item--line {
  top: 30%;
  right: -22%;
}

.payment-item--apple {
  bottom: 22%;
  left: -20%;
}

.payment-item--jko {
  right: -12%;
  bottom: 6%;
}

.payment-badge {
  display: flex;
  width: 100%;
  height: 2.35rem;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2dcd6;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 5px 14px rgba(90, 84, 80, 0.08);
}

.payment-logo {
  width: 4rem;
  height: 1rem;
  object-fit: contain;
}

@media (max-width: 380px) {
  .payment-orbit {
    max-width: 8.333rem;
  }
}
</style>
