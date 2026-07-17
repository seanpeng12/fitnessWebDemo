<!-- src/components/PageFooter.vue -->
<template>
  <footer class="bg-white border-t border-[#E8E3DE] pt-24 pb-12 px-6 lg:px-12 mt-20">
    <div class="max-w-screen-2xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
        <!-- Brand -->
        <div class="md:col-span-4 lg:col-span-2">
          <div class="flex items-center space-x-2 mb-8">
            <img src="/logo.png" alt="Trinity Coffee Roaster" class="w-6 h-8 object-contain transition-transform group-hover:scale-105">
            <span class="text-lg font-medium tracking-tighter text-bb-text">Trinity Coffee Roaster</span>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed max-w-xs uppercase tracking-widest font-light">
            Bringing you the finest coffee, roasted to perfection and delivered fresh.
          </p>
        </div>

        <!-- Links 1 -->
        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">Shop</h4>
          <ul class="space-y-4 text-[11px] font-light tracking-widest uppercase text-gray-500">
            <li><a href="#" class="hover:text-bb-blue transition-colors">Coffee Beans</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">Brewing Gear</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">Subscriptions</a></li>
          </ul>
        </div>

        <!-- Links 2 -->
        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">Explore</h4>
          <ul class="space-y-4 text-[11px] font-light tracking-widest uppercase text-gray-500">
            <li><a href="#" class="hover:text-bb-blue transition-colors">Our Story</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">Cafes</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">Sustainability</a></li>
            <li><a href="#" class="hover:text-bb-blue transition-colors">Help</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">Connect</h4>
          <div class="flex space-x-4 text-gray-400">
            <a href="#" class="hover:text-bb-blue" title="Twitter">
              <div class="w-5 h-5 bg-currentColor" style="-webkit-mask-image: url(/svg/twitter.svg); mask-image: url(/svg/twitter.svg); -webkit-mask-size: contain; mask-size: contain;"></div>
            </a>
            <a href="#" class="hover:text-bb-blue" title="Instagram">
              <div class="w-5 h-5 bg-currentColor" style="-webkit-mask-image: url(/svg/instagram.svg); mask-image: url(/svg/instagram.svg); -webkit-mask-size: contain; mask-size: contain;"></div>
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] uppercase text-bb-text mb-6">Payments</h4>
          <div class="flex items-center space-x-4 text-gray-400">
            <!-- Visa -->
            <a href="#" class="transition-opacity hover:opacity-80" title="Visa">
              <img src="../../svg/visa.svg" alt="Visa" class="h-4 w-auto" />
            </a>
            <!-- Line Pay -->
            <a href="#" class="transition-opacity hover:opacity-80" title="Line Pay">
              <img src="../../svg/linePay.svg" alt="Line Pay" class="h-5 w-auto" />
            </a>
            <!-- Apple Pay -->
            <a href="#" class="transition-opacity hover:opacity-80" title="Apple Pay">
              <img src="../../svg/applePay.svg" alt="Apple Pay" class="h-5 w-auto" />
            </a>
            <!-- Jko Pay -->
            <a href="#" class="transition-opacity hover:opacity-80" title="Jko Pay">
              <img src="../../svg/jkopay.svg" alt="Jko Pay" class="h-5 w-auto" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-[#E8E3DE] pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-gray-400 uppercase font-light">
        <p>© 2026 奧多伴有限公司. 版權所有.</p>
        <div class="flex space-x-8 mt-6 md:mt-0">
          <a href="#" class="hover:text-bb-blue transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-bb-blue transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-bb-blue transition-colors">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
</template>
