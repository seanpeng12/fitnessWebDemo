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
  // Catch all undefined paths and redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  // Use HashHistory to ensure correct initialization in any environment (including direct index.html access)
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
