<template>
  <div class="product-info-page">
    <header class="tool-header">
      <router-link to="/" aria-label="回到 Trinity Coffee Roaster 首頁">
        <img src="/logo.png" alt="" />
        <span><b>TRINITY</b><b>COFFEE</b><b>ROASTER</b></span>
      </router-link>
      <strong>img2qrcode</strong>
    </header>
    <section class="hero">
      <div class="hero-orb hero-orb-one" />
      <div class="hero-orb hero-orb-two" />
      <div class="hero-inner">
        <p class="eyebrow">IMAGE TO QR CODE</p>
        <h1>img2qrcode</h1>
        <p class="hero-copy">
          {{ savedItem ? '掃描 QR Code 或複製連結，即可回到這張商品圖片。' : '選擇一張商品照片，我們會建立目前網域下的專屬網址與 QR Code。' }}
        </p>
      </div>
    </section>

    <main class="content-shell">
      <section v-if="!savedItem" class="creator-card">
        <details class="admin-settings" :open="!hasStoredConfig">
          <summary>
            <span>
              <i :class="{ ready: hasStoredConfig }">{{ hasStoredConfig ? '✓' : '!' }}</i>
              GitHub 圖片儲存設定
            </span>
            <small>{{ hasStoredConfig ? '已儲存在此瀏覽器' : '首次使用請先設定' }}</small>
          </summary>
          <div class="settings-body">
            <div class="settings-grid">
              <label>
                <span>Repo 擁有者</span>
                <input v-model.trim="github.owner" type="text" autocomplete="off" placeholder="例如：your-name" />
              </label>
              <label>
                <span>Repo 名稱</span>
                <input v-model.trim="github.repo" type="text" autocomplete="off" placeholder="例如：product-images" />
              </label>
              <label>
                <span>Branch</span>
                <input v-model.trim="github.branch" type="text" autocomplete="off" placeholder="main" />
              </label>
              <label>
                <span>圖片資料夾</span>
                <input v-model.trim="github.folder" type="text" autocomplete="off" placeholder="uploads" />
              </label>
              <label class="token-field">
                <span>Fine-grained PAT</span>
                <div>
                  <input v-model.trim="github.token" :type="showToken ? 'text' : 'password'" autocomplete="off" placeholder="github_pat_..." />
                  <button type="button" @click="showToken = !showToken">{{ showToken ? '隱藏' : '顯示' }}</button>
                </div>
              </label>
            </div>
            <p class="settings-help">
              Token 僅儲存在這台裝置的瀏覽器。請限制為單一公開 Repo，並只開啟
              <b>Contents: Read and write</b>。
              <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">建立 Fine-grained PAT ↗</a>
            </p>
            <div class="settings-actions">
              <button v-if="hasStoredConfig" type="button" class="forget-button" @click="forgetSettings">清除本機設定</button>
              <button type="button" class="save-settings-button" @click="saveSettings">儲存設定</button>
            </div>
            <p v-if="settingsMessage" class="settings-message" :class="{ error: settingsError }">{{ settingsMessage }}</p>
          </div>
        </details>

        <div
          class="drop-zone"
          :class="{ 'is-dragging': isDragging, 'has-preview': previewUrl }"
          @dragenter.prevent="isDragging = true"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <input
            id="product-image"
            ref="fileInput"
            class="file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            @change="handleFileChange"
          />

          <template v-if="previewUrl">
            <img class="preview-image" :src="previewUrl" alt="準備上傳的商品圖片預覽" />
            <div class="preview-actions">
              <button type="button" class="small-button" @click.stop="openFilePicker">更換圖片</button>
              <button type="button" class="small-button danger" @click.stop="clearSelection">移除</button>
            </div>
          </template>

          <label v-else for="product-image" class="upload-prompt">
            <span class="upload-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 13v6h14v-6" /></svg>
            </span>
            <strong>拖曳照片至此，或點擊選擇</strong>
            <span>支援 JPG、PNG、WebP，檔案上限 10 MB</span>
          </label>
        </div>

        <div v-if="selectedFile" class="file-row">
          <span class="file-check" aria-hidden="true">✓</span>
          <div>
            <strong>{{ selectedFile.name }}</strong>
            <span>{{ formatBytes(selectedFile.size) }}</span>
          </div>
        </div>

        <p v-if="errorMessage" class="message error-message" role="alert">{{ errorMessage }}</p>
        <button class="primary-button" type="button" :disabled="!selectedFile || isGenerating" @click="generateLink">
          <span v-if="isGenerating" class="button-spinner" />
          {{ isGenerating ? '正在建立…' : '產生網址與 QR Code' }}
        </button>
        <p class="privacy-note">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V8a5 5 0 0110 0v2m-11 0h12v10H6V10z" /></svg>
          圖片將壓縮後 commit 至指定的公開 GitHub Repo；分享網址不包含 Token。
        </p>
      </section>

      <section v-else class="result-card">
        <div class="image-panel">
          <div class="image-frame">
            <img :src="savedItem.image" :alt="savedItem.name || '商品圖片'" />
          </div>
          <div class="image-meta">
            <span class="success-badge"><i /> 已成功建立</span>
            <h2>{{ savedItem.name || '商品圖片' }}</h2>
            <p>{{ formattedDate }}<template v-if="savedItem.repository"> · {{ savedItem.repository }}</template></p>
          </div>
        </div>

        <div class="share-panel">
          <div class="share-heading">
            <span class="share-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8.5 15.5l7-7m-5.5-2l1.2-1.2a4 4 0 015.6 5.6L15.5 12m-7 0L7.2 13.3a4 4 0 005.6 5.6l1.2-1.2" /></svg>
            </span>
            <div><p>SHARE LINK</p><h2>分享圖片頁面</h2></div>
          </div>

          <div class="url-field">
            <span>{{ shareUrl }}</span>
            <button type="button" :aria-label="copyLabel" @click="copyUrl">
              <svg v-if="!copied" viewBox="0 0 24 24"><rect x="8" y="8" width="11" height="11" rx="1"/><path d="M16 8V5H5v11h3"/></svg>
              <svg v-else viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>
            </button>
          </div>
          <button class="copy-button" type="button" @click="copyUrl">{{ copied ? '已複製網址' : '複製網址' }}</button>

          <div class="divider"><span>或使用 QR Code</span></div>

          <div class="qr-wrap">
            <div class="qr-frame">
              <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="商品圖片直連網址 QR Code" />
              <span v-else class="qr-loading">產生中…</span>
            </div>
            <p>使用手機相機掃描，直接開啟原始圖片</p>
          </div>

          <button class="secondary-button" type="button" @click="createAnother">
            <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
            建立另一張圖片
          </button>
        </div>
      </section>

      <p v-if="missingItem" class="missing-message">此圖片不存在於目前瀏覽器，請回到建立頁重新上傳。</p>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QRCode from 'qrcode'

