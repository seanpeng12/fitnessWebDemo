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
        <button @click="scrollTo('origin')">{{ copy.originStory }}</button>
        <button @click="scrollTo('brew')">{{ copy.brew }}</button>
        <button @click="scrollTo('related')">{{ copy.related }}</button>
      </nav>
    </transition>

    <div class="breadcrumb">
      <router-link to="/">⌂</router-link><span>/</span><span>{{ copy.coffee }}</span><span>/</span><span>{{ copy.filterCoffee }}</span>
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
          <div class="option-group">
            <strong>{{ copy.size }}</strong>
            <div class="choice-row">
              <button v-for="variant in variants" :key="variant.id" :class="{ selected: selectedVariantId === variant.id }" @click="selectedVariantId = variant.id">
                {{ variant.title === 'Default Title' ? '250 g' : variant.title }}
              </button>
            </div>
          </div>

          <div class="option-group">
            <strong>{{ copy.grind }}</strong>
            <div class="choice-row">
              <button :class="{ selected: grind === 'beans' }" @click="grind = 'beans'">{{ copy.beans }}</button>
              <button :class="{ selected: grind === 'ground' }" @click="grind = 'ground'">{{ copy.ground }}</button>
            </div>
          </div>

          <h1>{{ displayedMainTitle }}</h1>
          <div class="rating"><span>★★★★★</span><a href="#reviews">{{ copy.reviewCount }}</a></div>
          <p class="lead">{{ copy.intro }}</p>

          <div class="purchase-types">
            <label><input checked type="radio" name="purchase" /><span>{{ copy.oneTime }}</span></label>
            <label class="disabled"><input disabled type="radio" name="purchase" /><span>{{ copy.subscribe }} <small>{{ copy.soon }}</small></span></label>
          </div>

          <div class="cart-line">
            <div class="stepper">
              <button @click="quantity = Math.max(1, quantity - 1)">−</button><span>{{ quantity }}</span><button @click="quantity += 1">＋</button>
            </div>
            <strong>{{ formattedPrice }}</strong>
          </div>
          <button class="add-button" :disabled="!selectedVariant?.availableForSale || cartLoading" @click="addToCart">
            <span v-if="cartLoading" class="spinner" />
            <svg v-else viewBox="0 0 24 24"><path d="M7 9V7a5 5 0 0 1 10 0v2M5 9h14l-1 11H6L5 9Z" /></svg>
            {{ selectedVariant?.availableForSale === false ? copy.soldOut : copy.add }}
          </button>
          <p class="delivery">{{ copy.delivery }}</p>
          <p v-if="shopError" class="error">{{ shopError }}</p>

          <details class="specs" open>
            <summary>{{ copy.glance }}</summary>
            <dl>
              <dt>{{ copy.taste }}</dt><dd>{{ copy.tasteValue }}</dd>
              <dt>{{ copy.roast }}</dt><dd>{{ copy.medium }} <i style="--value:55%" /></dd>
              <dt>{{ copy.strength }}</dt><dd>{{ copy.balanced }} <i style="--value:52%" /></dd>
              <dt>{{ copy.acidity }}</dt><dd>{{ copy.gentle }} <i style="--value:35%" /></dd>
              <dt>{{ copy.origin }}</dt><dd>{{ copy.ethiopia }}</dd>
              <dt>{{ copy.species }}</dt><dd>100% Arabica, Single Origin</dd>
              <dt>{{ copy.processing }}</dt><dd>{{ copy.washed }}</dd>
            </dl>
          </details>
          <details><summary>{{ copy.different }}</summary><p>{{ copy.directCopy }}</p></details>
          <details><summary>{{ copy.shipping }}</summary><p>{{ copy.delivery }}</p></details>
        </div>
      </section>

      <section class="icon-grid">
        <article><span>◉</span><small>{{ copy.species }}</small><b>100% Arabica<br />Single Origin</b></article>
        <article><span>◌</span><small>{{ copy.taste }}</small><b>{{ copy.tasteValue }}</b></article>
        <article><span>⌁</span><small>{{ copy.origin }}</small><b>{{ copy.ethiopia }}</b></article>
        <article><span>⟳</span><small>{{ copy.processing }}</small><b>{{ copy.washed }}</b></article>
      </section>

      <section class="story-block two-column">
        <div class="story-copy"><h2>{{ copy.reliableTitle }}</h2><p>{{ copy.reliableCopy }}</p></div>
        <img src="/images/story/roasting-beans.jpg" :alt="copy.roastingAlt" />
      </section>

      <section class="story-block reverse two-column">
        <div class="story-copy"><h2>{{ copy.prepTitle }}</h2><p>{{ copy.prepCopy }}</p></div>
        <img src="/images/story/roastery-machine.jpg" :alt="copy.roasteryAlt" />
      </section>

      <section id="origin" class="origin-section">
        <div class="origin-copy"><h2>{{ copy.forestTitle }}</h2><p>{{ copy.forestCopy }}</p></div>
        <img src="/images/story/origin-coffee-farm.jpg" :alt="copy.originAlt" />
        <blockquote>“ {{ copy.quote }}</blockquote>
      </section>

      <section class="cooperative">
        <div><h2>{{ copy.partnerTitle }}</h2><p>{{ copy.partnerCopy }}</p></div>
        <img src="/images/story/small-batch-roast.jpg" :alt="copy.roastAlt" />
        <div class="coop-card">
          <small>{{ copy.ethiopia }}</small><h2>Kenissa Cooperative</h2><p>{{ copy.coopCopy }}</p>
          <dl><dt>{{ copy.location }}</dt><dd>Limú, Ethiopia</dd><dt>{{ copy.altitude }}</dt><dd>2,080 m</dd><dt>{{ copy.farmers }}</dt><dd>290</dd><dt>{{ copy.harvest }}</dt><dd>October–January</dd><dt>{{ copy.varieties }}</dt><dd>Local landrace</dd></dl>
        </div>
      </section>

      <section class="roasting-section two-column">
        <div><h2>{{ copy.roastedTitle }}</h2><p>{{ copy.roastedCopy }}</p><router-link to="/story">{{ copy.moreRoastery }} →</router-link></div>
        <img src="/images/story/roastery-machine.jpg" :alt="copy.roasteryAlt" />
      </section>

      <section id="brew" class="brew-section">
        <div class="brew-heading"><small>{{ copy.easy }}</small><h2>THIS IS<br />HOW WE<br />BREW IT</h2></div>
        <div class="brew-copy"><h3>{{ copy.pourOver }}</h3><p>{{ copy.brewCopy }}</p><dl><dt>{{ copy.weight }}</dt><dd>32 g</dd><dt>{{ copy.grindLabel }}</dt><dd>{{ copy.medium }}</dd><dt>{{ copy.water }}</dt><dd>500 ml</dd><dt>{{ copy.temp }}</dt><dd>96 °C</dd><dt>{{ copy.duration }}</dt><dd>3–4 min</dd></dl></div>
      </section>

      <section id="related" class="related-section">
        <h2>{{ copy.related }}</h2>
        <div class="product-cards">
          <router-link v-for="item in relatedProducts" :key="item.id" :to="`/products/${item.handle}`" class="product-card">
            <div><img v-if="item.images.edges[0]" :src="item.images.edges[0].node.url" :alt="item.images.edges[0].node.altText || item.title" /></div>
            <small>{{ item.productType || copy.coffee }}</small><h3>{{ localizedProductTitle(item) }}</h3><b>{{ formatMoney(item.variants.edges[0]?.node.price) }}</b>
          </router-link>
        </div>
      </section>

      <section class="special-section">
        <h2>{{ copy.special }}</h2>
        <div><span>✿</span><p>{{ copy.direct }}</p></div><div><span>♨</span><p>{{ copy.fresh }}</p></div><div><span>♡</span><p>{{ copy.invest }}</p></div>
      </section>

      <section id="reviews" class="reviews-section">
        <h2>{{ copy.bigReviewCount }}</h2><div class="big-stars">★★★★★</div>
        <div class="reviews-grid"><article><h3>{{ copy.reviewTitle1 }}</h3><div>★★★★★</div><p>{{ copy.reviewBody1 }}</p><b>Yu-Ting</b></article><article><h3>{{ copy.reviewTitle2 }}</h3><div>★★★★★</div><p>{{ copy.reviewBody2 }}</p><b>Wei-Lun</b></article></div>
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
import { setLocale } from '../i18n'
import { useShopify } from '../composables/useShopify'
import { useCart } from '../composables/useCart'

