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
        <p class="text-lg md:text-xl text-gray-500 font-light mb-12 max-w-lg leading-relaxed">
          Origin, Roast, Brew
        </p>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="#shop" class="bb-button bg-bb-blue text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase text-center">
            Shop Coffee
          </a>
          <a href="#features" class="bb-button border border-bb-text text-bb-text px-10 py-4 text-sm font-semibold tracking-widest uppercase text-center">
            Learn More
          </a>
        </div>
      </div>

      <!-- Hero Image Placeholder -->
      <div class="lg:w-1/2 relative">
        <div class="bg-white p-4 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
            alt="Blue Bottle Coffee" 
            class="w-full h-auto grayscale-[0.2] contrast-[1.1]"
          />
        </div>
        <!-- Decorative Blue Dot -->
        <div class="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-bb-blue hidden lg:block"></div>
      </div>
    </div>
  </section>
</template>
