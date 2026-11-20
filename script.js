/* =====================================================================
   Portfolio – phần xử lý (không cần sửa). Nội dung nằm trong data.js
   ===================================================================== */
(() => {
  // ?preview=1 → hiển thị bản nháp từ trang admin.html
  const PREVIEW = /[?&]preview=1/.test(location.search);
  const getLS = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const D = (PREVIEW && getLS("portfolioDraft")) || (typeof PORTFOLIO !== "undefined" ? PORTFOLIO : {});
  const PIMG = PREVIEW ? (getLS("portfolioPreviewImgs") || {}) : {};
  const IMG = p => PIMG[p] || p;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Chữ giao diện 2 ngôn ngữ ---------- */
  const UI = {
    vi: {
      "nav.home": "Trang chủ", "nav.about": "Về tôi", "nav.portfolio": "Portfolio", "nav.contact": "Liên hệ",
      "hero.hello": "Xin chào, tôi là",
      "about.title": "Về tôi", "about.hi": "Xin chào, tôi là", "about.edu": "Học vấn", "about.exp": "Kinh nghiệm",
      "btn.cv": "Xem CV", "btn.projects": "Xem dự án", "btn.details": "Chi tiết", "btn.demo": "Xem demo",
      "btn.view": "Xem", "btn.link": "Liên kết",
      "pf.title": "Portfolio", "tab.projects": "Dự án", "tab.certificates": "Chứng chỉ", "tab.awards": "Giải thưởng",
      "empty": "Đang cập nhật…",
      "ct.title": "Liên hệ", "ct.formTitle": "Liên hệ", "ct.formLead": "Bạn có điều gì muốn trao đổi? Gửi lời nhắn cho mình nhé!",
      "ct.name": "Tên của bạn", "ct.email": "Email của bạn", "ct.msg": "Lời nhắn", "ct.send": "Gửi lời nhắn",
      "ct.find": "Tìm tôi tại", "ct.linkedin": "Kết nối", "ct.linkedinSub": "trên LinkedIn",
      "foot": "Đã đăng ký bản quyền.", "tools": "Công cụ / chủ đề"
    },
    en: {
      "nav.home": "Home", "nav.about": "About", "nav.portfolio": "Portfolio", "nav.contact": "Contact",
      "hero.hello": "Hi, I'm",
      "about.title": "About Me", "about.hi": "Hi, I'm", "about.edu": "Education", "about.exp": "Experience",
      "btn.cv": "View CV", "btn.projects": "View Projects", "btn.details": "Details", "btn.demo": "Live Demo",
      "btn.view": "View", "btn.link": "Link",
      "pf.title": "Portfolio", "tab.projects": "Projects", "tab.certificates": "Certificates", "tab.awards": "Awards",
      "empty": "Coming soon…",
      "ct.title": "Contact Me", "ct.formTitle": "Contact", "ct.formLead": "Anything you'd like to discuss? Just send me a message!",
      "ct.name": "Your name", "ct.email": "Your email", "ct.msg": "Your message", "ct.send": "Send message",
      "ct.find": "Find Me", "ct.linkedin": "Let's Connect", "ct.linkedinSub": "on LinkedIn",
      "foot": "All rights reserved.", "tools": "Tools / topics"
    }
  };

  let lang = "vi";
  try { if (localStorage.getItem("lang") === "en") lang = "en"; } catch (e) {}

  const t = k => UI[lang][k] ?? k;
  const L = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.vi ?? v.en ?? "") : (v ?? "");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = n => String(n || "").trim().split(/\s+/).map(w => w[0]).slice(-3).join("").toUpperCase();

  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
    cert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 0 1 0-4h2M18 9h2a2 2 0 0 0 0-4h-2M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    school: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
    work: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>'
  };

  const SOCIAL = {
    linkedin: { label: () => t("ct.linkedin"), sub: () => t("ct.linkedinSub"), color: "#0a66c2",
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>' },
    email: { label: () => "Email", color: "#2563eb", href: v => "mailto:" + v,
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>' },
    github: { label: () => "GitHub", color: "#111",
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>' },
    facebook: { label: () => "Facebook", color: "#1877f2",
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"/></svg>' },
    instagram: { label: () => "Instagram", color: "linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)",
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>' },
    tiktok: { label: () => "TikTok", color: "#111",
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2-2.75V9.4a6.34 6.34 0 1 0 5.45 6.27V8.73a8.2 8.2 0 0 0 4.77 1.52V6.8a4.85 4.85 0 0 1-1-.11Z"/></svg>' }
  };

  const handle = (key, v) => {
    if (key === "email") return v;
    const m = String(v).replace(/\/+$/, "").split("/").pop();
    return key === "linkedin" ? "in/" + m : "@" + m.replace(/^@/, "");
  };

  /* ---------- Hiển thị nội dung ---------- */
  const lists = {
    projects: () => D.projects || [],
    certificates: () => D.certificates || [],
    awards: () => D.awards || []
  };
  let tab = "projects";

  function renderStatic() {
    document.documentElement.lang = lang;
    document.title = `${D.name || "Portfolio"} | Portfolio`;
    $("#lang").textContent = lang === "vi" ? "EN" : "VI";
    $$("[data-t]").forEach(el => { el.textContent = t(el.dataset.t); });
    $$("[data-ph]").forEach(el => { el.placeholder = t(el.dataset.ph); });
    $$("[data-f]").forEach(el => { el.textContent = L(D[el.dataset.f]); });

    // Nút CV
    const cv = $("#cvBtn");
    if (D.cvLink) cv.href = D.cvLink; else cv.hidden = true;

    // Ảnh hero
    if (D.heroImage) {
      $("#heroBg").style.backgroundImage = `url("${IMG(D.heroImage)}")`;
      document.body.classList.add("has-hero-img");
    }

    // Chân dung
    $("#portrait").innerHTML = D.avatar
      ? `<img src="${esc(IMG(D.avatar))}" alt="${esc(L(D.name))}">`
      : `<span class="portrait-ph">${esc(initials(D.name))}</span>`;

    // Ảnh ở khung liên hệ
    const cp = $("#contactPhoto");
    if (D.contactPhoto) cp.innerHTML = `<img src="${esc(IMG(D.contactPhoto))}" alt="" loading="lazy">`; else cp.hidden = true;
  }

  function stepHTML(items, icon) {
    return items.map((it, i) => `
      <li class="${i === 0 ? "on" : ""}">
        <span class="step-n">${i + 1}</span>
        <div class="step-body">
          <div class="step-head">
            <span class="step-logo">${it.logo ? `<img src="${esc(IMG(it.logo))}" alt="">` : icon}</span>
            <span class="step-org">${esc(L(it.org))}</span>
            ${it.time ? `<span class="step-time">${esc(L(it.time))}</span>` : ""}
          </div>
          <p class="step-title">${esc(L(it.title))}</p>
          <p class="step-meta">${esc(L(it.place))}${it.tag ? ` <span class="dot">•</span> <span class="chip-o">${esc(L(it.tag))}</span>` : ""}</p>
        </div>
      </li>`).join("");
  }

  function renderJourney() {
    $("#eduList").innerHTML = stepHTML(D.education || [], ICON.school);
    $("#expList").innerHTML = stepHTML(D.experience || [], ICON.work);
    // Hover làm nổi bật từng bước
    $$(".steps").forEach(ol => {
      ol.addEventListener("mouseover", e => {
        const li = e.target.closest("li"); if (!li) return;
        $$("li", ol).forEach(x => x.classList.toggle("on", x === li));
      });
    });
  }

  function renderFolders() {
    const keys = ["projects", "certificates", "awards"];
    $("#folders").innerHTML = keys.map(k => {
      const arr = lists[k]();
      const img = arr.find(x => x.image)?.image;
      return `
      <button class="folder reveal" type="button" data-go="${k}">
        <span class="f-back"></span>
        <span class="f-sheet s1">${img ? `<img src="${esc(IMG(img))}" alt="" loading="lazy">` : ""}</span>
        <span class="f-sheet s2"></span>
        <span class="f-front">
          <span class="f-num" data-num="${arr.length}">${arr.length}</span>
          <span class="f-lbl">${t("tab." + k)}</span>
          <span class="f-more"><i></i><i></i><i></i></span>
        </span>
      </button>`;
    }).join("");
    $$("[data-go]").forEach(b => b.addEventListener("click", () => {
      setTab(b.dataset.go);
      $("#portfolio").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }));
  }

  function renderTabs() {
    const box = $("#tabs");
    $$(".tab", box).forEach(x => x.remove());
    const icons = { projects: ICON.code, certificates: ICON.cert, awards: ICON.award };
    Object.keys(lists).forEach(k => {
      const b = document.createElement("button");
      b.className = "tab" + (k === tab ? " on" : "");
      b.type = "button"; b.dataset.tab = k; b.setAttribute("role", "tab");
      b.innerHTML = `${icons[k]}<span>${t("tab." + k)}</span>`;
      b.addEventListener("click", () => setTab(k));
      box.appendChild(b);
    });
    moveTabsPill();
  }

  function cardHTML(it, i) {
    const isProject = tab === "projects";
    const img = it.image
      ? `<img src="${esc(IMG(it.image))}" alt="" loading="lazy">`
      : `<span class="cover-ph">${isProject ? ICON.code : tab === "awards" ? ICON.award : ICON.cert}</span>`;
    const desc = isProject ? L(it.desc) : [L(it.issuer), L(it.time)].filter(Boolean).join(" · ");
    const link = isProject ? it.demo : it.link;
    return `
      <article class="card">
        <div class="cover">${img}</div>
        <h3>${esc(L(it.title))}</h3>
        <p>${esc(desc)}</p>
        <div class="card-btns">
          <button class="btn sm" type="button" data-open="${i}">${t(isProject ? "btn.details" : "btn.view")} ${ICON.arrow}</button>
          ${link ? `<a class="btn-ghost" href="${esc(link)}" target="_blank" rel="noopener">${t(isProject ? "btn.demo" : "btn.link")} ${ICON.ext}</a>` : ""}
        </div>
      </article>`;
  }

  function renderTrack() {
    const arr = lists[tab]();
    const track = $("#track");
    track.innerHTML = arr.length ? arr.map(cardHTML).join("") : `<div class="empty">${t("empty")}</div>`;
    track.scrollLeft = 0;
    $$("[data-open]", track).forEach(b => b.addEventListener("click", () => openModal(arr[+b.dataset.open])));
    updateArrows();
  }

  function setTab(k) {
    tab = k;
    $$(".tab").forEach(b => b.classList.toggle("on", b.dataset.tab === k));
    moveTabsPill();
    renderTrack();
  }

  function moveTabsPill() {
    const on = $(".tab.on"); const pill = $("#tabsPill");
    if (!on) return;
    pill.style.width = on.offsetWidth + "px";
    pill.style.transform = `translateX(${on.offsetLeft}px)`;
  }

  function renderGallery() {
    const imgs = D.gallery || [];
    const sec = $("#gallery");
    if (!imgs.length) { sec.hidden = true; return; }
    sec.hidden = false;
    // vị trí rải rác cố định (lặp lại nếu nhiều ảnh)
    const spots = [[8, 6, -6], [58, 2, 4], [32, 30, -3], [76, 34, 7], [4, 58, 5], [50, 60, -5], [22, 82, 3], [70, 80, -4]];
    $("#galleryStage").innerHTML = imgs.map((src, i) => {
      const [x, y, r] = spots[i % spots.length];
      const sp = (0.15 + (i % 4) * 0.1).toFixed(2);
      return `<figure class="g-item" style="left:${x}%;top:${y + Math.floor(i / spots.length) * 100}%;--r:${r}deg" data-speed="${sp}">
        <img src="${esc(IMG(src))}" alt="" loading="lazy"></figure>`;
    }).join("");
    $("#galleryStage").style.height = `${Math.ceil(imgs.length / spots.length) * 100}%`;
    $$(".g-item img").forEach(im => im.addEventListener("click", () => openModal({ image: im.getAttribute("src") })));
  }

  function renderSocials() {
    const c = D.contact || {};
    $("#socials").innerHTML = Object.keys(SOCIAL).filter(k => c[k]).map(k => {
      const s = SOCIAL[k];
      const href = s.href ? s.href(c[k]) : c[k];
      return `<li><a href="${esc(href)}" ${k === "email" ? "" : 'target="_blank" rel="noopener"'}>
        <span class="s-ico" style="background:${s.color}">${s.svg}</span>
        <span class="s-txt"><b>${esc(s.label())}</b><small>${esc(s.sub ? s.sub() : handle(k, c[k]))}</small></span>
        <span class="s-ext">${ICON.ext}</span></a></li>`;
    }).join("");
  }

  function renderAll() {
    renderStatic(); renderJourney(); renderFolders(); renderTabs(); renderTrack(); renderGallery(); renderSocials();
    observeReveals();
    requestAnimationFrame(() => { moveNav(); moveTabsPill(); });
  }

  /* ---------- Hộp chi tiết ---------- */
  const modal = $("#modal");
  function openModal(it) {
    const body = $("#modalBody");
    const tags = (it.tags || []).map(x => `<li>${esc(L(x))}</li>`).join("");
    const link = it.demo || it.link;
    body.innerHTML = `
      ${it.image ? `<img class="m-img" src="${esc(IMG(it.image))}" alt="">` : ""}
      ${it.title ? `<h3>${esc(L(it.title))}</h3>` : ""}
      ${it.issuer || it.time ? `<p class="m-sub">${esc([L(it.issuer), L(it.time)].filter(Boolean).join(" · "))}</p>` : ""}
      ${it.details || it.desc ? `<p>${esc(L(it.details) || L(it.desc))}</p>` : ""}
      ${tags ? `<p class="m-lbl">${t("tools")}</p><ul class="m-tags">${tags}</ul>` : ""}
      ${link ? `<a class="btn" href="${esc(link)}" target="_blank" rel="noopener">${t(it.demo ? "btn.demo" : "btn.link")} ${ICON.ext}</a>` : ""}`;
    modal.showModal();
  }
  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.hasAttribute("data-close")) modal.close();
  });

  /* ---------- Điều hướng ---------- */
  const navLinks = $$(".nav-link");
  function moveNav() {
    const on = $(".nav-link.on") || navLinks[0];
    const pill = $("#navPill"), buddy = $("#navBuddy");
    pill.style.width = on.offsetWidth + "px";
    pill.style.transform = `translateX(${on.offsetLeft}px)`;
    buddy.style.transform = `translateX(${on.offsetLeft + on.offsetWidth - 22}px)`;
  }
  const secObs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    let id = e.target.id === "gallery" ? "portfolio" : e.target.id;
    navLinks.forEach(a => a.classList.toggle("on", a.dataset.sec === id));
    moveNav();
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["home", "about", "portfolio", "gallery", "contact"].forEach(id => secObs.observe(document.getElementById(id)));

  // Thanh menu: chế độ sáng/tối tuỳ nền phía sau
  const nav = $("#nav");
  function navTheme() {
    const y = window.innerHeight * 0.05 + 30;
    const el = document.elementFromPoint(window.innerWidth / 2, y + 40);
    const dark = !!(el && el.closest(".hero, .about, .mega"));
    nav.classList.toggle("on-dark", dark);
  }

  /* ---------- Bầu trời sao (khi không có ảnh hero) ---------- */
  const cv = $("#stars"), cx = cv.getContext("2d");
  let stars = [], shoot = null;
  function sizeStars() {
    const r = Math.min(devicePixelRatio || 1, 2);
    cv.width = cv.offsetWidth * r; cv.height = cv.offsetHeight * r; cx.setTransform(r, 0, 0, r, 0, 0);
    stars = Array.from({ length: Math.round(cv.offsetWidth * cv.offsetHeight / 5000) }, () => ({
      x: Math.random() * cv.offsetWidth, y: Math.random() * cv.offsetHeight * .7,
      r: Math.random() * 1.3 + .2, a: Math.random() * 6, s: Math.random() * .02 + .004
    }));
  }
  function drawStars() {
    if (D.heroImage) return;
    const w = cv.offsetWidth, h = cv.offsetHeight;
    cx.clearRect(0, 0, w, h);
    for (const s of stars) {
      if (!reduce) s.a += s.s;
      cx.globalAlpha = .3 + Math.abs(Math.sin(s.a)) * .7;
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7); cx.fillStyle = "#fff"; cx.fill();
    }
    cx.globalAlpha = 1;
    if (!reduce) {
      if (!shoot && Math.random() < .004) shoot = { x: Math.random() * w * .7, y: Math.random() * h * .3, l: 0 };
      if (shoot) {
        const g = cx.createLinearGradient(shoot.x, shoot.y, shoot.x - 90, shoot.y - 40);
        g.addColorStop(0, `rgba(255,255,255,${1 - shoot.l / 50})`); g.addColorStop(1, "rgba(255,255,255,0)");
        cx.strokeStyle = g; cx.lineWidth = 1.5; cx.beginPath();
        cx.moveTo(shoot.x, shoot.y); cx.lineTo(shoot.x - 90, shoot.y - 40); cx.stroke();
        shoot.x += 9; shoot.y += 4; if (++shoot.l > 50) shoot = null;
      }
    }
    requestAnimationFrame(drawStars);
  }

  /* ---------- Hiệu ứng khi cuộn ---------- */
  const mountains = $$("#heroMountains g[data-depth]");
  const mega = $("#megaText");
  function onScroll() {
    const y = scrollY, vh = innerHeight;
    navTheme();
    if (reduce) return;
    if (y < vh * 1.2) {
      mountains.forEach(g => { g.style.transform = `translateY(${y * g.dataset.depth}px)`; });
      $("#heroBg").style.transform = `translateY(${y * .3}px) scale(1.08)`;
      $(".hero-text").style.transform = `translateY(${y * .45}px)`;
      $(".hero-text").style.opacity = Math.max(0, 1 - y / (vh * .6));
    }
    const r = mega.parentElement.getBoundingClientRect();
    if (r.bottom > 0 && r.top < vh) {
      const p = (vh - r.top) / (vh + r.height);
      mega.style.transform = `translateX(${(0.5 - p) * (innerWidth < 720 ? 10 : 22)}%)`;
    }
    $$(".g-item").forEach(f => {
      const rr = f.getBoundingClientRect();
      f.style.translate = `0 ${(rr.top + rr.height / 2 - vh / 2) * -f.dataset.speed}px`;
    });
  }

  /* ---------- Hiện dần khi cuộn ---------- */
  let revObs;
  function countUp(el) {
    const n = +el.dataset.num;
    if (reduce || !n) return;
    const t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / 900, 1);
      el.textContent = Math.round(n * (1 - (1 - p) ** 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function observeReveals() {
    revObs?.disconnect();
    revObs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      $$("[data-num]", e.target).forEach(countUp);
      revObs.unobserve(e.target);
    }), { threshold: .12 });
    $$(".reveal:not(.in)").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 90}ms`;
      revObs.observe(el);
    });
  }

  /* ---------- Carousel ---------- */
  const track = $("#track");
  function updateArrows() {
    const max = track.scrollWidth - track.clientWidth - 4;
    $("#prev").disabled = track.scrollLeft <= 4;
    $("#next").disabled = track.scrollLeft >= max;
    $(".carousel").classList.toggle("no-arrows", max <= 0);
  }
  function slide(dir) {
    const card = $(".card", track);
    const step = card ? card.offsetWidth + 28 : track.clientWidth * .8;
    track.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }
  $("#prev").addEventListener("click", () => slide(-1));
  $("#next").addEventListener("click", () => slide(1));
  track.addEventListener("scroll", updateArrows, { passive: true });

  /* ---------- Form liên hệ → mở ứng dụng email ---------- */
  $("#form").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, to = (D.contact || {}).email || "";
    const sub = encodeURIComponent(`[Portfolio] ${f.n.value}`);
    const body = encodeURIComponent(`${f.m.value}\n\n— ${f.n.value} (${f.e.value})`);
    location.href = `mailto:${to}?subject=${sub}&body=${body}`;
  });

  /* ---------- Đổi ngôn ngữ ---------- */
  $("#lang").addEventListener("click", () => {
    lang = lang === "vi" ? "en" : "vi";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    renderAll();
    $$(".reveal").forEach(el => el.classList.add("in"));
  });

  /* ---------- Khởi động ---------- */
  $("#yr").textContent = new Date().getFullYear();
  if (PREVIEW) {
    const b = document.createElement("div");
    b.className = "preview-bar";
    b.innerHTML = 'Đang xem trước bản nháp · <a href="admin.html">← Quay lại chỉnh sửa</a>';
    document.body.appendChild(b);
  }
  renderAll();
  sizeStars(); drawStars();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", () => { sizeStars(); moveNav(); moveTabsPill(); updateArrows(); });
  onScroll();
  document.fonts?.ready.then(() => { moveNav(); moveTabsPill(); });
})();
