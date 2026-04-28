const WHATSAPP_NUMBER = "213556282560";

const pricingPer1000 = {
  Instagram: { followers: 500, likes: 200, views: 100 },
  Facebook: { followers: 300, likes: 100 },
  TikTok: { followers: 750, likes: 300, views: 100 }
};

function getDiscountRate(quantity) {
  if (quantity >= 20000) return 0.25;
  if (quantity >= 10000) return 0.2;
  if (quantity >= 5000) return 0.1;
  if (quantity >= 2000) return 0.05;
  return 0;
}

const i18n = {
  ar: {
    "header.order": "اطلب الآن",
    "hero.discount": "🔥 خصم يبدأ من 5% عند 2000 ويصل حتى 25%",
    "hero.title": "اختَر المنصة والخدمة والعدد واطلب فورًا",
    "hero.subtitle": "عند الضغط على الطلب، يتم فتح واتساب مباشرة مع رسالة جاهزة فيها تفاصيل الطلب والسعر.",
    "hero.cta": "ابدأ الآن",
    "services.title": "اختر الخدمة",
    "services.subtitle": "منصة واضحة + سعر مباشر + طلب سريع عبر واتساب.",
    "form.service": "نوع الخدمة",
    "form.quantity": "العدد (يمكن أي رقم)",
    "form.price": "السعر بعد التخفيض",
    "common.followers": "متابعين",
    "common.likes": "إعجابات",
    "common.views": "مشاهدات",
    "why.title": "لماذا Solley؟",
    "why.fast": "تنفيذ سريع خلال وقت قصير ⚡",
    "why.support": "دعم مباشر على واتساب 24/7 💬",
    "why.safe": "تعامل واضح وأسعار شفافة 🔒",
    "how.title": "كيف يعمل الطلب",
    "how.step1": "اختر المنصة (TikTok / Instagram / Facebook)",
    "how.step2": "اختر نوع الخدمة والعدد",
    "how.step3": "اضغط \"اطلب الآن\" لفتح واتساب برسالة جاهزة",
    "trust.g1": "خدمة مضمونة 100%",
    "trust.g2": "تسليم سريع",
    "trust.g3": "دعم متواصل",
    "faq.title": "أسئلة سريعة",
    "faq.q1": "كيف أطلب؟",
    "faq.a1": "اختر المنصة والخدمة والعدد ثم اضغط اطلب الآن.",
    "faq.q2": "هل السعر يظهر قبل الإرسال؟",
    "faq.a2": "نعم، يظهر السعر قبل الخصم وبعد الخصم مباشرة.",
    "faq.q3": "أين يصل الطلب؟",
    "faq.a3": "يفتح واتساب تلقائيًا على رقم الخدمة مع رسالة جاهزة."
  },
  en: {
    "header.order": "Order Now",
    "hero.discount": "🔥 Discount starts at 5% for 2000 and goes up to 25%",
    "hero.title": "Choose platform, service, and quantity — then order instantly",
    "hero.subtitle": "When you click order, WhatsApp opens with a ready message including the full order details and price.",
    "hero.cta": "Start Now",
    "services.title": "Choose Your Service",
    "services.subtitle": "Clear platform + instant pricing + fast WhatsApp order.",
    "form.service": "Service Type",
    "form.quantity": "Quantity (any number)",
    "form.price": "Price after discount",
    "common.followers": "Followers",
    "common.likes": "Likes",
    "common.views": "Views",
    "why.title": "Why Solley?",
    "why.fast": "Fast execution in a short time ⚡",
    "why.support": "Direct WhatsApp support 24/7 💬",
    "why.safe": "Transparent process and clear pricing 🔒",
    "how.title": "How Ordering Works",
    "how.step1": "Choose a platform (TikTok / Instagram / Facebook)",
    "how.step2": "Choose service type and quantity",
    "how.step3": "Click \"Order Now\" to open WhatsApp with a ready message",
    "trust.g1": "100% guaranteed service",
    "trust.g2": "Fast delivery",
    "trust.g3": "Continuous support",
    "faq.title": "Quick FAQ",
    "faq.q1": "How do I order?",
    "faq.a1": "Choose platform, service, and quantity, then click Order Now.",
    "faq.q2": "Can I see the final price before sending?",
    "faq.a2": "Yes, both before-discount and after-discount prices are shown instantly.",
    "faq.q3": "Where is the request sent?",
    "faq.a3": "WhatsApp opens automatically with a ready-to-send message."
  }
};

const serviceLabels = {
  ar: { followers: "متابعين", likes: "إعجابات", views: "مشاهدات" },
  en: { followers: "followers", likes: "likes", views: "views" }
};

let currentLang = "ar";
const langToggleBtn = document.getElementById("langToggle");

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  langToggleBtn.textContent = lang === "ar" ? "EN" : "AR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (i18n[lang][key]) {
      element.textContent = i18n[lang][key];
    }
  });

  document.querySelectorAll(".order-card").forEach((card) => updatePrice(card));
}

