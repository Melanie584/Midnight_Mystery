const CLUES = {
  couch: {
    icon: "🛋️",
    title: "Evidence #1 — The Armchair",
    clue: "The blood didn’t spray. It soaked. One dark stain spread across the corner cushion of the couch — deep, concentrated. Someone sat here after they were injured… or they were injured here and never stood back up immediately.\n\nNo overturned furniture. No signs of panic.\n\nJust one strange detail: the indentation in the cushion beside the stain. Someone else sat next to them.\n\nNot to help.\n\nTo wait.", 
    riddle: "I hold people in comfort and witness moments in silence. Sit with me long enough and I remember your shape. What am I?",
    answer: ["chair", "armchair", "seat", "sofa", "couch"],
    word: "ALIBI",
  },
  glass: {
    icon: "🥂",
    title: "Evidence #2 — The Champagne Glass",
    clue: "A single fingerprint pressed clearly into the side of the glass. Beneath it, a faint streak of blood.\n\nWhoever held this wasn’t bleeding badly — just enough to leave a mark.\n\nThe drink inside was untouched.\n\nThat’s the unsettling part.\n\nPeople don’t pour themselves a drink during chaos.\n\nThey do it afterward.\n\nLike they knew there wasn’t anywhere else to be.",
    riddle: "I am raised in celebration and shattered in grief. Fill me with truth and I overflow — fill me with lies and I ring hollow. What am I?",
    answer: ["glass", "champagne glass", "flute", "wine glass"],
    word: "WITNESS",
  },
  purse: {
    icon: "👜",
    title: "Evidence #3 — The Purse",
    clue: "The purse looked ordinary until we opened it.\n\nWallet. Keys. Receipts.\n\nAnd beneath everything else — a kitchen knife wrapped in a scarf, the blade stained dark red.\n\nToo deliberate to be panic.\n\nToo hidden to be an accident.\n\nWhoever placed it there wanted two things at once:\n\nTo keep it close.\n\nAnd to make sure nobody noticed until they were already gone.", 
    riddle: "I carry secrets without understanding them. Open me and pieces of a life spill out. What am I?",
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