const STORAGE_PREFIX = 'trinity-product-info:'
const CONFIG_STORAGE_KEY = 'trinity-product-info:github-config'
const PAGE_TITLE = 'img2qrcode | Trinity Coffee Roaster'
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const route = useRoute()
const router = useRouter()
const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref('')
const savedItem = ref(null)
const itemId = ref('')
const remoteSource = ref('')
const isDragging = ref(false)
const isGenerating = ref(false)
const copied = ref(false)
const errorMessage = ref('')
const missingItem = ref(false)
const showToken = ref(false)
const settingsMessage = ref('')
const settingsError = ref(false)
const hasStoredConfig = ref(false)
const qrCodeUrl = ref('')
const github = reactive({ owner: '', repo: '', branch: 'main', folder: 'uploads', token: '' })

const configReady = computed(() => Boolean(
  github.owner && github.repo && github.branch && github.folder && github.token,
))

const shareUrl = computed(() => {
  let query
  if (remoteSource.value && savedItem.value) {
    query = {
      src: remoteSource.value,
      name: savedItem.value.name,
      ts: savedItem.value.createdAt,
      repo: savedItem.value.repository,
    }
  } else if (itemId.value) {
    query = { id: itemId.value }
  } else {
    return ''
  }
  const routeUrl = router.resolve({ name: 'ProductInfo', query }).href
  return new URL(routeUrl, window.location.href).href
})

