const demoUser = { name: "Petr", email: "demo@odloz.to", password: "demo123" };

function getUser() {
  return JSON.parse(localStorage.getItem("odlozto-user") || "null");
}

if (document.body.classList.contains("dashboard-page") && !getUser()) {
  window.location.replace("login.html");
}

document.querySelectorAll("[data-auth-tab]").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".auth-tab.is-active").classList.remove("is-active");
    tab.classList.add("is-active");
    document.querySelector("#login-form").classList.toggle("is-hidden", tab.dataset.authTab !== "login");
    document.querySelector("#register-form").classList.toggle("is-hidden", tab.dataset.authTab !== "register");
  });
});

document.querySelector("#login-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  if (email !== demoUser.email || password !== demoUser.password) {
    document.querySelector("#auth-error").textContent = "E-mail nebo heslo není správné. Použijte demo údaje níže.";
    return;
  }
  localStorage.setItem("odlozto-user", JSON.stringify({ name: demoUser.name, email }));
  window.location.href = "dashboard.html";
});

document.querySelector("#register-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#register-name").value.trim();
  const email = document.querySelector("#register-email").value.trim();
  localStorage.setItem("odlozto-user", JSON.stringify({ name, email }));
  window.location.href = "dashboard.html";
});

const user = getUser();
if (user && document.body.classList.contains("dashboard-page")) {
  document.querySelector("#user-name").textContent = user.name;
  document.querySelector("#greeting-name").textContent = `${user.name}.`;
}

document.querySelector("#logout")?.addEventListener("click", () => {
  localStorage.removeItem("odlozto-user");
  window.location.href = "login.html";
});

document.querySelectorAll(".download-invoice").forEach(button => {
  button.addEventListener("click", () => {
    button.textContent = "PDF připraven ✓";
    button.disabled = true;
  });
});

const boxCards = [...document.querySelectorAll(".box-card")];
const detailImage = document.querySelector("#detail-image");
const detailBox = document.querySelector("#detail-box");
const detailTitle = document.querySelector("#detail-title");
const detailItems = document.querySelector("#detail-items");
const detailFill = document.querySelector("#detail-fill");
const detailProgress = document.querySelector("#detail-progress");
const boxSearch = document.querySelector("#box-search");
const boxCountLabel = document.querySelector("#box-count-label");

function selectBox(card) {
  if (document.body.classList.contains("dashboard-page")) {
    window.location.href = `box.html?box=${card.dataset.box}`;
    return;
  }
  boxCards.forEach(item => item.classList.toggle("is-selected", item === card));
  detailImage.src = card.dataset.image;
  detailImage.alt = card.querySelector("img").alt;
  detailBox.textContent = card.dataset.box;
  detailTitle.textContent = card.dataset.title;
  detailItems.textContent = card.dataset.items;
  detailFill.textContent = card.dataset.fill;
  detailProgress.style.width = `${card.dataset.fill}%`;
}

boxCards.forEach(card => card.addEventListener("click", () => selectBox(card)));
boxSearch?.addEventListener("input", event => {
  const query = event.target.value.trim().toLocaleLowerCase("cs-CZ");
  let visible = 0;
  boxCards.forEach(card => {
    const matches = `${card.dataset.title} ${card.dataset.items}`.toLocaleLowerCase("cs-CZ").includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  boxCountLabel.textContent = `${visible} ${visible === 1 ? "box" : "boxy"}`;
});

document.querySelector("#return-box")?.addEventListener("click", event => {
  event.currentTarget.textContent = "Požadavek odeslán ✓";
  event.currentTarget.disabled = true;
});

document.querySelector("#add-note")?.addEventListener("click", event => {
  const note = window.prompt("Co si chcete u boxů poznamenat?");
  if (!note?.trim()) return;
  event.currentTarget.textContent = "Poznámka uložená ✓";
  setTimeout(() => { event.currentTarget.textContent = "+ Přidat poznámku"; }, 2200);
});
