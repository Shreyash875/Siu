let board = ['', '', '', '', '', '', '', '', '']; // Game board
let currentPlayer = 'X'; // Current player
let playerXWins = 0; // Player X wins counter
let playerOWins = 0; // Player O wins counter
let draws = 0; // Draws counter

const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const playerXWinsDisplay = document.getElementById('playerXWins');
const playerOWinsDisplay = document.getElementById('playerOWins');
const drawsDisplay = document.getElementById('draws');
const restartButton = document.getElementById('restartButton');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const newGameButton = document.getElementById('newGameButton');

// Winning conditions
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

// Handle cell click function
function handleCellClick(index) {
  if (board[index] !== '' || winnerPopup.style.display === 'flex') return;

  board[index] = currentPlayer;
  cellDisplay(index);

  if (checkWin()) {
    updateScore(currentPlayer);
    showWinner(currentPlayer);
  } else if (board.every(cell => cell !== '')) {
    draws++;
    drawsDisplay.textContent = draws;
    showWinner('Draw');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Display player move in the cell
function cellDisplay(index) {
  cells[index].textContent = board[index];
  cells[index].classList.add(currentPlayer === 'X' ? 'x' : 'o');
}

// Check for a win
function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Update score
function updateScore(winner) {
  if (winner === 'X') {
    playerXWins++;
    playerXWinsDisplay.textContent = playerXWins;
  } else if (winner === 'O') {
    playerOWins++;
    playerOWinsDisplay.textContent = playerOWins;
  }
}

// Show winner popup
function showWinner(winner) {
  winnerMessage.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
  winnerPopup.style.display = 'flex';

  // Add winner class to winning cells
  if (winner !== 'Draw') {
    winConditions.forEach(condition => {
      const [a, b, c] = condition;
      if (board[a] === winner && board[b] === winner && board[c] === winner) {
        cells[a].classList.add('winner');
        cells[b].classList.add('winner');
        cells[c].classList.add('winner');
      }
    });
  }
}

// Restart game
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winner');
  });
  winnerPopup.style.display = 'none';
}

// Optional: Add functionality to close the popup
winnerPopup.addEventListener('click', () => {
  winnerPopup.style.display = 'none';
});