const formattedDate = computed(() => {
  if (!savedItem.value?.createdAt) return ''
  const date = new Date(savedItem.value.createdAt)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(date)
})

const copyLabel = computed(() => copied.value ? '網址已複製' : '複製網址')

let qrGeneration = 0
watch(remoteSource, async (url) => {
  const generation = ++qrGeneration
  if (!url) {
    qrCodeUrl.value = ''
    return
  }
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: 280,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#263b38', light: '#ffffff' },
    })
    if (generation === qrGeneration) qrCodeUrl.value = dataUrl
  } catch {
    if (generation === qrGeneration) qrCodeUrl.value = ''
  }
}, { immediate: true })

function openFilePicker() {
  fileInput.value?.click()
}

function handleFileChange(event) {
  selectFile(event.target.files?.[0])
}

function handleDrop(event) {
  isDragging.value = false
  selectFile(event.dataTransfer.files?.[0])
}

function selectFile(file) {
  errorMessage.value = ''
  if (!file) return
  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMessage.value = '請選擇 JPG、PNG 或 WebP 圖片。'
    return
  }
  if (file.size > MAX_FILE_SIZE) {
    errorMessage.value = '圖片大小不可超過 10 MB。'
    return
  }
  revokePreview()
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

function clearSelection() {
  revokePreview()
  selectedFile.value = null
  errorMessage.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

function revokePreview() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = ''
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

async function compressImage(file) {
  const source = await loadImageSource(file)
  const maxEdge = 1600
  const scale = Math.min(1, maxEdge / Math.max(source.width, source.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(source.width * scale))
  canvas.height = Math.max(1, Math.round(source.height * scale))
  canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height)
  source.close?.()
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('無法壓縮圖片')),
      'image/jpeg',
      0.82,
    )
  })
}

async function loadImageSource(file) {
  if ('createImageBitmap' in window) return createImageBitmap(file)
  const objectUrl = URL.createObjectURL(file)
  try {
    const image = new Image()
    image.src = objectUrl
    await image.decode()
    return image
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

async function generateLink() {
  if (!selectedFile.value || isGenerating.value) return
  if (!validateSettings()) {
    errorMessage.value = '請先完成上方的 GitHub 圖片儲存設定。'
    return
  }
  isGenerating.value = true
  errorMessage.value = ''
  try {
    persistSettings()
    await assertPublicRepository()
    const imageBlob = await compressImage(selectedFile.value)
    const imageBase64 = await blobToBase64(imageBlob)
    const randomPart = crypto.randomUUID?.().slice(0, 8) || Math.random().toString(36).slice(2, 10)
    const originalBase = selectedFile.value.name.replace(/\.[^.]+$/, '')
    const safeBase = originalBase.normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 55) || 'product'
    const filename = `${Date.now().toString(36)}-${randomPart}-${safeBase}.jpg`
    const path = `${cleanFolder(github.folder)}/${filename}`
    await uploadToGitHub(path, imageBase64)
    const imageUrl = githubImageUrl(path)
    const item = {
      image: imageUrl,
      name: selectedFile.value.name,
      createdAt: new Date().toISOString(),
      repository: `${github.owner}/${github.repo}`,
    }
    remoteSource.value = imageUrl
    savedItem.value = item
    revokePreview()
    await router.replace({
      name: 'ProductInfo',
      query: { src: imageUrl, name: item.name, ts: item.createdAt, repo: item.repository },
    })
  } catch (error) {
    errorMessage.value = error?.message || '圖片上傳失敗，請稍後再試一次。'
  } finally {
    isGenerating.value = false
  }
}

function cleanFolder(value) {
  return value.trim().replace(/^\/+|\/+$/g, '').replace(/\/{2,}/g, '/')
}

function validateSettings() {
  settingsMessage.value = ''
  settingsError.value = false
  if (!configReady.value) return false
  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(github.owner)) {
    settingsMessage.value = 'Repo 擁有者格式不正確。'
    settingsError.value = true
    return false
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(github.repo)) {
    settingsMessage.value = 'Repo 名稱格式不正確。'
    settingsError.value = true
    return false
  }
  if (github.branch.includes('/') || !/^[a-zA-Z0-9._-]+$/.test(github.branch)) {
    settingsMessage.value = 'Branch 請使用不含斜線的名稱，例如 main。'
    settingsError.value = true
    return false
  }
  const folder = cleanFolder(github.folder)
  if (!folder || folder.split('/').some((part) => !part || part === '.' || part === '..')) {
    settingsMessage.value = '圖片資料夾格式不正確。'
    settingsError.value = true
    return false
  }
  if (!github.token.startsWith('github_pat_')) {
    settingsMessage.value = '請使用以 github_pat_ 開頭的 Fine-grained PAT。'
    settingsError.value = true
    return false
  }
  github.folder = folder
  return true
}

