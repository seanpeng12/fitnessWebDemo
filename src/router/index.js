// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/products/:handle',
    name: 'ProductDetail',
    component: () => import('../components/ProductDetail.vue'),
    props: true
  },
  {
    path: '/blogs/:slug',
    name: 'BlogDetail',
    component: () => import('../components/BlogDetail.vue'),
    props: true
  },
  // 捕捉所有未定義的路徑並導回首頁
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  // 改用 HashHistory 確保在任何環境（包含直接點擊 index.html）都能正確初始化
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0, behavior: 'instant' };
    }
  }
});

export default router;
