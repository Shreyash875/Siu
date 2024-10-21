const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const newGameButton = document.getElementById('newGameButton');

const playerXWins = document.getElementById('playerXWins');
const playerOWins = document.getElementById('playerOWins');
const draws = document.getElementById('draws');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let xWins = 0, oWins = 0, drawCount = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Event listeners for each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Function to handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  // If the cell is already filled or there's a winner, do nothing
  if (gameState[index] || checkWinner()) return;

  // Update game state
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer; // Show current player's symbol

  // Check for a winner
  if (checkWinner()) {
    currentPlayer === 'X' ? xWins++ : oWins++;
    updateScore();
    showWinner(`Player ${currentPlayer} wins!`);
  } else if (gameState.every(Boolean)) { // Check for draw
    drawCount++;
    updateScore();
    showWinner('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
  }
}

// Function to check for a winner
function checkWinner() {
  return winningCombinations.some(combination =>
    combination.every(index => gameState[index] === currentPlayer)
  );
}

// Function to update the scoreboard
function updateScore() {
  playerXWins.textContent = xWins;
  playerOWins.textContent = oWins;
  draws.textContent = drawCount;
}

// Function to show winner message
function showWinner(message) {
  winnerMessage.textContent = message;
  winnerPopup.style.display = 'flex';
}

// Event listener for new game button
newGameButton.addEventListener('click', restartGame);

// Function to restart the game
function restartGame() {
  gameState.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X'; // Reset current player to X
  winnerPopup.style.display = 'none'; // Hide winner popup
}
