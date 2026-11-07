<template>
  <div class="np-page">
    <header class="np-header">
      <button class="icon-button" :aria-label="copy.menu" @click="menuOpen = !menuOpen">
        <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <button class="icon-button np-search" :aria-label="copy.search" @click="scrollTo('related')">
        <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
      </button>
      <router-link class="np-brand" to="/" aria-label="Trinity Coffee Roaster">
        <img src="/logo.png" alt="" />
        <span><b>TRINITY</b><b>COFFEE</b><b>ROASTER</b></span>
      </router-link>
      <button class="lang-button" @click="toggleLocale">{{ locale === 'zh-TW' ? 'EN' : '中' }}</button>
      <button class="icon-button cart-button" :aria-label="copy.cart" @click="isOpen = true">
        <svg viewBox="0 0 24 24"><path d="M7 9V7a5 5 0 0 1 10 0v2M5 9h14l-1 11H6L5 9Z" /></svg>
        <span v-if="totalQuantity">{{ totalQuantity }}</span>
      </button>
    </header>

    <transition name="menu">
      <nav v-if="menuOpen" class="np-menu">
        <button @click="scrollTo('product')">{{ copy.product }}</button>
        <button @click="scrollTo('story')">{{ copy.description }}</button>
        <button v-if="brewGuideHtml" @click="scrollTo('brew')">{{ copy.brew }}</button>
        <button @click="scrollTo('related')">{{ copy.related }}</button>
      </nav>
    </transition>

    <div class="breadcrumb">
      <router-link to="/">⌂</router-link><span>/</span><span>{{ mainProduct?.productType || copy.coffee }}</span><span>/</span><span>{{ displayedMainTitle }}</span>
    </div>

    <main>
      <section id="product" class="product-section">
        <div class="product-gallery">
          <div v-if="shopLoading" class="product-placeholder">{{ copy.loading }}</div>
          <img v-else-if="heroImage" :src="heroImage.url" :alt="locale === 'en' ? displayedMainTitle : (heroImage.altText || displayedMainTitle)" />
          <img v-else src="/logo.png" alt="Trinity Coffee Roaster" class="fallback-logo" />
          <div v-if="productImages.length > 1" class="gallery-dots">
            <button v-for="(_, index) in productImages" :key="index" :class="{ active: galleryIndex === index }" @click="galleryIndex = index" />
          </div>
        </div>

        <div class="purchase-panel">
          <div v-for="option in productOptions" :key="option.name" class="option-group">
            <strong>{{ option.name }}</strong>
            <div class="choice-row">
              <button
                v-for="value in option.values"
                :key="value"
                :class="{ selected: isOptionSelected(option.name, value) }"
                :disabled="!hasVariantForOption(option.name, value)"
                @click="selectOption(option.name, value)"
              >
                {{ value }}
              </button>
            </div>
          </div>

          <h1>{{ displayedMainTitle }}</h1>

          <div class="purchase-types">
            <label><input checked type="radio" name="purchase" /><span>{{ copy.oneTime }}</span></label>
            <label class="disabled"><input disabled type="radio" name="purchase" /><span>{{ copy.subscribe }} <small>{{ copy.soon }}</small></span></label>
          </div>

          <div class="cart-line">
            <div class="stepper">
              <button @click="quantity = Math.max(1, quantity - 1)">−</button><span>{{ quantity }}</span><button @click="quantity += 1">＋</button>
            </div>
            <div class="price-group">
              <del v-if="formattedCompareAtPrice">{{ formattedCompareAtPrice }}</del>
              <strong>{{ formattedPrice }}</strong>
            </div>
          </div>
          <button class="add-button" :disabled="!selectedVariant?.availableForSale || cartLoading" @click="addToCart">
            <span v-if="cartLoading" class="spinner" />
            <svg v-else viewBox="0 0 24 24"><path d="M7 9V7a5 5 0 0 1 10 0v2M5 9h14l-1 11H6L5 9Z" /></svg>
            {{ selectedVariant?.availableForSale === false ? copy.soldOut : copy.add }}
          </button>
          <p class="delivery">{{ copy.delivery }}</p>
          <p v-if="shopError" class="error">{{ shopError }}</p>

          <details v-if="mainProduct?.descriptionHtml" class="product-copy">
            <summary>{{ copy.description }}</summary>
            <div class="product-description" v-html="mainProduct.descriptionHtml" />
          </details>

          <details v-if="mainProduct" class="specs" open>
            <summary>{{ copy.productDetails }}</summary>
            <dl>
              <template v-if="mainProduct.vendor"><dt>{{ copy.vendor }}</dt><dd>{{ mainProduct.vendor }}</dd></template>
              <template v-if="mainProduct.productType"><dt>{{ copy.productType }}</dt><dd>{{ mainProduct.productType }}</dd></template>
              <template v-for="option in selectedVariant?.selectedOptions || []" :key="option.name">
                <dt>{{ option.name }}</dt><dd>{{ option.value }}</dd>
              </template>
              <template v-if="selectedVariant?.sku"><dt>{{ copy.sku }}</dt><dd>{{ selectedVariant.sku }}</dd></template>
            </dl>
          </details>
          <details><summary>{{ copy.different }}</summary><p>{{ copy.directCopy }}</p></details>
          <details><summary>{{ copy.shipping }}</summary><p>{{ copy.delivery }}</p></details>
        </div>
      </section>

      <section id="brew" v-if="brewGuideHtml" class="brew-section">
        <div class="brew-heading"><small>{{ copy.brew }}</small><h2>THIS IS<br />HOW WE<br />BREW IT</h2></div>
        <div class="brew-copy" v-html="brewGuideHtml" />
      </section>

      <section id="story" v-if="productStoryHtml" class="product-story two-column">
        <div class="story-copy">
          <small>{{ copy.productStory }}</small>
          <h2>{{ displayedMainTitle }}</h2>
          <div class="product-story-body" v-html="productStoryHtml" />
        </div>
        <img v-if="heroImage" :src="heroImage.url" :alt="heroImage.altText || displayedMainTitle" />
      </section>

      <section id="related" class="related-section">
        <h2>{{ copy.related }}</h2>
        <div class="product-cards">
          <router-link v-for="item in relatedProducts" :key="item.id" :to="{ path:'/newProduct', query:{ handle:item.handle } }" class="product-card">
            <div><img v-if="item.images.edges[0]" :src="item.images.edges[0].node.url" :alt="item.images.edges[0].node.altText || item.title" /></div>
            <small>{{ item.productType || copy.coffee }}</small><h3>{{ item.title }}</h3><b>{{ formatMoney(item.variants.edges[0]?.node.price) }}</b>
          </router-link>
        </div>
      </section>

      <section class="special-section">
        <h2>{{ copy.special }}</h2>
        <div><span>✿</span><p>{{ copy.direct }}</p></div><div><span>♨</span><p>{{ copy.fresh }}</p></div><div><span>♡</span><p>{{ copy.invest }}</p></div>
      </section>

      <section id="reviews" class="reviews-section">
        <h2>{{ copy.reviewsTitle }}</h2>
        <p class="reviews-note">{{ copy.reviewsNote }}</p>
        <div class="reviews-grid">
          <article><h3>{{ copy.reviewTitle1 }}</h3><div>★★★★★</div><p>{{ copy.reviewBody1 }}</p><b>Yu-Ting</b></article>
          <article><h3>{{ copy.reviewTitle2 }}</h3><div>★★★★★</div><p>{{ copy.reviewBody2 }}</p><b>Wei-Lun</b></article>
        </div>
      </section>

    </main>

    <footer class="np-footer">
      <div><h2>{{ copy.questions }}</h2><router-link to="/faq">{{ copy.shipping }} &amp; FAQ</router-link><router-link to="/faq">{{ copy.payment }}</router-link><router-link to="/faq">{{ copy.returns }}</router-link></div>
      <div><h2>{{ copy.mission }}</h2><p>{{ copy.missionCopy }}</p></div>
      <div><h2>Trinity Coffee Roaster</h2><p>{{ copy.footerCopy }}</p><a href="https://www.instagram.com/trinity.roaster/" target="_blank" rel="noopener">Instagram ↗</a></div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { setLocale } from '../i18n'