const text = {
  'zh-TW': {
    menu:'選單', search:'搜尋', cart:'購物車', product:'商品選購', originStory:'產地故事', brew:'沖煮指南', related:'你可能也喜歡', coffee:'咖啡', filterCoffee:'精品咖啡', loading:'正在讀取 Shopify 商品…', size:'容量', grind:'研磨方式', beans:'原豆', ground:'研磨', fallbackTitle:'衣索比亞 Limú 單品咖啡', reviewCount:'1599 則顧客評論', intro:'這款咖啡來自衣索比亞西部 Limú 高地。它帶著柔和果香、可可甜感與乾淨尾韻，是每天都喝不膩的平衡風味。', oneTime:'單次購買', subscribe:'定期訂購・省更多', soon:'即將推出', add:'加入購物車', soldOut:'暫時售罄', delivery:'滿 NT$1,500 享免運，實際運費與到貨時間以 Shopify 結帳頁為準。', glance:'咖啡風味一覽', taste:'風味', tasteValue:'均衡、葡萄、黑巧克力', roast:'烘焙程度', medium:'中焙', strength:'醇厚度', balanced:'均衡', acidity:'酸質', gentle:'柔和', origin:'產地', ethiopia:'衣索比亞', species:'品種', processing:'處理法', washed:'水洗', different:'我們有什麼不同？', directCopy:'小批次烘焙、持續杯測，讓每一批風味都清楚而穩定。', shipping:'配送資訊', reliableTitle:'每天都值得信賴的咖啡', reliableCopy:'像一位熟悉的朋友，Limú 有著平順、微甜又帶巧克力氣息的個性。不論手沖或咖啡機，都能輕鬆得到舒服、耐喝的一杯。', prepTitle:'沖煮建議', prepCopy:'手沖、法式濾壓或美式咖啡機都很適合。單喝能感受乾淨果香，加入少量牛奶則會帶出更圓潤的可可甜感。', forestTitle:'來自衣索比亞森林花園的咖啡', forestCopy:'Limú 生長在海拔超過 2,000 公尺的林蔭咖啡園。天然植被與緩慢熟成的果實，造就細緻香氣與明亮、舒服的酸質。', quote:'無論怎麼沖，Limú 都是一款可靠、毫不費力，每天都令人期待的咖啡。', partnerTitle:'攜手產地，讓好咖啡持續發生', partnerCopy:'我們相信長期合作比一次交易更有價值。透過透明採購與品質回饋，支持產地改善處理設備，也讓農民能因優良品質獲得更好的報酬。', coopCopy:'Kenissa 合作社位於衣索比亞西南方 Limú 地區，約 300 個家庭在森林樹蔭下以友善方式種植咖啡。我們透過長期合作，一起改善處理與品質。', location:'地點', altitude:'海拔', farmers:'農戶', harvest:'採收期', varieties:'品種', roastedTitle:'每天新鮮、溫柔烘焙', roastedCopy:'精準曲線與小批次杯測，讓每一款豆子的產地個性被完整保留。每一批都經過香氣、甜感與尾韻的品質檢查。', moreRoastery:'了解我們的烘豆方式', easy:'簡單沖出好咖啡', pourOver:'手沖配方', brewCopy:'這款咖啡適合多種器材。以下提供平衡、甜感清楚的基礎配方，你可以依喜好微調研磨與水溫。', weight:'咖啡粉', grindLabel:'研磨', water:'注水量', temp:'水溫', duration:'時間', special:'我們的三個堅持', direct:'直接與產地建立長期合作', fresh:'每日新鮮、小批次烘焙', invest:'以實際行動回饋咖啡產地', bigReviewCount:'1417 則顧客評論', reviewTitle1:'平衡又順口', reviewBody1:'香氣清楚，放涼後仍然甜，日常手沖非常穩定。', reviewTitle2:'溫柔而有層次', reviewBody2:'酸質很舒服，可可尾韻讓整杯非常耐喝。', questions:'需要協助嗎？', payment:'訂單與付款', returns:'退換貨說明', mission:'我們的使命', missionCopy:'用穩定烘焙與長期產地合作，讓一杯好咖啡同時照顧風味、土地與人的生活。', footerCopy:'源頭、工藝、穩定——把值得信賴的咖啡帶進每一天。', roastingAlt:'新鮮烘焙的咖啡豆', roasteryAlt:'Trinity 烘豆工作空間', originAlt:'咖啡農在林蔭咖啡園採收果實', roastAlt:'小批次咖啡烘焙'
  },
  en: {
    menu:'Menu', search:'Search', cart:'Cart', product:'Product', originStory:'Origin story', brew:'Brew guide', related:'You may also like', coffee:'Coffee', filterCoffee:'Specialty Coffee', loading:'Loading Shopify products…', size:'Size', grind:'Grind size', beans:'Whole beans', ground:'Ground', fallbackTitle:'Classic Balance Blend Coffee Beans', reviewCount:'1599 customer reviews', intro:'Grown in the highlands of western Ethiopia, this coffee is balanced and clean with soft fruit, cocoa sweetness, and a lingering finish.', oneTime:'One-time purchase', subscribe:'Subscribe & save', soon:'Coming soon', add:'Add to cart', soldOut:'Sold out', delivery:'Free shipping over NT$1,500. Final rates and delivery times are shown at Shopify checkout.', glance:'Coffee at a glance', taste:'Taste', tasteValue:'Balanced, grape, dark chocolate', roast:'Roast degree', medium:'Medium', strength:'Strength', balanced:'Balanced', acidity:'Acidity', gentle:'Gentle', origin:'Origin', ethiopia:'Ethiopia', species:'Species', processing:'Processing', washed:'Washed', different:'What are we doing differently?', directCopy:'Small-batch roasting and continual cupping keep every lot clear and consistent.', shipping:'Shipping', reliableTitle:'A reliable all-rounder for every day', reliableCopy:'Like a good friend, Limú is smooth, gently fruity and subtly chocolatey. Whether brewed by hand or machine, it makes an easy, comforting cup.', prepTitle:'Tips for preparation', prepCopy:'Use a pour over, French press, or filter machine. Enjoy it black for its clean fruit character, or add a little milk to bring forward rounded cocoa sweetness.', forestTitle:'Coffee from the forest gardens of Ethiopia', forestCopy:'Limú grows in shaded forest gardens above 2,000 metres. Natural vegetation and slowly ripening cherries create fine aromatics and a bright, pleasant acidity.', quote:'However you brew it, Limú is a reliable, uncomplicated coffee that delights every day.', partnerTitle:'Working together for better coffee', partnerCopy:'We believe long-term relationships matter more than a single transaction. Transparent sourcing and quality feedback help improve processing and reward farmers for excellent coffee.', coopCopy:'The Kenissa Cooperative is located in the Limú region of southwestern Ethiopia. Around 300 families grow coffee sustainably beneath forest shade, improving quality together over the long term.', location:'Location', altitude:'Altitude', farmers:'Farmers', harvest:'Harvest', varieties:'Varieties', roastedTitle:'Freshly and gently roasted every day', roastedCopy:'Precise profiles and small-batch cupping preserve the character of each origin. Every lot is checked for aroma, sweetness, and finish.', moreRoastery:'More about our roastery', easy:'Preparation made easy', pourOver:'Pour over', brewCopy:'This coffee works beautifully across brewing methods. Start with this balanced, sweet recipe, then adjust grind and temperature to taste.', weight:'Weight', grindLabel:'Grind', water:'Water', temp:'Temperature', duration:'Duration', special:'What makes us special?', direct:'Long-term, direct origin partnerships', fresh:'Freshly roasted in small batches', invest:'Meaningful investment in coffee regions', bigReviewCount:'1417 customer reviews', reviewTitle1:'Balanced and smooth', reviewBody1:'Clear aroma, sweet as it cools, and very dependable for daily pour over.', reviewTitle2:'Gentle and layered', reviewBody2:'Pleasant acidity and a cocoa finish make this exceptionally easy to drink.', questions:'Do you have questions?', payment:'Order & payment', returns:'Returns', mission:'This is our mission', missionCopy:'Through consistent roasting and lasting origin partnerships, we make coffee better for flavour, land, and livelihoods.', footerCopy:'Source, craft, consistency — dependable coffee for every day.', roastingAlt:'Freshly roasted coffee beans', roasteryAlt:'Trinity coffee roastery', originAlt:'Coffee farmer harvesting cherries in a shaded coffee garden', roastAlt:'Small-batch coffee roasting'
  }
}

