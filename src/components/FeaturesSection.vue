<!-- src/components/FeaturesSection.vue -->
<template>
  <section id="features" class="py-20 bg-[#FEF2F2]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 text-center">
      <!-- Feature 1 -->
      <div>
        <div class="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-[#DC2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 16v-2m0-10a4 4 0 100 8 4 4 0 000-8zm-5 4h2m10 0h2M6 12H4m16 0h-2" />
          </svg>
        </div>
        <h4 class="text-2xl font-bold" style="font-family: 'Barlow Condensed', sans-serif;">Personalized Workouts</h4>
        <p class="mt-2" style="font-family: 'Barlow', sans-serif;">AI-powered plans that adapt to your progress and keep you challenged.</p>
      </div>
      <!-- Feature 2 -->
      <div>
        <div class="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-[#DC2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h4 class="text-2xl font-bold" style="font-family: 'Barlow Condensed', sans-serif;">Progress Tracking</h4>
        <p class="mt-2" style="font-family: 'Barlow', sans-serif;">Visualize your journey with detailed metrics and achievement milestones.</p>
      </div>
      <!-- Feature 3 -->
      <div>
        <div class="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-[#DC2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 class="text-2xl font-bold" style="font-family: 'Barlow Condensed', sans-serif;">Nutrition Plans</h4>
        <p class="mt-2" style="font-family: 'Barlow', sans-serif;">Custom meal plans and recipes to fuel your body and complement your workouts.</p>
      </div>
    </div>
  </section>
</template>