function persistSettings() {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({ ...github }))
  hasStoredConfig.value = true
}

function saveSettings() {
  if (!validateSettings()) {
    if (!settingsMessage.value) settingsMessage.value = '請填寫所有 GitHub 設定欄位。'
    settingsError.value = true
    return
  }
  persistSettings()
  settingsError.value = false
  settingsMessage.value = '設定已儲存在此瀏覽器。'
}

function forgetSettings() {
  localStorage.removeItem(CONFIG_STORAGE_KEY)
  Object.assign(github, { owner: '', repo: '', branch: 'main', folder: 'uploads', token: '' })
  hasStoredConfig.value = false
  showToken.value = false
  settingsError.value = false
  settingsMessage.value = '本機 GitHub 設定已清除。'
}

function githubHeaders() {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${github.token}`,
    'X-GitHub-Api-Version': '2026-03-10',
  }
}

async function assertPublicRepository() {
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(github.owner)}/${encodeURIComponent(github.repo)}`
  const response = await fetch(endpoint, { headers: githubHeaders() })
  const result = await parseGitHubResponse(response)
  if (result.private) throw new Error('指定的 Repo 是私人 Repo；請改用公開 Repo，顧客才能讀取圖片。')
}

async function uploadToGitHub(path, content) {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/')
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(github.owner)}/${encodeURIComponent(github.repo)}/contents/${encodedPath}`
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: { ...githubHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Add product image ${path.split('/').pop()}`,
      content,
      branch: github.branch,
    }),
  })
  return parseGitHubResponse(response)
}

function githubImageUrl(path) {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/')
  return `https://github.com/${encodeURIComponent(github.owner)}/${encodeURIComponent(github.repo)}/blob/${encodeURIComponent(github.branch)}/${encodedPath}?raw=true`
}

async function parseGitHubResponse(response) {
  let result = {}
  try { result = await response.json() } catch { /* GitHub may return an empty error response. */ }
  if (response.ok) return result
  if (response.status === 401) throw new Error('GitHub Token 無效或已過期。')
  if (response.status === 403) throw new Error('Token 沒有此 Repo 的 Contents 寫入權限，或已達 GitHub API 限制。')
  if (response.status === 404) throw new Error('找不到 Repo 或 Branch，請檢查名稱與 Token 授權範圍。')
  if (response.status === 409) throw new Error('GitHub 寫入衝突，請稍後再試一次。')
  throw new Error(result.message ? `GitHub：${result.message}` : `GitHub 上傳失敗（${response.status}）。`)
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = () => reject(new Error('無法讀取壓縮後的圖片。'))
    reader.readAsDataURL(blob)
  })
}

async function copyUrl() {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
  } catch {
    const input = document.createElement('textarea')
    input.value = shareUrl.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
  }
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 2200)
}

async function createAnother() {
  savedItem.value = null
  itemId.value = ''
  remoteSource.value = ''
  missingItem.value = false
  selectedFile.value = null
  await router.replace({ name: 'ProductInfo' })
}

