const WHATSAPP_NUMBER = "XXXXXXXXXXX";

const i18n = {
  ar: {
    "header.order": "اطلب الآن",
    "hero.discount": "🔥 خصم 20% اليوم فقط",
    "hero.title": "زد متابعينك وخلّي حسابك ينفجر 🔥",
    "hero.subtitle": "Solley يقدم تجربة سريعة وسهلة لرفع التفاعل على حساباتك في TikTok وInstagram وFacebook.",
    "hero.cta": "ابدأ الآن",
    "services.title": "الخدمات",
    "services.price": "السعر: ❓",
    "common.followers": "متابعين",
    "common.likes": "لايكات",
    "common.views": "مشاهدات",
    "common.engagement": "تفاعل",
    "why.title": "لماذا نحن",
    "why.fast": "سرعة في التنفيذ ⚡",
    "why.quality": "جودة عالية 🔥",
    "why.support": "دعم 24/7 💬",
    "how.title": "كيف يعمل الموقع",
    "how.step1": "اختر الخدمة",
    "how.step2": "اضغط طلب",
    "how.step3": "تواصل معنا عبر واتساب",
    "testimonials.title": "آراء العملاء",
    "testimonials.q1": '"خدمة رائعة!"',
    "testimonials.q2": '"وصلني الطلب بسرعة"',
    "faq.title": "أسئلة شائعة",
    "faq.q1": "هل الخدمة آمنة؟",
    "faq.a1": "نعم، نراعي الجودة والخصوصية في تنفيذ جميع الطلبات.",
    "faq.q2": "كم مدة التنفيذ؟",
    "faq.a2": "غالبًا يبدأ التنفيذ بسرعة حسب نوع الخدمة وحجم الطلب.",
    "faq.q3": "هل يمكن استرجاع المال؟",
    "faq.a3": "يمكن مناقشة الاسترجاع حسب حالة الطلب قبل بدء التنفيذ.",
    "trust.g1": "خدمة مضمونة 100%",
    "trust.g2": "تسليم سريع",
    "trust.g3": "دعم متواصل"
  },
  en: {
    "header.order": "Order Now",
    "hero.discount": "🔥 20% off today only",
    "hero.title": "Boost your social media instantly 🚀",
    "hero.subtitle": "Solley gives you a fast, simple way to improve engagement on TikTok, Instagram, and Facebook.",
    "hero.cta": "Start Now",
    "services.title": "Services",
    "services.price": "Price: ❓",
    "common.followers": "Followers",
    "common.likes": "Likes",
    "common.views": "Views",
    "common.engagement": "Engagement",
    "why.title": "Why Us",
    "why.fast": "Fast delivery ⚡",
    "why.quality": "High quality 🔥",
    "why.support": "24/7 support 💬",
    "how.title": "How It Works",
    "how.step1": "Choose a service",
    "how.step2": "Click order",
    "how.step3": "Chat with us on WhatsApp",
    "testimonials.title": "Testimonials",
    "testimonials.q1": '"Amazing service!"',
    "testimonials.q2": '"My order arrived very fast"',
    "faq.title": "FAQ",
    "faq.q1": "Is the service safe?",
    "faq.a1": "Yes, we focus on quality and privacy in all orders.",
    "faq.q2": "How long does delivery take?",
    "faq.a2": "Delivery usually starts quickly depending on service type and quantity.",
    "faq.q3": "Can I get a refund?",
    "faq.a3": "Refunds can be discussed based on order status before execution starts.",
    "trust.g1": "100% guaranteed service",
    "trust.g2": "Fast delivery",
    "trust.g3": "Continuous support"
  }
};

const serviceLabels = {
  ar: {
    followers: "متابعين",
    likes: "لايكات",
    views: "مشاهدات",
    engagement: "تفاعل"
  },
  en: {
    followers: "followers",
    likes: "likes",
    views: "views",
    engagement: "engagement"
  }
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
}

langToggleBtn.addEventListener("click", () => {
  applyLanguage(currentLang === "ar" ? "en" : "ar");
});

function buildWhatsappMessage(platform, serviceKey) {
  if (currentLang === "ar") {
    return `أريد ${serviceLabels.ar[serviceKey]} ${platform}`;
  }
  return `I want ${platform} ${serviceLabels.en[serviceKey]}`;
}

function openWhatsappOrder(platform, serviceKey) {
  const text = encodeURIComponent(buildWhatsappMessage(platform, serviceKey));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".wa-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { platform, service } = button.dataset;
    openWhatsappOrder(platform, service);
  });
});

applyLanguage("ar");
