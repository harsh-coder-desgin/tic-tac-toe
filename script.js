let currentPlayer = 'X';
const gameBoard = Array(9).fill(null); // Empty grid
let player_turn = document.querySelector("#player-turn");
let game_result = document.querySelector("#game-result");


// Access all cells
const cells = document.querySelectorAll('.cell');

// Add click event listener to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle cell click
function updatePlayerTurn() { 
    player_turn.textContent = `Current Player: ${currentPlayer}`; 
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index'); // Get the cell index
    if (!gameBoard[index]) {
        event.target.innerText = currentPlayer;
        gameBoard[index] = currentPlayer;
        
        // Check for a win
        if (checkWin(currentPlayer)) {
            game_result.innerText = `${currentPlayer} wins!`; 
            setTimeout(resetGame, 1000); // Reset the game after a short delay
        } else if (gameBoard.every(cell => cell)) {
            game_result.textContent = `Draw!`;
            setTimeout(resetGame, 1000); // Reset the game after a short delay
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerTurn();
        }
    }
}

// Check for win function
function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            return true;
        }
    }
    return false;
}

// Reset game function
function resetGame() {
    gameBoard.fill(null);
    cells.forEach(cell => {
        cell.innerText = '';
    });
    currentPlayer = 'X';
    updatePlayerTurn();
}
