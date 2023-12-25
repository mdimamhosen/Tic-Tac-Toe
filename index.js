// Selecting elements from the DOM
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Initialize game variables
let currentPlayer;
let gameGrid;

// Define winning positions on the game board
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to initialize the game state
function initialize() {
  // Set the initial player to X
  currentPlayer = "X";
  gameInfo.textContent = `Current Player-${currentPlayer}`;

  // Empty the game grid and reset the visual state of boxes
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      handleClick(index);
    });

    // Reset box content and styles
    box.innerHTML = "";
    box.style.pointerEvents = "all";
    box.classList.remove("win");
  });

  // Reset the new game button state
  newGameBtn.classList.remove("active");
}

// Initialize the game on page load
initialize();

// Function to handle box click events
function handleClick(index) {
  // Check if the selected box is empty
  if (gameGrid[index] === "") {
    // Set the box content based on the current player
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;

    // Check for a winner or a tie
    checkGameOver();

    // Switch to the next player's turn
    swapTurn();

    // Disable further clicks on the selected box
    boxes[index].style.pointerEvents = "none";
  }
}

// Function to switch turns between players
function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.textContent = `Current Player-${currentPlayer}`;
  checkGameOver();
}

// Function to check if the game is over
function checkGameOver() {
  let winner = "";

  // Check for a winner based on winning positions
  winningPositions.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // Highlight winning boxes and disable further clicks
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      winner = gameGrid[position[0]];
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  let win = 1;
  // Display the winner and activate the new game button
  if (winner !== "") {
    gameInfo.textContent = `Winner is - ${winner}`;
    win = 0;
    newGameBtn.classList.add("active");
  }

  // Check for a tie if there is no winner
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9 && win === 1) {
    gameInfo.textContent = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

// Add an event listener to the new game button to initialize a new game
newGameBtn.addEventListener("click", initialize);