import { useShopify } from '../composables/useShopify'
import { useCart } from '../composables/useCart'

const text = {
  'zh-TW': {
    menu: '選單', search: '搜尋', cart: '購物車', product: '商品選購', related: '你可能也喜歡', coffee: '咖啡', brew: '沖煮指南',
    loading: '正在讀取 Shopify 商品…', description: '商品描述', productStory: '商品故事', productDetails: '商品資訊',
    vendor: '品牌', productType: '商品類型', sku: 'SKU', oneTime: '單次購買', subscribe: '定期訂購・省更多',
    soon: '即將推出', add: '加入購物車', soldOut: '暫時售罄',
    delivery: '滿 NT$1,500 享免運，實際運費與到貨時間以 Shopify 結帳頁為準。',
    different: '我們有什麼不同？', directCopy: '小批次烘焙、持續杯測，讓每一批風味都清楚而穩定。',
    shipping: '配送資訊', special: '我們的三個堅持', direct: '直接與產地建立長期合作',
    fresh: '每日新鮮、小批次烘焙', invest: '以實際行動回饋咖啡產地', questions: '需要協助嗎？',
    reviewsTitle: '顧客評論', reviewsNote: '以下為版型示意評論，尚未串接實際商品評論。',
    reviewTitle1: '平衡又順口', reviewBody1: '香氣清楚，放涼後仍然甜，日常手沖非常穩定。',
    reviewTitle2: '溫柔而有層次', reviewBody2: '酸質很舒服，可可尾韻讓整杯非常耐喝。',
    payment: '訂單與付款', returns: '退換貨說明', mission: '我們的使命',
    missionCopy: '用穩定烘焙與長期產地合作，讓一杯好咖啡同時照顧風味、土地與人的生活。',
    footerCopy: '源頭、工藝、穩定——把值得信賴的咖啡帶進每一天。',
  },
  en: {
    menu: 'Menu', search: 'Search', cart: 'Cart', product: 'Product', related: 'You may also like', coffee: 'Coffee', brew: 'Brew guide',
    loading: 'Loading Shopify products…', description: 'Product description', productStory: 'Product story', productDetails: 'Product details',
    vendor: 'Vendor', productType: 'Product type', sku: 'SKU', oneTime: 'One-time purchase', subscribe: 'Subscribe & save',
    soon: 'Coming soon', add: 'Add to cart', soldOut: 'Sold out',
    delivery: 'Free shipping over NT$1,500. Final rates and delivery times are shown at Shopify checkout.',
    different: 'What are we doing differently?', directCopy: 'Small-batch roasting and continual cupping keep every lot clear and consistent.',
    shipping: 'Shipping', special: 'What makes us special?', direct: 'Long-term, direct origin partnerships',
    fresh: 'Freshly roasted in small batches', invest: 'Meaningful investment in coffee regions', questions: 'Do you have questions?',
    reviewsTitle: 'Customer reviews', reviewsNote: 'Sample reviews for layout preview. Live product reviews are not connected yet.',
    reviewTitle1: 'Balanced and smooth', reviewBody1: 'Clear aroma, sweet as it cools, and very dependable for daily pour over.',
    reviewTitle2: 'Gentle and layered', reviewBody2: 'Pleasant acidity and a cocoa finish make this exceptionally easy to drink.',
    payment: 'Order & payment', returns: 'Returns', mission: 'This is our mission',
    missionCopy: 'Through consistent roasting and lasting origin partnerships, we make coffee better for flavour, land, and livelihoods.',
    footerCopy: 'Source, craft, consistency — dependable coffee for every day.',
  },
}

