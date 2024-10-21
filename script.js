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

// Event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');

  // If the cell is already taken or the game is over
  if (board[index] || winnerMessage.innerText) return;

  // Update the board and the UI
  board[index] = currentPlayer;
  event.target.innerText = currentPlayer;
  event.target.classList.add(currentPlayer === 'X' ? 'x' : 'o');

  // Check for a winner or a draw
  if (checkWin()) {
    setTimeout(() => {
      displayWinner(currentPlayer);
    }, 100);
  } else if (board.every(cell => cell)) {
    draws++;
    drawsDisplay.innerText = draws;
    setTimeout(() => {
      displayWinner('Draw');
    }, 100);
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check for a win
function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Highlight winning cells
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      // Update score
      if (board[a] === 'X') {
        playerXWins++;
        playerXWinsDisplay.innerText = playerXWins;
      } else {
        playerOWins++;
        playerOWinsDisplay.innerText = playerOWins;
      }
      return true;
    }
    return false;
  });
}

// Display winner
function displayWinner(winner) {
  winnerMessage.innerText = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
  winnerPopup.style.display = 'flex';
}

// Reset game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X'; // Reset current player
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o', 'winner');
  });
  winnerPopup.style.display = 'none'; // Hide popup
  winnerMessage.innerText = ''; // Clear winner message
}
