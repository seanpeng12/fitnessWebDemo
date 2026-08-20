<template>
  <div class="min-h-screen bg-[#F7F5F2] py-20 sm:py-28">
    <div class="mx-auto max-w-5xl px-6 lg:px-12">
      <header class="mb-14 border-b border-[#DCD5CE] pb-10">
        <p class="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">Shopping Guide</p>
        <h1 class="text-3xl font-light tracking-wide text-bb-text sm:text-4xl">購物須知</h1>
        <p class="mt-5 max-w-2xl text-sm font-light leading-7 text-gray-500">
          為了讓訂購與收貨流程更順利，請在結帳前閱讀以下說明。送出訂單即表示您已確認商品內容、收件資料與結帳頁所列費用。
        </p>
      </header>

      <div class="space-y-8">
        <section class="guide-card">
          <h2 class="guide-title"><span>01</span>訂購流程</h2>
          <ol class="guide-list list-decimal">
            <li>將商品加入購物車後，請再次核對品項、規格、數量及收件人資訊。</li>
            <li>完成結帳後，系統會依您填寫的聯絡方式提供訂單資訊。</li>
            <li>若訂單資料需要調整，請在商品進入出貨作業前儘早與我們聯繫。</li>
          </ol>
        </section>

        <section class="guide-card">
          <h2 class="guide-title"><span>02</span>付款方式</h2>
          <p class="guide-copy">
            線上付款選項依結帳頁當下顯示為準。選擇銀行轉帳時，請匯入下列帳戶；完成後請保留交易明細，以便必要時協助核對。
          </p>

          <div class="mt-7 overflow-hidden border border-[#D8CEC5] bg-white">
            <div class="border-b border-[#E8E3DE] bg-[#F1ECE7] px-6 py-4">
              <h3 class="text-xs font-semibold tracking-[0.2em] text-bb-text">銀行匯款資料</h3>
            </div>
            <dl class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 px-6 py-6 text-sm">
              <dt class="text-gray-400">銀行</dt>
              <dd class="font-medium text-bb-text">玉山銀行汐止分行</dd>
              <dt class="text-gray-400">銀行代碼</dt>
              <dd class="font-medium text-bb-text">808</dd>
              <dt class="text-gray-400">帳號</dt>
              <dd class="font-mono text-base font-semibold tracking-wider text-[#8A4B25]">1230-940-028604</dd>
              <dt class="text-gray-400">戶名</dt>
              <dd class="font-medium text-bb-text">奧多伴有限公司籌備處</dd>
            </dl>
          </div>

          <div class="mt-5 border-l-2 border-bb-blue bg-[#EEF5F5] px-5 py-4 text-xs leading-6 text-gray-600">
            匯款完成後，請提供訂單編號、匯款日期及帳號末五碼，以利對帳。款項確認後才會接續處理訂單。請勿依陌生來電指示操作 ATM 或網路銀行。
          </div>
        </section>

        <section class="guide-card">
          <h2 class="guide-title"><span>03</span>配送與出貨</h2>
          <ul class="guide-list list-disc">
            <li>可使用的配送方式、運費與適用地區，以 Shopify 結帳頁呈現內容為準。</li>
            <li>商品會在付款及訂單資料確認後安排備貨；實際出貨時間可能因訂單量、例假日或商品製作狀況調整。</li>
            <li>物流送達時間可能受天候、交通、離島轉運或物流業者作業影響，恕無法保證指定日期抵達。</li>
            <li>請務必填寫可正常聯繫的電話與完整地址，避免配送延誤或退件。</li>
          </ul>
        </section>

        <section class="guide-card">
          <h2 class="guide-title"><span>04</span>收貨檢查與退換貨</h2>
          <ul class="guide-list list-disc">
            <li>收到包裹後請儘快核對內容。如有品項錯誤、短缺或運送造成的明顯破損，請保留商品、包材與外箱並拍照紀錄。</li>
            <li>申請退換貨前，請維持商品、附件、贈品與包裝完整；非檢查所必要的使用或毀損，可能影響退換貨權益。</li>
            <li>退換貨依消費者保護法及相關規範辦理。若食品屬易於腐敗、保存期限較短或客製化商品，且已於購買前明確告知，可能不適用七日解除權。</li>
            <li>如對商品狀態有疑問，建議先停止拆封或使用並儘快聯繫客服，以利確認後續處理方式。</li>
          </ul>
        </section>

        <section class="border border-[#D8CEC5] bg-[#2F2925] px-7 py-8 text-white sm:px-10">
          <h2 class="text-sm font-semibold tracking-[0.25em]">其他提醒</h2>
          <p class="mt-4 text-xs font-light leading-6 text-white/70">
            商品價格、優惠、庫存、配送限制及付款選項若有調整，以結帳當下顯示資訊為準。本頁如有更新，將直接公布於網站，不另行個別通知。
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.guide-card {
  border: 1px solid #ded7d0;
  background: #fff;
  padding: 2rem 1.5rem;
}

.guide-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  color: #5a5450;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.14em;
}

.guide-title span {
  color: #6b9a9b;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
}

.guide-copy,
.guide-list {
  color: #666;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.9;
}

.guide-list {
  padding-left: 1.25rem;
}

.guide-list li + li {
  margin-top: 0.65rem;
}

@media (min-width: 640px) {
  .guide-card {
    padding: 2.5rem;
  }
}
</style>