const { locale } = useI18n()
const route = useRoute()
const copy = computed(() => text[locale.value] || text['zh-TW'])
const { products, loading: shopLoading, error: shopError, fetchAllProducts } = useShopify()
const { totalQuantity, loading: cartLoading, isOpen, addLine, loadCart } = useCart()
const menuOpen = ref(false)
const quantity = ref(1)
const selectedVariantId = ref('')
const galleryIndex = ref(0)
const requestedHandle = computed(() => typeof route.query.handle === 'string' ? route.query.handle : '')
const mainProduct = computed(() => products.value.find((item) => item.handle === requestedHandle.value) || products.value[0] || null)
const variants = computed(() => mainProduct.value?.variants?.edges.map(({ node }) => node) || [])
const selectedVariant = computed(() => variants.value.find((item) => item.id === selectedVariantId.value) || variants.value[0])
const productOptions = computed(() => (mainProduct.value?.options || []).filter((option) => !(
  option.name === 'Title' && option.values.length === 1 && option.values[0] === 'Default Title'
)))
const productImages = computed(() => mainProduct.value?.images?.edges.map(({ node }) => node) || [])
const heroImage = computed(() => productImages.value[galleryIndex.value] || productImages.value[0])
const relatedProducts = computed(() => products.value.filter((item) => item.id !== mainProduct.value?.id).slice(0, 4))
const formattedPrice = computed(() => formatMoney(selectedVariant.value?.price))
const formattedCompareAtPrice = computed(() => {
  const compareAt = selectedVariant.value?.compareAtPrice
  const price = selectedVariant.value?.price
  if (!compareAt || !price || Number(compareAt.amount) <= Number(price.amount)) return ''
  return formatMoney(compareAt)
})
const displayedMainTitle = computed(() => mainProduct.value?.title || copy.value.product)
const productContent = computed(() => {
  const html = mainProduct.value?.descriptionHtml || ''
  if (!html) return { storyHtml: '', brewHtml: '' }
  const container = document.createElement('div')
  container.innerHTML = html
  const heading = [...container.querySelectorAll('h1, h2, h3')]
    .find((node) => /手沖建議|沖煮建議|brew(?:ing)? (?:guide|tips|recipe)|pour.?over (?:guide|recipe)/i.test(node.textContent || ''))
  if (!heading) return { storyHtml: html, brewHtml: '' }

  const brewNodes = []
  let node = heading
  while (node && (node === heading || !/^H[1-3]$/.test(node.tagName))) {
    const next = node.nextElementSibling
    brewNodes.push(node.outerHTML)
    node.remove()
    node = next
  }
  return { storyHtml: container.innerHTML, brewHtml: brewNodes.join('') }
})
const productStoryHtml = computed(() => productContent.value.storyHtml)
const brewGuideHtml = computed(() => productContent.value.brewHtml)

