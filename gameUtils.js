export function getDetectiveName() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name') || 'Guest Detective';
}

export function saveProgress(collectedWordsSet) {
  const wordsArray = Array.from(collectedWordsSet);
  localStorage.setItem('mystery_game_progress', JSON.stringify(wordsArray));
}

export function loadProgress() {
  const savedData = localStorage.getItem('mystery_game_progress');
  return savedData ? JSON.parse(savedData) : [];
}