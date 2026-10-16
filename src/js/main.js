// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

// Highlight the menu link for the section on screen
const links = [...document.querySelectorAll(".site-nav a")].filter((a) => a.pathname === location.pathname && a.hash);
const sections = links
  .map((a) => document.getElementById(a.getAttribute("href").split("#")[1]))
  .filter(Boolean);
if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href").endsWith("#" + e.target.id)));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => io.observe(s));
  // Near the top of the page, Home is the active link (the hero is too short to reach the middle band)
  const atTop = () => {
    if (scrollY < 150) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href").endsWith("#top")));
  };
  addEventListener("scroll", atTop, { passive: true });
  setTimeout(atTop, 50);
}

// Buttons with data-service preselect the quote form's move type
document.querySelectorAll("[data-service]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const select = document.querySelector('.quote-form select[name="service"]');
    if (select) select.value = btn.dataset.service;
  })
);

// Carousels: arrow buttons scroll one card; gallery dots follow the scroll position
document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const step = () => (track.firstElementChild?.getBoundingClientRect().width || 200) + 16;
  carousel.querySelector(".prev")?.addEventListener("click", () => track.scrollBy({ left: -step() }));
  carousel.querySelector(".next")?.addEventListener("click", () => track.scrollBy({ left: step() }));
  const dots = carousel.parentElement.querySelectorAll(".dots span");
  if (dots.length) {
    track.addEventListener("scroll", () => {
      const max = track.scrollWidth - track.clientWidth;
      const i = max > 0 ? Math.round((track.scrollLeft / max) * (dots.length - 1)) : 0;
      dots.forEach((d, j) => d.classList.toggle("on", j === i));
    }, { passive: true });
  }
});

// Silent gallery clips: play muted only while on screen; people who prefer reduced motion get controls instead
document.querySelectorAll(".gallery-video video.autoloop").forEach((video) => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.controls = true;
  } else if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()), { threshold: 0.25 }).observe(video);
  } else {
    video.play().catch(() => {});
  }
});

// Clips with sound pause when scrolled away, and only one plays at a time
const soundVideos = [...document.querySelectorAll(".gallery-video video[controls]:not(.autoloop)")];
soundVideos.forEach((video) => {
  video.addEventListener("play", () => soundVideos.forEach((o) => o !== video && o.pause()));
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { if (!e.isIntersecting) video.pause(); }, { threshold: 0 }).observe(video);
  }
});

// Move date: no past dates. Set at load time (not build time) so "today" is the visitor's local date
const moveDate = document.querySelector('input[name="move_date"]');
if (moveDate) {
  const d = new Date();
  moveDate.min = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

// Quote form: GitHub Pages has no form backend, so open the visitor's email app with the answers filled in
const quoteForm = document.querySelector('form[name="quote"]');
quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(quoteForm);
  const lines = [
    ["Name", f.get("name")], ["Phone", f.get("phone")], ["Email", f.get("email")],
    ["Moving from", f.get("from")], ["Moving to", f.get("to")], ["Move date", f.get("move_date")],
    ["Move type", f.get("service")], ["Details", f.get("details")],
  ].filter(([, v]) => v).map(([k, v]) => k + ": " + v);
  const subject = "Quote request: " + (f.get("service") || "Move") + " - " + f.get("name");
  if (e.submitter?.value === "text") {
    // "?&body=" works on both iPhone and Android
    window.location.href = "sms:" + quoteForm.dataset.sms + "?&body=" + encodeURIComponent(subject + "\n" + lines.join("\n"));
    return;
  }
  window.location.href = "mailto:" + quoteForm.dataset.email +
    "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
});

// Partner form: same idea as the quote form, on the Partner With Us page
const partnerForm = document.querySelector(".partner-form");
partnerForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(partnerForm);
  const lines = [
    ["Name", f.get("name")], ["Company", f.get("company")], ["Email", f.get("email")], ["Phone", f.get("phone")],
    ["Partnership type", f.get("partner_type")], ["City / service area", f.get("area")], ["Message", f.get("message")],
  ].filter(([, v]) => v).map(([k, v]) => k + ": " + v);
  const subject = "Partnership inquiry: " + (f.get("company") || f.get("name"));
  window.location.href = "mailto:" + partnerForm.dataset.email +
    "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
});
