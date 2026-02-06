<!-- src/components/HeroSection.vue -->
<template>
  <section class="relative h-screen flex items-center justify-center text-white text-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop');">
    <div class="absolute inset-0 bg-black opacity-60"></div>
    <div class="relative z-10 px-4">
      <h2 class="text-5xl md:text-7xl font-bold" style="font-family: 'Barlow Condensed', sans-serif;">CRUSH YOUR FITNESS GOALS</h2>
      <p class="mt-4 text-lg md:text-xl max-w-2xl mx-auto" style="font-family: 'Barlow', sans-serif;">Personalized workout plans, nutrition tracking, and a supportive community to help you unleash your full potential.</p>
      <a href="#cta" class="mt-8 inline-block bg-[#16A34A] text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 cta-glow">Start Your Journey</a>
    </div>
  </section>
</template>