onMounted(() => {
  document.title = PAGE_TITLE
  try {
    const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY)
    if (storedConfig) {
      Object.assign(github, JSON.parse(storedConfig))
      hasStoredConfig.value = true
    }
  } catch {
    localStorage.removeItem(CONFIG_STORAGE_KEY)
  }

  const source = typeof route.query.src === 'string' ? route.query.src : ''
  if (source) {
    try {
      const sourceUrl = new URL(source)
      const isLegacyRawUrl = sourceUrl.hostname === 'raw.githubusercontent.com'
      const isGitHubRawView = sourceUrl.hostname === 'github.com'
        && sourceUrl.pathname.includes('/blob/')
        && sourceUrl.searchParams.get('raw') === 'true'
      if (sourceUrl.protocol !== 'https:' || (!isLegacyRawUrl && !isGitHubRawView)) throw new Error()
      remoteSource.value = sourceUrl.href
      savedItem.value = {
        image: sourceUrl.href,
        name: typeof route.query.name === 'string' ? route.query.name : '商品圖片',
        createdAt: typeof route.query.ts === 'string' ? route.query.ts : '',
        repository: typeof route.query.repo === 'string' ? route.query.repo : '',
      }
      return
    } catch {
      missingItem.value = true
      return
    }
  }

  const id = typeof route.query.id === 'string' ? route.query.id : ''
  if (!id) return
  itemId.value = id
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${id}`)
    if (stored) savedItem.value = JSON.parse(stored)
    else missingItem.value = true
  } catch {
    missingItem.value = true
  }
})

onBeforeUnmount(() => {
  revokePreview()
  document.title = 'Trinity Coffee Roaster 官方網站'
})
</script>

<style scoped>
.product-info-page{min-height:72vh;background:#f5f2ed;color:#46413d;font-family:Inter,"Noto Sans TC",sans-serif}.hero{position:relative;overflow:hidden;background:#dce9e5;padding:70px 24px 112px;text-align:center}.hero-inner{position:relative;z-index:1;max-width:720px;margin:auto}.eyebrow{margin:0 0 17px;color:#5e8983;font-size:11px;font-weight:700;letter-spacing:.34em}.hero h1{margin:0;font-family:"Noto Sans TC",sans-serif;font-size:clamp(34px,5vw,56px);font-weight:300;letter-spacing:.06em;color:#3d4b49}.hero-copy{max-width:600px;margin:20px auto 0;color:#65716f;font-size:15px;line-height:1.9}.hero-orb{position:absolute;border-radius:50%;border:1px solid #fff8}.hero-orb-one{width:280px;height:280px;left:-70px;top:-110px}.hero-orb-two{width:380px;height:380px;right:-110px;bottom:-250px}.content-shell{position:relative;z-index:2;width:min(1020px,calc(100% - 32px));margin:-62px auto 0;padding-bottom:90px}.creator-card,.result-card{background:#fff;border:1px solid #e3ddd6;box-shadow:0 20px 55px #5d514516}.creator-card{max-width:760px;margin:auto;padding:clamp(22px,5vw,54px)}.admin-settings{margin-bottom:22px;border:1px solid #dbe3e0;background:#f8faf9}.admin-settings summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;cursor:pointer;list-style:none}.admin-settings summary::-webkit-details-marker{display:none}.admin-settings summary>span{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600}.admin-settings summary i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#f3dedb;color:#a7554e;font-style:normal;font-size:11px}.admin-settings summary i.ready{background:#dcece4;color:#56806b}.admin-settings summary small{color:#908a84;font-size:10px}.settings-body{padding:18px;border-top:1px solid #e3e8e6}.settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.settings-grid label>span{display:block;margin-bottom:7px;color:#6d6863;font-size:10px;font-weight:700;letter-spacing:.07em}.settings-grid input{width:100%;height:42px;border:1px solid #ddd7d0;background:#fff;padding:0 12px;color:#46413d;font:inherit;font-size:12px;outline:none}.settings-grid input:focus{border-color:#6b9a9b;box-shadow:0 0 0 2px #6b9a9b20}.token-field{grid-column:1/-1}.token-field>div{display:flex}.token-field input{min-width:0;flex:1}.token-field button{width:60px;border:1px solid #ddd7d0;border-left:0;background:#f4f1ed;color:#6d6863;font-size:10px}.settings-help{margin:14px 0 0;color:#817c77;font-size:10px;line-height:1.7}.settings-help b{color:#56514d}.settings-help a{margin-left:4px;color:#527f79;text-decoration:underline}.settings-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:15px}.save-settings-button,.forget-button{min-height:37px;padding:0 15px;font-size:10px;font-weight:600}.save-settings-button{border:0;background:#6b9a9b;color:#fff}.forget-button{border:1px solid #d9d2cb;background:#fff;color:#9b5d58}.settings-message{margin:10px 0 0;text-align:right;color:#56806b;font-size:10px}.settings-message.error{color:#a7554e}.drop-zone{min-height:360px;border:1.5px dashed #b9c9c5;background:#fafbf9;display:grid;place-items:center;position:relative;overflow:hidden;transition:.25s}.drop-zone.is-dragging{border-color:#6b9a9b;background:#eef6f4;transform:scale(1.005)}.drop-zone.has-preview{border-style:solid;background:#eee}.file-input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}.upload-prompt{width:100%;height:100%;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;text-align:center;padding:30px}.upload-icon{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:#e3efec;color:#608b85;margin-bottom:22px}.upload-icon svg{width:31px;fill:none;stroke:currentColor;stroke-width:1.4}.upload-prompt strong{font-size:17px;font-weight:500;color:#4c5553}.upload-prompt>span:last-child{margin-top:11px;color:#999;font-size:12px}.preview-image{width:100%;height:410px;object-fit:contain;background:#f3f1ee}.preview-actions{position:absolute;right:14px;bottom:14px;display:flex;gap:8px}.small-button{border:0;background:#fff;padding:10px 15px;color:#4e5a58;font-size:12px;box-shadow:0 3px 15px #0002}.small-button.danger{color:#a05c55}.file-row{display:flex;align-items:center;gap:12px;margin:18px 0 0;padding:13px 16px;background:#f7f9f7}.file-check{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#719c86;color:white;font-size:13px}.file-row div{display:flex;min-width:0;flex:1;justify-content:space-between;gap:20px}.file-row strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:500}.file-row span:last-child{flex:none;color:#999;font-size:11px}.primary-button,.copy-button,.secondary-button{border:0;cursor:pointer;transition:.2s}.primary-button{width:100%;min-height:54px;margin-top:24px;background:#6b9a9b;color:#fff;font-size:13px;font-weight:700;letter-spacing:.12em}.primary-button:hover:not(:disabled){background:#577f80}.primary-button:disabled{cursor:not-allowed;opacity:.42}.button-spinner{display:inline-block;width:15px;height:15px;margin-right:8px;border:2px solid #fff7;border-top-color:#fff;border-radius:50%;vertical-align:-3px;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.privacy-note{display:flex;justify-content:center;align-items:center;gap:7px;margin:18px 0 0;color:#9a9690;font-size:11px}.privacy-note svg{width:15px;fill:none;stroke:currentColor;stroke-width:1.5}.message{margin:15px 0 0;font-size:12px}.error-message{color:#ad5148}.result-card{display:grid;grid-template-columns:minmax(0,1.13fr) minmax(350px,.87fr)}.image-panel{padding:clamp(24px,5vw,54px);background:#faf9f7}.image-frame{height:490px;background:#eeeae5;display:grid;place-items:center;overflow:hidden}.image-frame img{width:100%;height:100%;object-fit:contain}.image-meta{padding-top:23px}.success-badge{display:inline-flex;align-items:center;gap:7px;color:#638776;font-size:11px;font-weight:600;letter-spacing:.08em}.success-badge i{width:7px;height:7px;border-radius:50%;background:#6fa184;box-shadow:0 0 0 4px #dcebe2}.image-meta h2{overflow-wrap:anywhere;margin:13px 0 4px;font-size:18px;font-weight:500}.image-meta p{margin:0;color:#aaa29b;font-size:11px}.share-panel{padding:clamp(28px,5vw,54px);display:flex;flex-direction:column;justify-content:center}.share-heading{display:flex;align-items:center;gap:15px;margin-bottom:26px}.share-icon{width:48px;height:48px;display:grid;place-items:center;border-radius:50%;background:#e7f0ee;color:#638e88}.share-icon svg{width:23px;fill:none;stroke:currentColor;stroke-width:1.5}.share-heading p{margin:0 0 4px;color:#76a09b;font-size:9px;font-weight:700;letter-spacing:.23em}.share-heading h2{margin:0;font-size:21px;font-weight:400;letter-spacing:.04em}.url-field{height:49px;display:flex;align-items:center;border:1px solid #dfd9d3;background:#faf9f7}.url-field span{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:14px;color:#827d78;font-size:11px}.url-field button{width:48px;height:100%;display:grid;place-items:center;border:0;border-left:1px solid #e5dfd9;background:transparent;color:#6b9a9b}.url-field svg{width:19px;fill:none;stroke:currentColor;stroke-width:1.7}.copy-button{height:48px;margin-top:10px;background:#6b9a9b;color:#fff;font-size:12px;font-weight:700;letter-spacing:.12em}.copy-button:hover{background:#577f80}.divider{display:flex;align-items:center;gap:12px;margin:29px 0 20px;color:#aaa39c;font-size:10px}.divider:before,.divider:after{content:"";height:1px;background:#e8e3de;flex:1}.qr-wrap{text-align:center}.qr-frame{width:190px;height:190px;margin:auto;padding:8px;border:1px solid #e2ddd7;background:white;display:grid;place-items:center}.qr-frame img{width:100%;height:100%;display:block}.qr-loading{color:#aaa39c;font-size:10px}.qr-wrap p{margin:10px 0 0;color:#aaa39c;font-size:10px}.secondary-button{display:flex;align-items:center;justify-content:center;gap:8px;height:48px;margin-top:28px;border:1px solid #b9c7c4;background:white;color:#63837f;font-size:11px;font-weight:600;letter-spacing:.08em}.secondary-button:hover{background:#f4f8f7}.secondary-button svg{width:16px;fill:none;stroke:currentColor;stroke-width:1.7}.missing-message{max-width:760px;margin:18px auto 0;padding:16px;background:#fff4e8;border:1px solid #eedbc8;text-align:center;color:#895e40;font-size:12px}
.product-info-page,.product-info-page *{box-sizing:border-box}.product-info-page{width:100%;max-width:100%;overflow-x:hidden}.tool-header{height:68px;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e6e0da;background:#fff}.tool-header>a{display:flex;align-items:center;gap:8px;color:#4b4642;text-decoration:none}.tool-header img{width:22px;height:32px;object-fit:contain}.tool-header a span{display:flex;flex-direction:column;font-size:8px;line-height:.92;letter-spacing:.08em}.tool-header>strong{color:#6b9a9b;font-size:12px;font-weight:600;letter-spacing:.12em}.content-shell,.creator-card,.result-card,.image-panel,.share-panel{min-width:0;max-width:100%}
@media(max-width:760px){.tool-header{height:58px;padding:0 14px}.tool-header img{width:18px;height:27px}.tool-header>strong{font-size:10px}.hero{padding:34px 16px 70px}.hero h1{font-size:38px}.eyebrow{margin-bottom:10px;font-size:9px}.hero-copy{width:100%;margin-top:12px;padding:0 4px;font-size:13px;line-height:1.65;overflow-wrap:anywhere}.content-shell{width:calc(100% - 24px);margin-top:-36px;padding-bottom:50px}.creator-card{width:100%;padding:14px}.settings-grid{grid-template-columns:minmax(0,1fr)}.token-field{grid-column:auto}.admin-settings summary{padding:13px}.admin-settings summary small{display:none}.settings-body{padding:14px}.settings-actions{justify-content:stretch}.settings-actions button{min-width:0;flex:1}.drop-zone,.upload-prompt{min-height:260px}.upload-prompt{padding:20px}.preview-image{height:280px}.result-card{width:100%;display:flex;flex-direction:column}.share-panel{order:1;width:100%;padding:26px 18px 30px}.image-panel{order:2;width:100%;padding:16px}.image-frame{width:100%;height:auto;aspect-ratio:1/1}.url-field{width:100%;min-width:0}.url-field span{min-width:0}.privacy-note{text-align:center}.file-row div{display:block}.file-row span:last-child{display:block;margin-top:3px}.qr-frame{width:min(180px,70vw);height:min(180px,70vw)}.image-meta h2{font-size:16px}.secondary-button{margin-top:22px}}
</style>