const { locale } = useI18n()
const copy = computed(() => text[locale.value] || text['zh-TW'])
const { products, loading: shopLoading, error: shopError, fetchAllProducts } = useShopify()
const { totalQuantity, loading: cartLoading, isOpen, addLine, loadCart } = useCart()
const menuOpen = ref(false)
const quantity = ref(1)
const grind = ref('beans')
const selectedVariantId = ref('')
const galleryIndex = ref(0)
const mainProduct = computed(() => products.value[0] || null)
const variants = computed(() => mainProduct.value?.variants?.edges.map(({ node }) => node) || [])
const selectedVariant = computed(() => variants.value.find((item) => item.id === selectedVariantId.value) || variants.value[0])
const productImages = computed(() => mainProduct.value?.images?.edges.map(({ node }) => node) || [])
const heroImage = computed(() => productImages.value[galleryIndex.value] || productImages.value[0])
const relatedProducts = computed(() => products.value.slice(1, 5))
const formattedPrice = computed(() => formatMoney(selectedVariant.value?.price))
const displayedMainTitle = computed(() => localizedProductTitle(mainProduct.value, copy.value.fallbackTitle))

const englishTitleFallbacks = {
  '經典平衡綜合咖啡豆': 'Classic Balance Blend Coffee Beans',
  '單品濾掛咖啡（深林綠）': 'Single-Origin Drip Coffee — Forest Green',
  '單品濾掛咖啡（深海藍）': 'Single-Origin Drip Coffee — Deep Sea Blue',
}

