/* =========================================================
   Portfolio – Nguyễn Bá Cường
   ========================================================= */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Song ngữ VI / EN ---------- */
const EN = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.portfolio": "Portfolio",
  "nav.contact": "Contact",
  "hero.kicker": "Portfolio · IT &amp; Digital Transformation",
  "hero.sub": "Connecting technology, data and education to build useful digital solutions.",
  "about.title": "About Me",
  "about.hi": "Hi, I'm",
  "about.linkedin": "LinkedIn profile",
  "about.text": "As an IT &amp; Digital Transformation student at the National Economics University, I'm interested in how technology changes teaching and learning. I have a background in data analysis and quantitative research, and I enjoy teamwork to turn ideas into real products.",
  "about.viewProjects": "View projects",
  "tl.edu": "Education",
  "tl.exp": "Activities",
  "tl.neu": "National Economics University",
  "tl.now": "Present",
  "tl.major": "IT &amp; Digital Transformation",
  "tl.school": "Hanoi",
  "tl.ug": "Undergraduate",
  "tl.edtech": "EdTech Project at NEU",
  "tl.edtechMeta": "Educational technology",
  "tl.project": "Project",
  "tab.projects": "Projects",
  "tab.skills": "Skills",
  "tab.certs": "Certificates",
  "pf.title": "Portfolio",
  "p1.title": "EdTech Project at NEU",
  "p1.desc": "Researching and proposing educational technology solutions for NEU students to improve the learning experience in a digital environment.",
  "p1.long": "The project focuses on understanding the learning needs of NEU students and proposing suitable educational technology solutions, contributing to the digital transformation of teaching and learning.",
  "chip.research": "Research",
  "chip.dt": "Digital Transformation",
  "btn.details": "Details",
  "pn.title": "Next project",
  "pn.desc": "Coming soon…",
  "sk.g1": "Analysis &amp; Research",
  "sk.g2": "Tools",
  "sk.g3": "Soft skills",
  "sk.quant": "Quantitative research",
  "sk.s1": "Presentation",
  "sk.s2": "Teamwork",
  "sk.s3": "Problem solving",
  "sk.s4": "Time management",
  "certs.empty": "Certificates will be added soon.",
  "ct.title": "Contact",
  "ct.formTitle": "Get in touch",
  "ct.formLead": "Want to collaborate or have a chat? Leave me a message!",
  "ct.name": "Your name",
  "ct.email": "Your email",
  "ct.msg": "Your message",
  "ct.send": "Send message",
  "ct.find": "Find me",
  "ct.liTitle": "Let's connect",
  "ct.open": "Open to internships &amp; new projects",
  "footer": "All rights reserved.",
  "m.role": "Role:",
  "m.roleV": "Project team member",
  "m.tools": "Tools:",
  "m.focus": "Focus:",
  "m.focusV": "EdTech, data analysis, digital transformation"
};

const VI = {};
document.querySelectorAll("[data-i18n]").forEach(el => { VI[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll("[data-i18n-ph]").forEach(el => { VI[el.dataset.i18nPh] = el.placeholder; });

const langBtn = document.getElementById("langBtn");
let lang = "vi";

function setLang(next) {
  lang = next;
  const dict = next === "en" ? EN : VI;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.innerHTML = dict[el.dataset.i18n] ?? VI[el.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    el.placeholder = dict[el.dataset.i18nPh] ?? VI[el.dataset.i18nPh];
  });
  document.documentElement.lang = next;
  langBtn.textContent = next === "en" ? "VI" : "EN";
  try { localStorage.setItem("lang", next); } catch (e) {}
  requestAnimationFrame(() => { moveNavIndicator(); moveTabIndicator(); });
}

langBtn.addEventListener("click", () => setLang(lang === "vi" ? "en" : "vi"));

/* ---------- 2. Thanh điều hướng: vạch chỉ báo trượt ---------- */
const pillLinks = [...document.querySelectorAll(".pill-link")];
const pillIndicator = document.getElementById("pillIndicator");

function moveNavIndicator() {
  const active = document.querySelector(".pill-link.active");
  if (!active) return;
  pillIndicator.style.width = active.offsetWidth + "px";
  pillIndicator.style.transform = `translateX(${active.offsetLeft}px)`;
}

function setActiveSection(id) {
  pillLinks.forEach(a => a.classList.toggle("active", a.dataset.target === id));
  moveNavIndicator();
}

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
}, { rootMargin: "-45% 0px -50% 0px" });
["home", "about", "portfolio", "contact"].forEach(id => sectionObserver.observe(document.getElementById(id)));

window.addEventListener("resize", () => { moveNavIndicator(); moveTabIndicator(); resizeStars(); });

/* ---------- 3. Bầu trời sao ---------- */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let shooting = null;

