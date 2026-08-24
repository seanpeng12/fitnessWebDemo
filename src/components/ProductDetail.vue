<!-- src/components/ProductDetail.vue -->
<template>
  <!-- Loading State with Fade -->
  <transition name="fade">
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-white absolute inset-0 z-40">
      <div class="animate-pulse text-bb-blue tracking-widest uppercase text-[10px]">{{ t('common.loading') }}</div>
    </div>
  </transition>

  <div v-if="product" class="bg-white min-h-screen pt-8 transition-opacity duration-1000">
    <div class="max-w-screen-xl mx-auto px-6 lg:px-12">
      <!-- Breadcrumbs -->
      <nav class="mb-12 text-[10px] tracking-[0.1em] text-gray-400">
        <router-link to="/" class="hover:text-bb-blue">{{ t('product.home') }}</router-link>
        <span class="mx-2">></span>
        <router-link to="/#shop" class="hover:text-bb-blue uppercase">{{ t('product.coffee') }}</router-link>
        <span class="mx-2">></span>
        <span class="text-bb-text uppercase">{{ product.title }}</span>
      </nav>

      <!-- Main Product Section -->
      <div class="flex flex-col lg:flex-row gap-12 mb-24">
        <!-- Left: Swipeable Image Gallery -->
        <div class="lg:w-1/2">
          <!-- Main Scroll Container with Initial Fade-In -->
          <div 
            ref="scrollContainer"
            @scroll="handleScroll"
            class="bg-[#F7F7F7] aspect-square flex overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing animate-fadeIn"
          >
            <div 
              v-for="(img, index) in product.images.edges" 
              :key="index"
              class="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-8"
            >
              <img 
                :src="img.node.url" 
                :alt="img.node.altText || product.title" 
                class="w-full h-full object-contain mix-blend-multiply pointer-events-none transition-opacity duration-700"
              />
            </div>
          </div>

          <!-- Thumbnails -->
          <div v-if="product.images.edges.length > 1" class="grid grid-cols-6 gap-2 mt-4 opacity-0 animate-fadeIn delay-300">
            <div 
              v-for="(img, index) in product.images.edges" 
              :key="index"
              class="aspect-square bg-[#F7F7F7] p-1 cursor-pointer border transition-all"
              :class="currentImageIndex === index ? 'border-bb-blue' : 'border-transparent hover:border-gray-300'"
              @click="scrollToImage(index)"
            >
              <img :src="img.node.url" class="w-full h-full object-contain mix-blend-multiply" />
            </div>
          </div>
        </div>

        <!-- Right: Order Info (with its own fade) -->
        <div class="lg:w-1/2 opacity-0 animate-fadeIn delay-200">
          <h1 class="text-2xl font-normal text-bb-text mb-4">{{ product.title }}</h1>
          <p v-if="selectedVariant" class="text-xl font-normal text-bb-text mb-8">
            {{ formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) }}
          </p>

          <div class="mb-8">
            <label class="block text-[10px] font-bold tracking-widest text-gray-400 mb-2 uppercase">{{ t('product.quantity') }}</label>
            <div class="flex items-center border border-gray-200 w-32">
              <button @click="quantity > 1 && quantity--" class="px-4 py-2 border-r border-gray-200">-</button>
              <input type="text" v-model="quantity" class="w-full text-center text-sm focus:outline-none" />
              <button @click="quantity++" class="px-4 py-2 border-l border-gray-200">+</button>
            </div>
          </div>

          <button 
            :disabled="cartLoading || !selectedVariant?.availableForSale"
            @click="handleAddToCart"
            class="w-full bg-bb-blue text-white py-4 text-xs font-bold tracking-[0.2em] hover:bg-opacity-90 transition-all mb-8 uppercase disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {{ selectedVariant?.availableForSale ? t('product.addToCart') : t('product.soldOut') }}
          </button>

          <div
            v-if="product.descriptionHtml"
            class="product-description text-[13px] text-gray-600 leading-relaxed font-light"
            v-html="product.descriptionHtml"
          ></div>
        </div>
      </div>

      <!-- CATEGORY SECTION -->
      <section class="mb-32">
        <h2 class="text-sm font-bold tracking-widest text-center mb-12 uppercase">{{ t('product.category') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div v-for="cat in fullCategories" :key="cat.name" class="relative group h-48 overflow-hidden cursor-pointer">
            <img :src="cat.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <span class="text-white text-xs font-bold tracking-[0.3em] uppercase">{{ cat.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Banner -->
      <section class="mb-32">
        <div class="relative h-64 bg-[#2C241E] flex flex-col items-center justify-center text-white text-center">
          <p class="text-[10px] tracking-[0.5em] mb-4">TRINITY COFFEE ROASTER</p>
          <h2 class="text-3xl font-light tracking-[0.2em] mb-2 uppercase">{{ t('product.event') }}</h2>
          <p class="text-[10px] tracking-[0.3em] font-light">2026</p>
          <div class="absolute inset-0 border-[12px] border-white/5 pointer-events-none"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useShopify } from '../composables/useShopify';
import { useCart } from '../composables/useCart';

const props = defineProps({ handle: { type: String, required: true } });
defineEmits(['close']);

const { product, loading, fetchProductByHandle } = useShopify();
const { addLine, loading: cartLoading } = useCart();
const scrollContainer = ref(null);
const currentImageIndex = ref(0);
const quantity = ref(1);
const { t, locale } = useI18n();

const selectedVariant = computed(() => product.value?.variants.edges[0]?.node || null);

const formatPrice = (amount, currencyCode) => {
  return new Intl.NumberFormat(locale.value === 'zh-TW' ? 'zh-TW' : 'en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

const fullCategories = computed(() => [
  { name: t('product.categories.coffee'), image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600' },
  { name: t('product.categories.drinkware'), image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600' },
  { name: t('product.categories.goods'), image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600' },
  { name: t('product.categories.food'), image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600' },
  { name: t('product.categories.brewing'), image: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?q=80&w=600' },
  { name: t('product.categories.exclusive'), image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600' },
]);

const handleScroll = () => {
  if (!scrollContainer.value) return;
  const { scrollLeft, clientWidth } = scrollContainer.value;
  const index = Math.round(scrollLeft / clientWidth);
  currentImageIndex.value = index;
};

const scrollToImage = (index) => {
  if (!scrollContainer.value) return;
  const clientWidth = scrollContainer.value.clientWidth;
  scrollContainer.value.scrollTo({
    left: index * clientWidth,
    behavior: 'smooth'
  });
  currentImageIndex.value = index;
};

const handleAddToCart = async () => {
  if (!selectedVariant.value) return;
  try { await addLine(selectedVariant.value.id, Number(quantity.value)); } catch { /* Cart displays the error. */ }
};

const initData = async () => {
  currentImageIndex.value = 0;
  await fetchProductByHandle(props.handle);
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = 0;
  }
};

watch([() => props.handle, locale], initData, { immediate: true });
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.snap-x {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Specific Animations */
.animate-fadeIn {
  animation: fadeIn 0.8s ease forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transition for loading and image switch */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.product-description :deep(p) {
  margin-bottom: 1rem;
}
.product-description :deep(ul),
.product-description :deep(ol) {
  margin: 1rem 0;
  padding-left: 1.25rem;
}
.product-description :deep(ul) { list-style: disc; }
.product-description :deep(ol) { list-style: decimal; }
</style>