function sanitizeQuantity(rawValue) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  if (parsed > 1000000) return 1000000;
  return Math.round(parsed);
}

function formatPrice(price) {
  return currentLang === "ar" ? `${price} DA` : `${price} DZD`;
}

function calculateTotal(platform, serviceKey, quantity) {
  const pricePer1000 = pricingPer1000[platform]?.[serviceKey] ?? 0;
  const basePrice = (quantity * pricePer1000) / 1000;
  const discountRate = getDiscountRate(quantity);
  const discountAmount = Math.round(basePrice * discountRate);
  const finalPrice = Math.round(basePrice - discountAmount);

  return {
    pricePer1000,
    basePrice: Math.round(basePrice),
    discountRate,
    discountAmount: Math.round(discountAmount),
    finalPrice
  };
}

function updateSummary(card, platform, serviceKey, quantity, totals) {
  const summary = card.querySelector(".order-summary");
  const serviceLabel = serviceLabels[currentLang][serviceKey] || serviceKey;
  const discountPercent = Math.round(totals.discountRate * 100);

  summary.textContent =
    currentLang === "ar"
      ? `الملخص: ${platform} | ${serviceLabel} | العدد: ${quantity} | قبل الخصم: ${totals.basePrice} DA | الخصم: ${discountPercent}% | النهائي: ${totals.finalPrice} DA`
      : `Summary: ${platform} | ${serviceLabel} | Qty: ${quantity} | Before: ${totals.basePrice} DZD | Discount: ${discountPercent}% | Final: ${totals.finalPrice} DZD`;
}

function updatePrice(card) {
  const platform = card.dataset.platform;
  const serviceKey = card.querySelector(".service-type").value;
  const qtyInput = card.querySelector(".quantity-input");
  const priceValue = card.querySelector(".price-value");
  const discountLine = card.querySelector(".discount-line");

  const quantity = sanitizeQuantity(qtyInput.value);
  qtyInput.value = String(quantity);

  card.querySelectorAll(".quick-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.qty === String(quantity));
  });

  const totals = calculateTotal(platform, serviceKey, quantity);
  priceValue.textContent = formatPrice(totals.finalPrice);

  if (totals.discountRate > 0) {
    const pct = Math.round(totals.discountRate * 100);
    discountLine.textContent =
      currentLang === "ar"
        ? `قبل الخصم: ${totals.basePrice} DA | خصم ${pct}% = ${totals.discountAmount} DA`
        : `Before discount: ${totals.basePrice} DZD | ${pct}% off = ${totals.discountAmount} DZD`;
  } else {
    discountLine.textContent =
      currentLang === "ar"
        ? "الخصم: 2000+ (5%)، 5000+ (10%)، 10000+ (20%)، 20000+ (25%)"
        : "Discount tiers: 2000+ (5%), 5000+ (10%), 10000+ (20%), 20000+ (25%)";
  }

  updateSummary(card, platform, serviceKey, quantity, totals);
}

function buildWhatsappMessage(platform, serviceKey, quantity, totals) {
  const serviceAr = serviceLabels.ar[serviceKey];
  const serviceEn = serviceLabels.en[serviceKey];
  const pct = Math.round(totals.discountRate * 100);

  if (currentLang === "ar") {
    return `السلام عليكم\nالمنصة: ${platform}\nالخدمة: ${serviceAr}\nالعدد: ${quantity}\nالسعر قبل الخصم: ${totals.basePrice} DA\nالخصم: ${pct}%\nالسعر النهائي: ${totals.finalPrice} DA`;
  }

  return `Hello\nPlatform: ${platform}\nService: ${serviceEn}\nQuantity: ${quantity}\nPrice before discount: ${totals.basePrice} DZD\nDiscount: ${pct}%\nFinal price: ${totals.finalPrice} DZD`;
}

function openWhatsappOrder(card) {
  const platform = card.dataset.platform;
  const serviceKey = card.querySelector(".service-type").value;
  const quantity = sanitizeQuantity(card.querySelector(".quantity-input").value);
  const totals = calculateTotal(platform, serviceKey, quantity);
  const text = encodeURIComponent(buildWhatsappMessage(platform, serviceKey, quantity, totals));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".order-card").forEach((card) => {
  const qtyInput = card.querySelector(".quantity-input");
  const serviceSelect = card.querySelector(".service-type");

  qtyInput.addEventListener("input", () => updatePrice(card));
  qtyInput.addEventListener("blur", () => updatePrice(card));
  serviceSelect.addEventListener("change", () => updatePrice(card));

  card.querySelectorAll(".quick-btn").forEach((button) => {
    button.addEventListener("click", () => {
      qtyInput.value = button.dataset.qty;
      updatePrice(card);
    });
  });

  card.querySelector(".order-submit").addEventListener("click", () => {
    updatePrice(card);
    openWhatsappOrder(card);
  });

  updatePrice(card);
});

langToggleBtn.addEventListener("click", () => {
  applyLanguage(currentLang === "ar" ? "en" : "ar");
});

applyLanguage("ar");
