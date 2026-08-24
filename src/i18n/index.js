import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zhTW from './locales/zh-TW'

const supportedLocales = ['zh-TW', 'en']
const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language.toLowerCase().startsWith('zh') ? 'zh-TW' : 'en'
const initialLocale = supportedLocales.includes(savedLocale) ? savedLocale : browserLocale

document.documentElement.lang = initialLocale === 'zh-TW' ? 'zh-Hant-TW' : 'en'
document.title = initialLocale === 'zh-TW'
  ? 'Trinity Coffee Roaster 官方網站'
  : 'Trinity Coffee Roaster Official Website'

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'zh-TW',
  messages: { 'zh-TW': zhTW, en },
})

export function setLocale(locale) {
  if (!supportedLocales.includes(locale)) return
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant-TW' : 'en'
  document.title = locale === 'zh-TW'
    ? 'Trinity Coffee Roaster 官方網站'
    : 'Trinity Coffee Roaster Official Website'
}
