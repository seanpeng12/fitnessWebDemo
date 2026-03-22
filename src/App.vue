<!-- src/App.vue -->
<template>
  <div class="bg-white text-bb-text font-sans">
    <PageHeader />
    <main>
      <!-- 移除 transition，直接由 router-view 渲染內容 -->
      <router-view></router-view>
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';
</script>

<style>
/* Since we are using the Play CDN, we'll add the base Tailwind layers here */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global Styles */
html {
  scroll-behavior: smooth;
  background-color: #00AEEF;
  touch-action: manipulation;
}
body {
  background-color: #ffffff;
  color: #333333;
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
}
a, button {
  touch-action: manipulation;
}

/* 移除之前的頁面過渡動畫 CSS */
</style>
