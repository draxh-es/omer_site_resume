// Türkçe metinler doğrudan HTML'de durur; burada yalnızca İngilizce karşılıkları var.
// Yeni bir metin eklerken: HTML'deki öğeye data-i18n="anahtar" ver, buraya da İngilizcesini ekle.
const EN = {
  // Ortak
  "skip": "Skip to content",
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.music": "Music",
  "nav.contact": "Contact",
  "nav.menu": "Open menu",
  "footer.made": "Hand-coded with plenty of color.",

  // Sayfa başlıkları
  "title.home": "Ömer Faruk Bıyıklı — Games, music & design",
  "title.projects": "Projects — Ömer Faruk Bıyıklı",
  "title.music": "Music — Ömer Faruk Bıyıklı",
  "title.contact": "Contact — Ömer Faruk Bıyıklı",

  // Ana sayfa
  "hero.hi": "Hi, I'm",
  "hero.tagline": "A maker who tinkers with games, music and digital experiences — always curious about how things work.",
  "hero.cta1": "See my work",
  "hero.cta2": "Say hello",
  "hero.sticker": "Games · Music · Design",
  "about.eyebrow": "About me",
  "about.title": "Curious, playful, always building.",
  "about.p1": "Former hobbyist game developer with interests spanning creative technology, interactive experiences and digital media.",
  "about.p2": "I'm interested in understanding how things work, exploring creative possibilities, and thinking about how products, systems and experiences could be designed better.",
  "about.p3": "My interests span interactive entertainment, digital tools, education, music, and practical problems in everyday life.",
  "skills.title": "My toolbox",
  "skills.gamedesign": "Game design",
  "skills.video": "Video editing",
  "skills.sound": "Sound design",
  "skills.graphic": "Graphic design",
  "skills.music": "Music production",
  "interests.eyebrow": "What I'm into",
  "interests.title": "Things that keep me up at night (in a good way).",
  "interests.games.title": "Games",
  "interests.games.text": "Game design and development — mechanics, feel, and the little moments that make you smile.",
  "interests.web.title": "Web & apps",
  "interests.web.text": "Web design and product ideas: tools that are useful and a joy to use.",
  "interests.music.title": "Music",
  "interests.music.text": "Production, piano, melody writing, beatmaking and singing.",
  "interests.ideas.title": "Ideas",
  "interests.ideas.text": "Business ideas and ways to make education better.",
  "interests.note": "These are personal interests and areas of exploration, not necessarily completed projects or professional expertise.",
  "marquee.1": "Game design",
  "marquee.2": "Software",
  "marquee.3": "Web & app ideas",
  "marquee.4": "Music",
  "marquee.5": "Creative experiments",
  "marquee.6": "Problem-solving",
  "marquee.7": "Education",
  "marquee.8": "Sustainability",
  "marquee.9": "Technology",
  "cta.title": "Shall we make something together?",
  "cta.text": "Got an idea, a project, or just want to chat? I'd love to hear from you.",
  "cta.button": "Get in touch",

  // Projeler
  "projects.eyebrow": "Work",
  "projects.title": "Projects",
  "projects.lead": "Games, designs and code — the things I've made live on these platforms.",
  "projects.platforms": "Where to find my work",
  "projects.itch.title": "Games",
  "projects.itch.text": "My games and game experiments — playable right in the browser or downloadable.",
  "projects.behance.title": "Design",
  "projects.behance.text": "Graphic design and visual work.",
  "projects.github.title": "Code",
  "projects.github.text": "Software projects and experiments.",
  "projects.featured": "Featured",
  "projects.soon.title": "More coming soon",
  "projects.soon.text": "Hand-picked projects with stories behind them will show up here.",

  // Müzik
  "music.eyebrow": "Sound",
  "music.title": "Music",
  "music.lead": "Producing, playing piano, writing melodies, making beats and singing — music is where I unwind and experiment.",
  "music.what": "What I do",
  "music.production.title": "Production",
  "music.production.text": "Building tracks from scratch, layer by layer.",
  "music.piano.title": "Piano",
  "music.piano.text": "Where most ideas begin.",
  "music.melody.title": "Melody",
  "music.melody.text": "Chasing the tune that gets stuck in your head.",
  "music.beats.title": "Beatmaking",
  "music.beats.text": "Drums, grooves and rhythm.",
  "music.vocals.title": "Vocals",
  "music.vocals.text": "Singing and vocal ideas.",
  "music.sound.title": "Sound design",
  "music.sound.text": "Sounds for games and videos.",
  "music.listen": "Listen",
  "music.soon.title": "Tracks coming soon",
  "music.soon.text": "My songs will be playable right here.",

  // İletişim
  "contact.eyebrow": "Contact",
  "contact.title": "Say hello",
  "contact.lead": "Got an idea, a project, or just want to chat? Find me on any of these.",
  "contact.github": "Code & projects",
  "contact.behance": "Design portfolio",
  "contact.itch": "Games",
};

const LANG_KEY = "lang";
const original = new Map();
const originalTitle = document.title;

function storedLang() {
  try {
    return localStorage.getItem(LANG_KEY);
  } catch {
    return null;
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Depolama kapalıysa dil sadece bu sayfada geçerli kalır.
  }
}

function applyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (!original.has(el)) original.set(el, el.textContent);
    const key = el.dataset.i18n;
    el.textContent = lang === "en" && EN[key] ? EN[key] : original.get(el);
  });

  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const attr = "aria-label";
    if (!el.dataset.labelTr) el.dataset.labelTr = el.getAttribute(attr) || "";
    const key = el.dataset.i18nLabel;
    el.setAttribute(attr, lang === "en" && EN[key] ? EN[key] : el.dataset.labelTr);
  });

  const titleKey = `title.${document.body.dataset.page}`;
  document.title = lang === "en" && EN[titleKey] ? EN[titleKey] : originalTitle;
}

function initLang() {
  const saved = storedLang();
  const browser = (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";
  applyLang(saved === "tr" || saved === "en" ? saved : browser);

  document.querySelector(".lang-toggle")?.addEventListener("click", () => {
    const next = document.documentElement.lang === "tr" ? "en" : "tr";
    applyLang(next);
    storeLang(next);
  });
}

function initMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!button || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

initLang();
initMenu();
initReveal();
