# Blackjack 🃏

A simple Blackjack game implemented using HTML, CSS, and JavaScript.

## Overview

This is a browser-based implementation of the classic Blackjack card game. The player plays against a dealer, aiming to reach a score of 21 without exceeding it. The game provides options to start a new game, get a card, or hold to compare the player's and dealer's scores.

## Features

- **Player vs. Dealer**: The player plays against the dealer, with both aiming to reach a score of 21.
- **Random Card Generation**: Each card drawn is a random number between 1 and 13 (representing typical card values in Blackjack).
- **Player Actions**:
  - `Start game`: Begins a new round.
  - `Get Card`: The player can draw additional cards until they hold or their score exceeds 21.
  - `Hold`: Ends the player's turn and starts the dealer's turn. If the player holds during the dealer's turn, the scores are compared to determine the winner.
- **Responsive Layout**: The game is responsive and works across various screen sizes.
- **Win/Lose/Tie Messages**: The game displays a message when either the player or the dealer wins, loses, or ties.

## How to Play

1. Click **♠️ Start game** to begin.
2. The player will be dealt two random cards. The player can see their cards and score.
3. The player has two options:
   - Click **🃏 Get Card** to draw additional cards.
   - Click **📥 Hold** to end their turn.
4. After the player clicks **📥 Hold**, the dealer will automatically draw two cards. The player can click **📥 Hold** again to compare the scores and determine the winner.
5. If either player or dealer hits exactly 21, they win. If the score exceeds 21, they lose. If both scores are equal, the game is a tie.

## How to Run

1. Clone or download the repository.
2. Open `index.html` in your browser to start the game.
