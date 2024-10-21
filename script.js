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

// Add click event to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

// Handle cell click
function handleCellClick(index) {
  if (board[index] || winnerPopup.style.display === 'flex') {
    return; // Cell already filled or game is over
  }
  
  board[index] = currentPlayer;
  cells[index].innerText = currentPlayer; // Show the current player's symbol

  if (checkWin()) {
    handleWin();
  } else if (board.every(cell => cell)) {
    handleDraw();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  }
}

// Check for win
function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    const hasWon = board[a] && board[a] === board[b] && board[a] === board[c];
    if (hasWon) {
      // Mark winning cells
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
    }
    return hasWon;
  });
}

// Handle win
function handleWin() {
  winnerMessage.innerText = `${currentPlayer} Wins!`;
  winnerPopup.style.display = 'flex'; // Show the winner popup

  if (currentPlayer === 'X') {
    playerXWins++;
    playerXWinsDisplay.innerText = playerXWins;
  } else {
    playerOWins++;
    playerOWinsDisplay.innerText = playerOWins;
  }
}

// Handle draw
function handleDraw() {
  winnerMessage.innerText = "It's a Draw!";
  winnerPopup.style.display = 'flex'; // Show the winner popup
  draws++;
  drawsDisplay.innerText = draws; // Update draws display
}

// Restart the game
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);

function restartGame() {
  board.fill(''); // Reset the board
  cells.forEach(cell => {
    cell.innerText = ''; // Clear cell display
    cell.classList.remove('winner'); // Remove winner class
  });
  currentPlayer = 'X'; // Reset current player
  winnerPopup.style.display = 'none'; // Hide popup
}
