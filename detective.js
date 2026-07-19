import { getDetectiveName, saveProgress, loadProgress } from './gameUtils.js';

let CLUES = {};
let currentClue = null;
const collectedWords = new Set();

async function loadGameData() {
  try {
    const response = await fetch('clues.json'); 
    if (!response.ok) throw new Error('Network response was not ok');
    CLUES = await response.json(); 
    restoreSavedGame();
  } catch (error) {
    console.error("Failed to load game data:", error);
  }
}

window.onload = function() {
  loadGameData(); 
  
  const detectiveName = getDetectiveName();
  document.getElementById('introTitle').textContent = `Welcome, ${detectiveName}`;
  
  if (!localStorage.getItem('hasSeenIntro')) {
    const intro = document.getElementById('introModalOverlay');
    intro.classList.add('is-open');
    localStorage.setItem('hasSeenIntro', 'true');
  }
};

function openIntroModal() {
  const overlay = document.getElementById('introModalOverlay');
  overlay.classList.add('is-open');
}

function restoreSavedGame() {
  const savedWords = loadProgress();
  savedWords.forEach(word => {
    const clueKey = Object.keys(CLUES).find(key => CLUES[key].word === word);
    if (clueKey) addWordToBank(word, clueKey);
  });
}

function closeIntroModal() {
  const overlay = document.getElementById('introModalOverlay');
  const modal = overlay.querySelector('.modal');
  
  modal.style.transition = "transform 0.4s ease-in";
  modal.style.transform = "translateY(-100vh)";
  
  setTimeout(() => {
    overlay.classList.remove('is-open');
    modal.style.transform = "";
    modal.style.transition = "";
  }, 400);
}

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
  const modal = overlay.querySelector('.modal');

  modal.style.transition = "transform 0.4s ease-in";
  modal.style.transform = "translateY(-100vh)";
  
  setTimeout(() => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    modal.style.transform = "";
    modal.style.transition = "";
    currentClue = null;
  }, 400); 
}

function checkRiddle() {
  if (!currentClue) return;

  const input = document.getElementById("riddleInput").value.trim().toLowerCase();
  const data = CLUES[currentClue];
  const feedback = document.getElementById("modalFeedback");
  const acceptableAnswers = data.answer.map(ans => ans.toLowerCase());

  if (acceptableAnswers.includes(input)) {
    feedback.textContent = "✅ Correct! You've unlocked a clue word.";
    feedback.className = "modal__feedback correct";
    
    addWordToBank(data.word, currentClue);
    saveProgress(collectedWords); 
    
    setTimeout(() => {
      closeModal();
    }, 1500);
    
  } else {
    feedback.textContent = "❌ Not quite. Look more carefully at the clue...";
    feedback.className = "modal__feedback wrong";
    document.getElementById("riddleInput").value = "";
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
    
    localStorage.removeItem('mystery_game_progress'); 
    
    setTimeout(() => {
      window.location.href = "victory.html"; 
    }, 1500);

  } else {
    result.textContent = "🔍 Keep investigating...";
    result.style.color = "#eb5757";
    document.getElementById("answerInput").value = "";
  }
}

window.openModal = openModal;
window.closeModal = closeModal;
window.checkRiddle = checkRiddle;
window.checkAnswer = checkAnswer;
window.closeIntroModal = closeIntroModal;
window.openIntroModal = openIntroModal;

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlay = document.getElementById("modalOverlay");
    if (overlay.classList.contains("is-open")) {
      closeModal();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("riddleInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkRiddle();
  });
});
function toggleMenu() {
  document.getElementById("mainNav").classList.toggle("is-open");
}
window.toggleMenu = toggleMenu;