function resizeStars() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.round((canvas.offsetWidth * canvas.offsetHeight) / 5200);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.offsetWidth,
    y: Math.random() * canvas.offsetHeight * 0.75,
    r: Math.random() * 1.3 + 0.2,
    a: Math.random(),
    s: Math.random() * 0.02 + 0.004
  }));
}

function drawStars() {
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  ctx.clearRect(0, 0, w, h);
  for (const st of stars) {
    if (!reduceMotion) st.a += st.s;
    const alpha = 0.35 + Math.abs(Math.sin(st.a)) * 0.65;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
  // sao băng thỉnh thoảng xuất hiện
  if (!reduceMotion) {
    if (!shooting && Math.random() < 0.004) {
      shooting = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.3, life: 0 };
    }
    if (shooting) {
      const len = 90;
      const g = ctx.createLinearGradient(shooting.x, shooting.y, shooting.x - len, shooting.y - len * 0.45);
      g.addColorStop(0, `rgba(255,255,255,${1 - shooting.life / 50})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = g; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(shooting.x, shooting.y);
      ctx.lineTo(shooting.x - len, shooting.y - len * 0.45); ctx.stroke();
      shooting.x += 9; shooting.y += 4; shooting.life++;
      if (shooting.life > 50) shooting = null;
    }
  }
  requestAnimationFrame(drawStars);
}
resizeStars();
drawStars();

/* ---------- 4. Parallax núi + chữ PORTFOLIO ---------- */
const layers = [...document.querySelectorAll(".mountains .layer")];
const megaWord = document.getElementById("megaWord");
const mega = megaWord.parentElement;

function onScroll() {
  const y = window.scrollY;
  if (!reduceMotion) {
    if (y < window.innerHeight * 1.2) {
      layers.forEach(l => { l.style.transform = `translateY(${y * l.dataset.depth}px)`; });
    }
    const rect = mega.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height); // 0 → 1
      const range = window.innerWidth < 720 ? 8 : 24;
      megaWord.style.transform = `translateX(${(0.5 - p) * range}%) scale(${0.92 + p * 0.12})`;
    }
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- 5. Tabs Dự án / Kỹ năng / Chứng chỉ ---------- */
const tabs = [...document.querySelectorAll(".tab")];
const tabIndicator = document.getElementById("tabIndicator");

function moveTabIndicator() {
  const i = tabs.findIndex(t => t.classList.contains("active"));
  tabIndicator.style.transform = `translateX(${i * 100}%)`;
}

function openTab(name) {
  tabs.forEach(t => {
    const on = t.dataset.tab === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
  document.querySelectorAll(".panel").forEach(p => {
    const on = p.id === "panel-" + name;
    p.hidden = !on;
    p.classList.toggle("active", on);
    if (on) p.querySelectorAll(".reveal").forEach(r => r.classList.add("in"));
  });
  moveTabIndicator();
}
tabs.forEach(t => t.addEventListener("click", () => openTab(t.dataset.tab)));

// Thẻ thư mục → mở tab tương ứng
document.querySelectorAll("[data-open-tab]").forEach(btn => {
  btn.addEventListener("click", () => {
    openTab(btn.dataset.openTab);
    document.getElementById("portfolio").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
});

// Đếm số lượng tự động
const counts = {
  projects: document.querySelectorAll("[data-project]").length,
  skills: document.querySelectorAll("[data-skill]").length,
  certs: document.querySelectorAll("[data-cert]").length
};

/* ---------- 6. Hiệu ứng xuất hiện + đếm số ---------- */
function countUp(el) {
  const target = counts[el.dataset.count] || 0;
  if (reduceMotion || target === 0) { el.textContent = target; return; }
  const start = performance.now();
  const step = now => {
    const p = Math.min((now - start) / 900, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-count]").forEach(countUp);
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  // so le nhẹ cho các phần tử cạnh nhau
  el.style.transitionDelay = `${(i % 3) * 90}ms`;
  revealObserver.observe(el);
});

/* ---------- 7. Hộp chi tiết dự án ---------- */
const modal = document.getElementById("projectModal");
document.querySelectorAll("[data-details]").forEach(b => b.addEventListener("click", () => modal.showModal()));
modal.addEventListener("click", e => {
  if (e.target === modal || e.target.hasAttribute("data-close")) modal.close();
});

/* ---------- 8. Form liên hệ → mở ứng dụng email ---------- */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent(`[Portfolio] ${f.name.value}`);
  const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} (${f.email.value})`);
  window.location.href = `mailto:cuongngba.work@gmail.com?subject=${subject}&body=${body}`;
});

/* ---------- Khởi tạo ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
try { if (localStorage.getItem("lang") === "en") setLang("en"); } catch (e) {}
moveNavIndicator();
moveTabIndicator();
if (document.fonts) document.fonts.ready.then(moveNavIndicator);
