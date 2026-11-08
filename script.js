document.body.classList.add("js-enabled");

const range = document.querySelector("#boxes");
const count = document.querySelector("#box-count");
const price = document.querySelector("#price");
const decrease = document.querySelector("#decrease");
const increase = document.querySelector("#increase");
const monthlyPrice = boxes => 299 + boxes * 224;
const calculatorModal = document.querySelector("#calculator-modal");
const detailModal = document.querySelector("#detail-modal");
const modalBoxes = document.querySelector("#modal-boxes");
const modalCount = document.querySelector("#modal-box-count");
const modalPrice = document.querySelector("#modal-price");
const toast = document.querySelector("#toast");

function updateQuote(value) {
  const boxes = Math.min(12, Math.max(1, Number(value)));
  range.value = boxes;
  count.value = boxes;
  count.textContent = boxes;
  price.innerHTML = `${monthlyPrice(boxes).toLocaleString("cs-CZ")} Kč <small>/ měsíc</small>`;
  price.classList.remove("price-pop");
  requestAnimationFrame(() => price.classList.add("price-pop"));
}

range.addEventListener("input", event => updateQuote(event.target.value));
decrease.addEventListener("click", () => updateQuote(Number(range.value) - 1));
increase.addEventListener("click", () => updateQuote(Number(range.value) + 1));

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Zavřít menu" : "Otevřít menu");
});
nav.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
});

document.querySelector(".lang-switch").addEventListener("click", event => {
  event.target.textContent = event.target.textContent === "EN" ? "CZ" : "EN";
  event.target.title = "Přepínač jazyka je připraven pro další verzi";
});

function setModal(open) {
  calculatorModal.classList.toggle("is-open", open);
  calculatorModal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("modal-open", open);
  if (open) modalBoxes.focus();
}

document.querySelectorAll(".js-open-calculator").forEach(button => {
  button.addEventListener("click", () => {
    detailModal.classList.remove("is-open");
    setModal(true);
  });
});
document.querySelectorAll("[data-close-modal]").forEach(element => element.addEventListener("click", () => setModal(false)));
document.querySelectorAll("[data-close-detail]").forEach(element => element.addEventListener("click", () => detailModal.classList.remove("is-open")));
document.querySelectorAll(".interactive-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelector("#detail-text").textContent = card.dataset.detail;
    detailModal.classList.add("is-open");
  });
});
function updateModalQuote(value) {
  const boxes = Math.min(12, Math.max(1, Number(value)));
  modalBoxes.value = boxes;
  modalCount.textContent = `${boxes} ${boxes === 1 ? "box" : "boxy"}`;
  modalPrice.innerHTML = `${monthlyPrice(boxes).toLocaleString("cs-CZ")} Kč <small>/ měsíc</small>`;
}
modalBoxes.addEventListener("input", event => updateModalQuote(event.target.value));
document.querySelector(".js-modal-submit").addEventListener("click", event => {
  window.location.href = "login.html?from=quote";
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  setModal(false);
  detailModal.classList.remove("is-open");
});

const heroVisual = document.querySelector(".hero-visual");
heroVisual.addEventListener("pointermove", event => {
  const bounds = heroVisual.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  heroVisual.style.setProperty("--tilt-x", `${y * -5}deg`);
  heroVisual.style.setProperty("--tilt-y", `${x * 5}deg`);
});
heroVisual.addEventListener("pointerleave", () => {
  heroVisual.style.setProperty("--tilt-x", "0deg");
  heroVisual.style.setProperty("--tilt-y", "0deg");
});

document.querySelectorAll("[data-counter]").forEach(counter => {
  const target = Number(counter.dataset.counter);
  const started = performance.now();
  const duration = 1400;
  const tick = now => {
    const progress = Math.min((now - started) / duration, 1);
    counter.textContent = Math.round((1 - Math.pow(1 - progress, 3)) * target).toLocaleString("cs-CZ");
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

const sceneTitle = document.querySelector("#scene-title");
const sceneDescription = document.querySelector("#scene-description");
const sceneVisual = document.querySelector("#scene-visual");
const scenePhoto = document.querySelector(".scene-photo");
document.querySelectorAll(".scene-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".scene-tab.is-active").classList.remove("is-active");
    tab.classList.add("is-active");
    sceneTitle.textContent = tab.dataset.scene;
    sceneDescription.textContent = tab.dataset.description;
    sceneVisual.className = `scene-visual scene-${tab.dataset.color} scene-changing`;
    scenePhoto.src = tab.dataset.image;
    scenePhoto.alt = tab.dataset.alt;
    setTimeout(() => sceneVisual.classList.remove("scene-changing"), 450);
    showToast(`${tab.dataset.scene}: prostor připraven`);
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

const revealElements = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(element => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => activeObserver.observe(section));
