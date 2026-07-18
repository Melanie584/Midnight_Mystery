let CLUES = {};

async function loadGameData() {
  try {
    const response = await fetch('clues.json'); 
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    CLUES = await response.json(); 
    console.log("Game data loaded successfully!");
    
  } catch (error) {
    console.error("Failed to load game data:", error);
  }
}

window.onload = function() {
  loadGameData(); 
  document.getElementById('introModalOverlay').classList.add('is-open');
};

function closeIntroModal() {
  document.getElementById('introModalOverlay').classList.remove('is-open');
}

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

  // Converts the player's input to lowercase
  const input = document.getElementById("riddleInput").value.trim().toLowerCase();
  const data = CLUES[currentClue];
  const feedback = document.getElementById("modalFeedback");

  // Converts all of the acceptable answers from your JSON file to lowercase
  const acceptableAnswers = data.answer.map(ans => ans.toLowerCase());

  // Compares the two lowercase versions
  if (acceptableAnswers.includes(input)) {
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
  const input = document.getElementById("answerInput").value.trim().toLowerCase();
  const result = document.getElementById("result");
  
  if (input === "jessica murdered jerry") {
    result.textContent = "🎉 Case solved! Redirecting...";
    result.style.color = "#6fcf97";
    
    setTimeout(() => {
      window.location.href = "victory.html"; 
    }, 1500);

  } else {
    result.textContent = "🔍 Keep investigating...";
    result.style.color = "#eb5757";
  }
}