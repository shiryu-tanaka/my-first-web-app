// ここからコードを書いてください
export function setupTabs() {
  const homeLink = document.querySelector('[data-tab="home"]');
  const converterTab = document.querySelector('[data-tab="converter"]');
  const homeSection = document.getElementById("home");
  const converterSection = document.getElementById("converter");

  homeLink.addEventListener("click", () => {
    converterSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  });

  converterTab.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    converterSection.classList.remove("hidden");
  });
}