watch(mainProduct, () => { selectedVariantId.value = variants.value[0]?.id || ''; galleryIndex.value = 0 })
watch(locale, () => fetchAllProducts())

function formatMoney(price) {
  if (!price) return '—'
  return new Intl.NumberFormat(locale.value === 'zh-TW' ? 'zh-TW' : 'en-US', { style:'currency', currency:price.currencyCode, maximumFractionDigits:0 }).format(Number(price.amount))
}
function localizedProductTitle(item, fallback = 'Trinity Specialty Coffee') {
  const title = item?.title?.trim()
  if (!title) return fallback
  if (locale.value !== 'en' || !/[\u3400-\u9fff]/u.test(title)) return title
  if (englishTitleFallbacks[title]) return englishTitleFallbacks[title]

  const readableHandle = item?.handle
    ?.split('-')
    .filter((part) => /^[a-z0-9]+$/i.test(part))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  return readableHandle || fallback
}
function toggleLocale() { setLocale(locale.value === 'zh-TW' ? 'en' : 'zh-TW') }
function scrollTo(id) { menuOpen.value = false; document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }
async function addToCart() { if (selectedVariant.value?.availableForSale) await addLine(selectedVariant.value.id, quantity.value) }

onMounted(() => { fetchAllProducts(); loadCart() })
</script>