watch(mainProduct, (product) => {
  const firstVariant = variants.value.find((item) => item.availableForSale) || variants.value[0]
  selectedVariantId.value = firstVariant?.id || ''
  galleryIndex.value = 0
  quantity.value = 1
  if (product) document.title = `${product.title} | Trinity Coffee Roaster`
})
watch(selectedVariant, (variant) => {
  const variantImageUrl = variant?.image?.url
  if (!variantImageUrl) return
  const imageIndex = productImages.value.findIndex((image) => image.url === variantImageUrl)
  if (imageIndex >= 0) galleryIndex.value = imageIndex
})
watch(locale, () => fetchAllProducts())

function formatMoney(price) {
  if (!price) return '—'
  return new Intl.NumberFormat(locale.value === 'zh-TW' ? 'zh-TW' : 'en-US', { style:'currency', currency:price.currencyCode, maximumFractionDigits:0 }).format(Number(price.amount))
}
function isOptionSelected(name, value) {
  return selectedVariant.value?.selectedOptions?.some((option) => option.name === name && option.value === value)
}
function hasVariantForOption(name, value) {
  return variants.value.some((variant) => variant.selectedOptions?.some((option) => option.name === name && option.value === value))
}
function selectOption(name, value) {
  const selection = Object.fromEntries((selectedVariant.value?.selectedOptions || []).map((option) => [option.name, option.value]))
  selection[name] = value
  const exactVariant = variants.value.find((variant) => variant.selectedOptions?.every((option) => selection[option.name] === option.value))
  const fallbackVariant = variants.value.find((variant) => variant.selectedOptions?.some((option) => option.name === name && option.value === value))
  selectedVariantId.value = (exactVariant || fallbackVariant)?.id || selectedVariantId.value
}
function toggleLocale() { setLocale(locale.value === 'zh-TW' ? 'en' : 'zh-TW') }
function scrollTo(id) { menuOpen.value = false; document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }
async function addToCart() { if (selectedVariant.value?.availableForSale) await addLine(selectedVariant.value.id, quantity.value) }

onMounted(() => { fetchAllProducts(); loadCart() })
</script>

