const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

const dififcultySelect = document.getElementById('difficulty');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');

const endgameEl = document.getElementById('end-game-container');

// List of words
const words = [
  'laptop',
  'birou',
  'mouse',
  'apa',
  'telefon',
  'carti',
  'muzica',
  'cursuri',
  'crema',
  'foc',
  'dormitor',
];

// Init
let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

dififcultySelect.value = difficulty;

// Focus on input
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Update time

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // End Game
    gameOver();
  }
}

// Game Over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your score is: ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;

  endgameEl.style.display = 'flex';
}

// Generate Random Word from Arr
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDom();

// Event Listeners
text.addEventListener('input', (e) => {
  let insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDom();
    e.target.value = '';

    score++;
    scoreEl.innerText = score;

    if(difficulty === 'hard') {
      time += 2;
    } else if(difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('click', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
