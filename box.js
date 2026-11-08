const boxData = {
  "01": {
    title: "Box 01",
    subtitle: "Zimní oblečení",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    items: [
      ["Kabáty a bundy", "2 kusy", "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=240&q=80"],
      ["Lyžařské boty", "1 pár", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=240&q=80"],
      ["Zimní deky", "2 kusy", "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=240&q=80"]
    ]
  },
  "02": {
    title: "Box 02",
    subtitle: "Knihy a dekorace",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=85",
    items: [
      ["Knihy", "24 kusů", "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=240&q=80"],
      ["Rámečky", "6 kusů", "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=240&q=80"],
      ["Vázy a lampička", "4 kusy", "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=240&q=80"]
    ]
  },
  "03": {
    title: "Box 03",
    subtitle: "Cestovní věci",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    items: [
      ["Velký kufr", "1 kus", "https://images.unsplash.com/photo-1565026057447-bc90a039f7b7?auto=format&fit=crop&w=240&q=80"],
      ["Batohy", "2 kusy", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=240&q=80"],
      ["Cestovní tašky", "3 kusy", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=240&q=80"]
    ]
  },
  "04": {
    title: "Box 04",
    subtitle: "Sportovní vybavení",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=85",
    items: [
      ["Lyže a helmy", "2 sety", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=240&q=80"],
      ["Stan", "1 kus", "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=240&q=80"],
      ["Spacáky", "2 kusy", "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=240&q=80"]
    ]
  }
};

const key = new URLSearchParams(window.location.search).get("box") || "01";
const box = boxData[key] || boxData["01"];
const selected = new Set();
document.querySelector("#box-title").textContent = box.title;
document.querySelector("#box-subtitle").textContent = box.subtitle;
document.querySelector("#box-image").src = box.image;
document.querySelector("#box-image").alt = box.subtitle;

const itemList = document.querySelector("#item-list");
box.items.forEach((item, index) => {
  const label = document.createElement("label");
  label.className = "stored-item";
  label.innerHTML = `<input type="checkbox" value="${index}"><img src="${item[2]}" alt="${item[0]}"><span><strong>${item[0]}</strong><small>${item[1]}</small></span><i>✓</i>`;
  itemList.append(label);
});

function updateSelection() {
  const count = selected.size;
  document.querySelector("#selected-count").textContent = `${count} vybran${count === 1 ? "á" : "é"}`;
  document.querySelector("#request-summary").textContent = count ? `${count} ${count === 1 ? "položka" : "položky"} připraven${count === 1 ? "a" : "y"} k doručení` : "Zatím není vybraná žádná věc";
  document.querySelector("#request-items").disabled = count === 0;
}

itemList.addEventListener("change", event => {
  const index = event.target.value;
  event.target.checked ? selected.add(index) : selected.delete(index);
  event.target.closest(".stored-item").classList.toggle("is-selected", event.target.checked);
  updateSelection();
});
document.querySelector("#request-items").addEventListener("click", event => {
  event.currentTarget.textContent = "Požadavek odeslán ✓";
  event.currentTarget.disabled = true;
  document.querySelector("#request-summary").textContent = "Ozveme se vám s termínem doručení.";
});
