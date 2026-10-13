/* =====================================================================
   DATOS DEL TALLER  -  EDITA SOLO ESTE BLOQUE para cambiar la información
   Todo lo marcado "DEMO" debe reemplazarse por datos reales.
   ===================================================================== */
const CONFIG = {
  nombre: "Motores y Embobinados DEMO",          // DEMO: nombre del taller
  anios: "+XX",                                  // DEMO: años de experiencia (ej. "+15")
  telefono: "56 1012 8107",                      // teléfono visible
  telefonoLink: "+525610128107",                 // mismo teléfono, con +52 y sin espacios
  whatsapp: "525610128107",                      // WhatsApp: 52 + 10 dígitos, sin espacios ni +
  mensajeWhatsapp: "Hola, necesito información sobre la reparación de un motor.",
  direccion: "Calle Demo 123, Col. Centro, Estado de México (DEMO)",
  horario: "Lunes a Viernes 9:00–18:00 · Sábado 9:00–14:00 (DEMO)",
  // REEMPLAZAR CON URL REAL DEL TALLER
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/",
  zonas: "Agrega aquí tus municipios, alcaldías y zonas de servicio (DEMO)"
};

/* ----- A partir de aquí no necesitas modificar nada ----- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

$$("[data-cfg]").forEach(el => el.textContent = CONFIG[el.dataset.cfg]);
const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensajeWhatsapp)}`;
$$("[data-wa]").forEach(a => { a.href = wa; a.target = "_blank"; a.rel = "noopener"; });
$$("[data-tel]").forEach(a => a.href = "tel:" + CONFIG.telefonoLink);
["instagram", "facebook", "tiktok"].forEach(r =>
  $$(`[data-social="${r}"]`).forEach(a => { a.href = CONFIG[r]; a.target = "_blank"; a.rel = "noopener"; }));
$$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

// Si una imagen no existe en images/, se muestra un recuadro de demostración
$$("img").forEach(img => {
  const fail = () => { img.parentElement.classList.add("ph"); img.remove(); };
  img.addEventListener("error", fail);
  if (img.complete && img.naturalWidth === 0) fail();
});

// Menú móvil
const nav = $("#nav"), btn = $("#menuBtn");
btn.addEventListener("click", () => btn.setAttribute("aria-expanded", nav.classList.toggle("open")));
$$("#nav a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); }));

// Preguntas frecuentes (acordeón)
$$(".faq button").forEach(b => b.addEventListener("click", () =>
  b.setAttribute("aria-expanded", b.parentElement.classList.toggle("open"))));

// Aparición suave (solo en los bloques marcados)
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 });
$$(".reveal").forEach(el => io.observe(el));

// Lightbox de galería
const lb = $("#lightbox"), lbImg = $("#lbImg");
$$(".gallery figure").forEach(f => f.addEventListener("click", () => {
  const img = $("img", f); if (!img) return;
  lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add("open");
}));
lb.addEventListener("click", () => lb.classList.remove("open"));
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });
