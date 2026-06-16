const CLUES = {
  couch: {
    icon: "🛋️",
    title: "Evidence #1 — The Armchair",
    clue: "The armchair in the far left sits undisturbed — yet its cushion is slightly off-center. Something was hidden here, or someone left in a hurry. A faint imprint suggests the last person to sit here was not the victim.",
    riddle: "I have four legs but never walk, a back but cannot turn around. The longer you sit with your secrets, the more weight I hold. What am I?",
    answer: ["chair", "armchair", "seat", "sofa", "couch"],
    word: "ALIBI",
  },
  glass: {
    icon: "🥂",
    title: "Evidence #2 — The Champagne Glass",
    clue: "Two glasses — but only one shows lipstick on the rim. The other was wiped clean, deliberately. Someone wanted to erase their presence at this celebration. The bubbles have long gone flat.",
    riddle: "I am raised in celebration and shattered in grief. Fill me with truth and I overflow — fill me with lies and I ring hollow. What am I?",
    answer: ["glass", "champagne glass", "flute", "wine glass"],
    word: "WITNESS",
  },
  purse: {
    icon: "👜",
    title: "Evidence #3 — The Purse",
    clue: "The purse lies open, its contents scattered — lipstick, keys, a crumpled receipt. But there is no phone, no wallet. Either the victim dropped it in a struggle, or someone rifled through it looking for something specific.",
    riddle: "I carry secrets without knowing them. Open me and you find a life — close me and the story disappears. What am I?",
    answer: ["purse", "bag", "handbag"],
    word: "MOTIVE",
  },
};

let currentClue = null;
const collectedWords = new Set();

function openModal(clueKey) {
  currentClue = clueKey;
  const data = CLUES[clueKey];

  document.getElementById("modalIcon").textContent = data.icon;
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalClue").textContent = data.clue;
  document.getElementById("modalRiddle").textContent = data.riddle;
  document.getElementById("riddleInput").value = "";
  document.getElementById("modalFeedback").textContent = "";
  document.getElementById("modalFeedback").className = "modal__feedback";

  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");

  setTimeout(() => document.getElementById("riddleInput").focus(), 50);
}

function closeModal(event) {
  if (event && event.target !== document.getElementById("modalOverlay")) return;

  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  currentClue = null;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlay = document.getElementById("modalOverlay");
    if (overlay.classList.contains("is-open")) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      currentClue = null;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("riddleInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkRiddle();
  });
});

function checkRiddle() {
  if (!currentClue) return;

  const input = document.getElementById("riddleInput").value.trim().toLowerCase();
  const data = CLUES[currentClue];
  const feedback = document.getElementById("modalFeedback");

  if (data.answer.includes(input)) {
    feedback.textContent = "✅ Correct! You've unlocked a clue word.";
    feedback.className = "modal__feedback correct";
    addWordToBank(data.word, currentClue);
  } else {
    feedback.textContent = "❌ Not quite. Look more carefully at the clue...";
    feedback.className = "modal__feedback wrong";
  }
}

function addWordToBank(word, clueKey) {
  if (collectedWords.has(word)) return;
  collectedWords.add(word);

  const bank = document.getElementById("wordBank");
  const hint = bank.querySelector(".hint");
  if (hint) hint.remove();

  const tag = document.createElement("span");
  tag.className = "word-tag";
  tag.textContent = word;
  bank.appendChild(tag);

  const hotspot = document.getElementById(`hs-${clueKey}`);
  if (hotspot) hotspot.style.opacity = "0.4";
}

function checkAnswer() {
  const input = document.getElementById("answerInput").value.trim().toUpperCase();
  const result = document.getElementById("result");
  const allWords = Object.values(CLUES).map((c) => c.word);
  const hasAll = allWords.every((w) => input.includes(w));

  if (hasAll) {
    result.textContent = "🎉 Case solved!";
    result.style.color = "#6fcf97";
  } else {
    result.textContent = "🔍 Keep investigating...";
    result.style.color = "#eb5757";
  }
}