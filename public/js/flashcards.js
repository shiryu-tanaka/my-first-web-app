// サーバーからデータを取得する関数を作成してください
export async function fetchFlashcards() {
  try {
    const data = await fetch("/api/flashcards");
    const jsonData = await data.json();
    return jsonData;
  } catch (error) {
    console.log("Error fetching flashcards:", error);
    return [];
  }
}

export async function setupFlashcards() {
  // 暗記カード機能に必要な処理を作成してください
  const flashcardsList = document.getElementById("flashcards-list");

  async function renderFlashcards(wordList) {
    flashcardsList.innerHTML = "";

    for (const wordItem of wordList) {
      let flashcard = `
      <div class="flashcard">
        <div class="flashcard-content">
          <p class="flashcard-title">${wordItem.word}</p>
          <div class="flashcard-icons">
            <button class="flashcard-meaning" data-toggle="${wordItem.id}">
              <span class="ri-eye-line"></span>
            </button>
          </div>
        </div>
        <div data-meaning="${wordItem.id}" class="hidden">
          <p>${wordItem.meaning}</p>
        </div>
      </div>
      `;

      flashcardsList.innerHTML += flashcard;
    }
  }

  async function readFlashcards() {
    const flashcardsData = await fetchFlashcards();

    renderFlashcards(flashcardsData);
  }

  function toggleMeaning(id) {
    const meaning = document.querySelector(`[data-meaning="${id}"]`);

    if (meaning.classList.contains("hidden")) {
      meaning.classList.remove("hidden");
    } else {
      meaning.classList.add("hidden");
    }
  }

  flashcardsList.addEventListener("click", (event) => {
    const btn = event.target.closest(".flashcard-meaning");
    if (btn) {
      const toggleId = btn.getAttribute("data-toggle");
      toggleMeaning(toggleId);
    } else {
      return;
    }
  });

  await readFlashcards();
}
