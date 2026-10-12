// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

// Highlight the menu link for the section on screen
const links = [...document.querySelectorAll(".site-nav a")];
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href").replace("/", "")))
  .filter(Boolean);
if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "/#" + e.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => io.observe(s));
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

// Gallery lightbox
const lightbox = document.querySelector(".lightbox");
const openPhoto = (src) => { lightbox.querySelector("img").src = src; lightbox.showModal(); };
document.querySelectorAll(".gallery-item").forEach((item) =>
  item.addEventListener("click", () => openPhoto(item.dataset.full))
);
document.querySelector("[data-open-gallery]")?.addEventListener("click", (e) => {
  const first = document.querySelector(".gallery-item");
  if (first) { e.preventDefault(); openPhoto(first.dataset.full); }
});
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-close")) lightbox.close();
});