<style scoped>
.np-page{--green:#0d4f3c;--sage:#dce4bd;--blue:#0767bd;--ink:#101410;background:#fff;color:var(--ink);font-family:Inter,"Noto Sans TC",Arial,sans-serif;font-size:16px;line-height:1.55}.np-header{position:sticky;top:0;z-index:40;height:72px;padding:0 clamp(16px,4vw,50px);display:grid;grid-template-columns:44px 44px 1fr auto 44px;align-items:center;background:var(--green);color:#fff}.icon-button,.lang-button{display:grid;place-items:center;width:42px;height:42px;border:0;background:transparent;color:inherit}.icon-button svg,.add-button svg{width:24px;fill:none;stroke:currentColor;stroke-width:1.8}.np-search{grid-column:2}.np-brand{grid-column:3;justify-self:center;display:flex;align-items:center;gap:9px;color:#fff;text-decoration:none}.np-brand img{width:24px;height:34px;object-fit:contain;filter:brightness(0) invert(1)}.np-brand span{display:flex;flex-direction:column;font-size:10px;line-height:.95;letter-spacing:.1em}.lang-button{grid-column:4;font-weight:800}.cart-button{grid-column:5;position:relative}.cart-button span{position:absolute;right:-1px;top:2px;display:grid;place-items:center;min-width:18px;height:18px;padding:0 4px;border-radius:12px;background:#f4a000;color:#173b2f;font-size:11px;font-weight:800}.np-menu{position:fixed;inset:72px 0 auto;z-index:35;display:flex;justify-content:center;gap:42px;padding:22px;background:#fff;border-bottom:1px solid #d9ded9;box-shadow:0 12px 30px #0002}.np-menu button{border:0;background:none;font-weight:750}.menu-enter-active,.menu-leave-active{transition:.25s}.menu-enter-from,.menu-leave-to{transform:translateY(-15px);opacity:0}.breadcrumb{max-width:1240px;margin:auto;padding:14px clamp(16px,4vw,50px);display:flex;gap:10px;font-size:13px}.breadcrumb a{color:inherit}.product-section{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(390px,.92fr);max-width:1400px;margin:auto}.product-gallery{position:sticky;top:72px;height:calc(100vh - 72px);min-height:620px;display:grid;place-items:center;background:var(--sage);overflow:hidden}.product-gallery>img:not(.fallback-logo){width:min(70%,620px);height:75%;object-fit:contain}.product-gallery .fallback-logo{width:150px}.product-placeholder{font-weight:700;color:#315344}.gallery-dots{position:absolute;bottom:28px;display:flex;gap:8px}.gallery-dots button{width:9px;height:9px;padding:0;border:0;border-radius:50%;background:#9da399}.gallery-dots .active{width:26px;border-radius:8px;background:var(--green)}.purchase-panel{padding:clamp(35px,5vw,72px)}.purchase-panel h1{font-family:Georgia,"Noto Serif TC",serif;font-size:clamp(38px,4vw,62px);line-height:1.05;margin:32px 0 8px}.option-group{margin-bottom:22px}.option-group>strong{display:block;margin-bottom:8px}.choice-row{display:flex;flex-wrap:wrap;gap:8px}.choice-row button{min-width:110px;padding:12px 18px;border:2px solid var(--blue);background:#fff;color:#075ba8;font-weight:750}.choice-row button.selected{background:var(--blue);color:#fff}.rating{display:flex;gap:10px;align-items:center;font-size:13px}.rating span,.big-stars,.reviews-grid article>div{color:#f4a000;letter-spacing:1px}.rating a{color:inherit}.lead{font-size:18px;margin:24px 0 34px}.purchase-types{border:1px solid #bcc7d0;border-radius:3px}.purchase-types label{display:flex;align-items:center;gap:14px;padding:17px;border-bottom:1px solid #bcc7d0;font-weight:700}.purchase-types label:last-child{border:0}.purchase-types input{width:19px;height:19px;accent-color:var(--blue)}.purchase-types small{padding:3px 7px;border-radius:12px;background:#e7eee9;color:#527060}.purchase-types .disabled{color:#777}.cart-line{display:flex;align-items:center;justify-content:space-between;margin-top:24px}.cart-line>strong{font-size:25px}.stepper{display:flex;border:1px solid #bbc7d0}.stepper>*{display:grid;place-items:center;width:45px;height:42px}.stepper button{border:0;background:#fff;font-size:20px}.stepper span{border-inline:1px solid #bbc7d0}.add-button{width:100%;margin-top:10px;padding:14px;display:flex;justify-content:center;align-items:center;gap:10px;border:0;background:var(--blue);color:#fff;font-size:16px;font-weight:800}.add-button:disabled{opacity:.55}.spinner{width:18px;height:18px;border:2px solid #fff7;border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.delivery{font-size:13px;color:#535353}.error{color:#a71919}.purchase-panel details{border-top:1px solid #c5ced5;padding:18px 8px}.purchase-panel details:last-child{border-bottom:1px solid #c5ced5}.purchase-panel summary{cursor:pointer;font-weight:800}.purchase-panel details p{font-size:14px}.specs dl,.coop-card dl,.brew-copy dl{display:grid;grid-template-columns:125px 1fr;gap:14px;margin-top:28px}.specs dt,.coop-card dt{font-weight:800}.specs dd{margin:0;display:flex;align-items:center;gap:15px}.specs i{position:relative;width:100px;height:6px;background:#e3c0bd;border-radius:4px}.specs i:before{content:"";display:block;width:var(--value);height:100%;border-radius:4px;background:#ff9700}.icon-grid{padding:70px clamp(20px,5vw,80px);display:grid;grid-template-columns:repeat(4,1fr);gap:40px;background:var(--sage)}.icon-grid article{text-align:center}.icon-grid span{display:block;font-size:42px}.icon-grid small{display:block;letter-spacing:.12em;text-transform:uppercase}.icon-grid b{display:block;margin-top:7px}.two-column{display:grid;grid-template-columns:1fr 1fr;align-items:stretch}.story-block>img,.roasting-section>img{width:100%;height:100%;min-height:530px;object-fit:cover}.story-copy,.roasting-section>div{padding:clamp(50px,8vw,120px)}h2{font-size:clamp(28px,3vw,44px);line-height:1.12;margin:0 0 22px}p{font-size:17px}.reverse .story-copy{order:2}.origin-section{display:grid;grid-template-columns:1fr 1fr}.origin-copy{padding:clamp(50px,7vw,110px)}.origin-section>img{width:100%;height:620px;object-fit:cover}.origin-section blockquote{grid-column:1/-1;margin:0;padding:50px clamp(30px,10vw,160px);background:var(--sage);font-size:clamp(22px,3vw,36px);font-weight:800}.cooperative{display:grid;grid-template-columns:1fr 1fr}.cooperative>div:first-child{padding:clamp(50px,7vw,110px)}.cooperative>img{width:100%;height:100%;min-height:570px;object-fit:cover}.coop-card{grid-column:1/-1;padding:clamp(50px,10vw,140px);max-width:950px;margin:auto}.coop-card>small{color:var(--blue);font-size:18px;font-weight:800}.coop-card dl{max-width:520px}.coop-card dd{margin:0}.roasting-section a{display:inline-block;margin-top:20px;padding:12px 18px;border:2px solid var(--blue);color:var(--blue);font-weight:800;text-decoration:none}.brew-section{padding:clamp(55px,8vw,110px);display:grid;grid-template-columns:.9fr 1.1fr;gap:10vw;background:var(--blue);color:#fff}.brew-heading small{font-size:22px;font-weight:800}.brew-heading h2{font-size:clamp(58px,8vw,110px);line-height:.88;margin-top:20px}.brew-copy{align-self:end}.brew-copy h3{font-size:32px}.brew-copy dl{grid-template-columns:1fr 1fr}.brew-copy dd{margin:0;text-align:right;font-weight:800;border-bottom:1px solid #fff}.related-section,.reviews-section{padding:clamp(55px,7vw,100px)}.product-cards{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(260px,1fr);gap:18px;overflow-x:auto;padding-bottom:15px}.product-card{color:inherit;text-decoration:none}.product-card>div{height:350px;background:#f0dcc4}.product-card img{width:100%;height:100%;object-fit:contain}.product-card small{display:block;margin-top:12px;color:var(--blue);font-weight:800}.product-card h3{margin:3px 0}.special-section{padding:clamp(55px,8vw,110px);background:var(--sage)}.special-section>div{display:grid;grid-template-columns:70px 1fr;align-items:center;max-width:700px;margin:25px 0}.special-section span{font-size:40px}.special-section p{margin:0}.reviews-section{text-align:center}.big-stars{font-size:34px}.reviews-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;max-width:950px;margin:35px auto 0;text-align:left}.reviews-grid article{padding:28px;border:1px solid #bbc7d0}.reviews-grid h3{font-size:22px}.np-footer{padding:clamp(55px,8vw,110px);display:grid;grid-template-columns:repeat(3,1fr);gap:8vw;background:var(--green);color:#fff}.np-footer h2{font-size:24px}.np-footer a{display:block;width:max-content;margin:14px 0;color:inherit;text-decoration:underline}.np-footer p{font-size:14px;max-width:390px}
@media(max-width:800px){.np-page{font-size:15px}.np-header{height:58px;display:flex;padding:0 10px}.np-header .icon-button,.lang-button{width:36px;height:36px;flex:none}.np-brand{position:absolute;left:50%;transform:translateX(-50%)}.lang-button{position:absolute;right:47px}.cart-button{position:absolute;right:9px}.np-brand img{width:18px;height:27px}.np-brand span{font-size:8px}.np-menu{inset:58px 0 auto;display:grid;gap:15px;text-align:left}.breadcrumb{padding:11px 16px}.product-section{display:block}.product-gallery{position:relative;top:auto;height:368px;min-height:0}.product-gallery>img:not(.fallback-logo){width:76%;height:78%}.gallery-dots{bottom:14px}.purchase-panel{padding:25px 15px 35px}.purchase-panel h1{font-size:35px;margin-top:25px}.lead{font-size:16px}.specs dl{grid-template-columns:105px 1fr}.icon-grid{grid-template-columns:1fr 1fr;padding:45px 20px;gap:40px 20px}.two-column,.origin-section,.cooperative,.brew-section{display:flex;flex-direction:column}.story-copy,.origin-copy,.roasting-section>div,.cooperative>div:first-child,.coop-card{padding:45px 15px}.story-block>img,.roasting-section>img,.origin-section>img,.cooperative>img{min-height:0;height:390px}.reverse .story-copy{order:0}.origin-section blockquote{padding:40px 20px}.coop-card{grid-column:auto}.brew-section{padding:50px 15px}.brew-heading h2{font-size:55px}.brew-copy dl{grid-template-columns:1fr 1fr}.related-section,.reviews-section{padding:50px 15px}.product-cards{grid-auto-columns:78%}.product-card>div{height:300px}.reviews-grid{grid-template-columns:1fr}.np-footer{grid-template-columns:1fr;padding:50px 20px}.np-search{display:none}}
</style>
