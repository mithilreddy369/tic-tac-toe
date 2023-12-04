// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to check for a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'T'; // Tie
    }

    return null; // No winner yet
};

// Function to handle cell click
const handleCellClick = (index) => {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    document.getElementById(`cell-${index}`).innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        displayResult(winner);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

// Function to display the result
const displayResult = (winner) => {
    const resultElement = document.getElementById('result');
    if (winner === 'T') {
        resultElement.innerText = "It's a Tie!";
    } else {
        resultElement.innerText = `Player ${winner} wins!`;
    }
};

// Function to reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('result').innerText = '';
    
    // Reset the board display
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = '';
    });
};

// Dynamically generate the game board
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
}