<style scoped>
.np-page{--green:#0d4f3c;--sage:#dce4bd;--blue:#0767bd;--ink:#101410;background:#fff;color:var(--ink);font-family:Inter,"Noto Sans TC",Arial,sans-serif;font-size:16px;line-height:1.55}.np-header{position:sticky;top:0;z-index:40;height:72px;padding:0 clamp(16px,4vw,50px);display:grid;grid-template-columns:44px 44px 1fr auto 44px;align-items:center;background:var(--green);color:#fff}.icon-button,.lang-button{display:grid;place-items:center;width:42px;height:42px;border:0;background:transparent;color:inherit}.icon-button svg,.add-button svg{width:24px;fill:none;stroke:currentColor;stroke-width:1.8}.np-search{grid-column:2}.np-brand{grid-column:3;justify-self:center;display:flex;align-items:center;gap:9px;color:#fff;text-decoration:none}.np-brand img{width:24px;height:34px;object-fit:contain;filter:brightness(0) invert(1)}.np-brand span{display:flex;flex-direction:column;font-size:10px;line-height:.95;letter-spacing:.1em}.lang-button{grid-column:4;font-weight:800}.cart-button{grid-column:5;position:relative}.cart-button span{position:absolute;right:-1px;top:2px;display:grid;place-items:center;min-width:18px;height:18px;padding:0 4px;border-radius:12px;background:#f4a000;color:#173b2f;font-size:11px;font-weight:800}.np-menu{position:fixed;inset:72px 0 auto;z-index:35;display:flex;justify-content:center;gap:42px;padding:22px;background:#fff;border-bottom:1px solid #d9ded9;box-shadow:0 12px 30px #0002}.np-menu button{border:0;background:none;font-weight:750}.menu-enter-active,.menu-leave-active{transition:.25s}.menu-enter-from,.menu-leave-to{transform:translateY(-15px);opacity:0}.breadcrumb{max-width:1240px;margin:auto;padding:14px clamp(16px,4vw,50px);display:flex;gap:10px;font-size:13px}.breadcrumb a{color:inherit}.product-section{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(390px,.92fr);max-width:1400px;margin:auto}.product-gallery{position:sticky;top:72px;height:calc(100vh - 72px);min-height:620px;display:grid;place-items:center;background:var(--sage);overflow:hidden}.product-gallery>img:not(.fallback-logo){width:min(70%,620px);height:75%;object-fit:contain}.product-gallery .fallback-logo{width:150px}.product-placeholder{font-weight:700;color:#315344}.gallery-dots{position:absolute;bottom:28px;display:flex;gap:8px}.gallery-dots button{width:9px;height:9px;padding:0;border:0;border-radius:50%;background:#9da399}.gallery-dots .active{width:26px;border-radius:8px;background:var(--green)}.purchase-panel{padding:clamp(35px,5vw,72px)}.purchase-panel h1{font-family:Georgia,"Noto Serif TC",serif;font-size:clamp(38px,4vw,62px);line-height:1.05;margin:32px 0 8px}.option-group{margin-bottom:22px}.option-group>strong{display:block;margin-bottom:8px}.choice-row{display:flex;flex-wrap:wrap;gap:8px}.choice-row button{min-width:110px;padding:12px 18px;border:2px solid var(--blue);background:#fff;color:#075ba8;font-weight:750}.choice-row button.selected{background:var(--blue);color:#fff}.choice-row button:disabled{cursor:not-allowed;border-color:#b9c1c0;color:#909796;text-decoration:line-through}.rating{display:flex;gap:10px;align-items:center;font-size:13px}.rating span,.big-stars,.reviews-grid article>div{color:#f4a000;letter-spacing:1px}.rating a{color:inherit}.lead{font-size:18px;margin:24px 0 34px}.product-description:deep(p){margin:0 0 12px}.product-description:deep(p:last-child){margin-bottom:0}.product-description:deep(ul),.product-description:deep(ol){padding-left:1.3em}.purchase-types{border:1px solid #bcc7d0;border-radius:3px}.purchase-types label{display:flex;align-items:center;gap:14px;padding:17px;border-bottom:1px solid #bcc7d0;font-weight:700}.purchase-types label:last-child{border:0}.purchase-types input{width:19px;height:19px;accent-color:var(--blue)}.purchase-types small{padding:3px 7px;border-radius:12px;background:#e7eee9;color:#527060}.purchase-types .disabled{color:#777}.cart-line{display:flex;align-items:center;justify-content:space-between;margin-top:24px}.price-group{display:flex;align-items:baseline;gap:9px}.price-group del{color:#8a8a8a;font-size:14px}.price-group strong{font-size:25px}.stepper{display:flex;border:1px solid #bbc7d0}.stepper>*{display:grid;place-items:center;width:45px;height:42px}.stepper button{border:0;background:#fff;font-size:20px}.stepper span{border-inline:1px solid #bbc7d0}.add-button{width:100%;margin-top:10px;padding:14px;display:flex;justify-content:center;align-items:center;gap:10px;border:0;background:var(--blue);color:#fff;font-size:16px;font-weight:800}.add-button:disabled{opacity:.55}.spinner{width:18px;height:18px;border:2px solid #fff7;border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.delivery{font-size:13px;color:#535353}.error{color:#a71919}.purchase-panel details{border-top:1px solid #c5ced5;padding:18px 8px}.purchase-panel details:last-child{border-bottom:1px solid #c5ced5}.purchase-panel summary{cursor:pointer;font-weight:800}.purchase-panel details p{font-size:14px}.specs dl,.coop-card dl,.brew-copy dl{display:grid;grid-template-columns:125px 1fr;gap:14px;margin-top:28px}.specs dt,.coop-card dt{font-weight:800}.specs dd{margin:0;display:flex;align-items:center;gap:15px}.specs i{position:relative;width:100px;height:6px;background:#e3c0bd;border-radius:4px}.specs i:before{content:"";display:block;width:var(--value);height:100%;border-radius:4px;background:#ff9700}.icon-grid{padding:70px clamp(20px,5vw,80px);display:grid;grid-template-columns:repeat(4,1fr);gap:40px;background:var(--sage)}.icon-grid article{text-align:center}.icon-grid span{display:block;font-size:42px}.icon-grid small{display:block;letter-spacing:.12em;text-transform:uppercase}.icon-grid b{display:block;margin-top:7px}.two-column{display:grid;grid-template-columns:1fr 1fr;align-items:stretch}.story-block>img,.roasting-section>img{width:100%;height:100%;min-height:530px;object-fit:cover}.story-copy,.roasting-section>div{padding:clamp(50px,8vw,120px)}h2{font-size:clamp(28px,3vw,44px);line-height:1.12;margin:0 0 22px}p{font-size:17px}.reverse .story-copy{order:2}.origin-section{display:grid;grid-template-columns:1fr 1fr}.origin-copy{padding:clamp(50px,7vw,110px)}.origin-section>img{width:100%;height:620px;object-fit:cover}.origin-section blockquote{grid-column:1/-1;margin:0;padding:50px clamp(30px,10vw,160px);background:var(--sage);font-size:clamp(22px,3vw,36px);font-weight:800}.cooperative{display:grid;grid-template-columns:1fr 1fr}.cooperative>div:first-child{padding:clamp(50px,7vw,110px)}.cooperative>img{width:100%;height:100%;min-height:570px;object-fit:cover}.coop-card{grid-column:1/-1;padding:clamp(50px,10vw,140px);max-width:950px;margin:auto}.coop-card>small{color:var(--blue);font-size:18px;font-weight:800}.coop-card dl{max-width:520px}.coop-card dd{margin:0}.roasting-section a{display:inline-block;margin-top:20px;padding:12px 18px;border:2px solid var(--blue);color:var(--blue);font-weight:800;text-decoration:none}.brew-section{padding:clamp(55px,8vw,110px);display:grid;grid-template-columns:.9fr 1.1fr;gap:10vw;background:var(--blue);color:#fff}.brew-heading small{font-size:22px;font-weight:800}.brew-heading h2{font-size:clamp(58px,8vw,110px);line-height:.88;margin-top:20px}.brew-copy{align-self:end}.brew-copy h3{font-size:32px}.brew-copy dl{grid-template-columns:1fr 1fr}.brew-copy dd{margin:0;text-align:right;font-weight:800;border-bottom:1px solid #fff}.related-section,.reviews-section{padding:clamp(55px,7vw,100px)}.product-cards{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(260px,1fr);gap:18px;overflow-x:auto;padding-bottom:15px}.product-card{color:inherit;text-decoration:none}.product-card>div{height:350px;background:#f0dcc4}.product-card img{width:100%;height:100%;object-fit:contain}.product-card small{display:block;margin-top:12px;color:var(--blue);font-weight:800}.product-card h3{margin:3px 0}.special-section{padding:clamp(55px,8vw,110px);background:var(--sage)}.special-section>div{display:grid;grid-template-columns:70px 1fr;align-items:center;max-width:700px;margin:25px 0}.special-section span{font-size:40px}.special-section p{margin:0}.reviews-section{text-align:center}.big-stars{font-size:34px}.reviews-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;max-width:950px;margin:35px auto 0;text-align:left}.reviews-grid article{padding:28px;border:1px solid #bbc7d0}.reviews-grid h3{font-size:22px}.np-footer{padding:clamp(55px,8vw,110px);display:grid;grid-template-columns:repeat(3,1fr);gap:8vw;background:var(--green);color:#fff}.np-footer h2{font-size:24px}.np-footer a{display:block;width:max-content;margin:14px 0;color:inherit;text-decoration:underline}.np-footer p{font-size:14px;max-width:390px}
.product-story{background:#f3f5ee}.product-story .story-copy{max-width:720px}.product-story .story-copy>small{display:block;margin-bottom:14px;color:var(--green);font-weight:800;letter-spacing:.1em}.product-story>img{width:100%;height:100%;min-height:520px;object-fit:contain;padding:8%;background:var(--sage)}.product-story-body:deep(p){margin:0 0 16px}.product-story-body:deep(h2),.product-story-body:deep(h3){margin:28px 0 12px}.product-story-body:deep(ul),.product-story-body:deep(ol){padding-left:1.4em}.product-story-body:deep(img){max-width:100%;height:auto}
.brew-copy:deep(h2),.brew-copy:deep(h3){color:#fff;font-size:30px}.brew-copy:deep(p){margin:16px 0}.brew-copy:deep(ol),.brew-copy:deep(ul){padding-left:1.4em}.brew-copy:deep(li){margin:9px 0}
.reviews-note{margin:0 auto;color:#5d6660;font-size:14px}
@media(max-width:800px){.np-page{font-size:15px}.np-header{height:58px;display:flex;padding:0 10px}.np-header .icon-button,.lang-button{width:36px;height:36px;flex:none}.np-brand{position:absolute;left:50%;transform:translateX(-50%)}.lang-button{position:absolute;right:47px}.cart-button{position:absolute;right:9px}.np-brand img{width:18px;height:27px}.np-brand span{font-size:8px}.np-menu{inset:58px 0 auto;display:grid;gap:15px;text-align:left}.breadcrumb{padding:11px 16px}.product-section{display:block}.product-gallery{position:relative;top:auto;height:368px;min-height:0}.product-gallery>img:not(.fallback-logo){width:76%;height:78%}.gallery-dots{bottom:14px}.purchase-panel{padding:25px 15px 35px}.purchase-panel h1{font-size:35px;margin-top:25px}.lead{font-size:16px}.specs dl{grid-template-columns:105px 1fr}.icon-grid{grid-template-columns:1fr 1fr;padding:45px 20px;gap:40px 20px}.two-column,.origin-section,.cooperative,.brew-section{display:flex;flex-direction:column}.story-copy,.origin-copy,.roasting-section>div,.cooperative>div:first-child,.coop-card{padding:45px 15px}.story-block>img,.roasting-section>img,.origin-section>img,.cooperative>img{min-height:0;height:390px}.reverse .story-copy{order:0}.origin-section blockquote{padding:40px 20px}.coop-card{grid-column:auto}.brew-section{padding:50px 15px}.brew-heading h2{font-size:55px}.brew-copy dl{grid-template-columns:1fr 1fr}.related-section,.reviews-section{padding:50px 15px}.product-cards{grid-auto-columns:78%}.product-card>div{height:300px}.reviews-grid{grid-template-columns:1fr}.np-footer{grid-template-columns:1fr;padding:50px 20px}.np-search{display:none}}
</style>
