//* Selecting Elements
const player = document.querySelector('.player');
const dealer = document.querySelector('.dealer');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');
const current3El = document.getElementById('current--3');
const current4El = document.getElementById('current--4');
const midCardEl = document.querySelector('.midCard');
const btnNew = document.querySelector('.btn--new');
const btnGet = document.querySelector('.btn--get');
const btnHold = document.querySelector('.btn--hold');
const btnStart = document.querySelector('.btn--start');
const messageEl = document.getElementById('message');

let scores, currentScore, activePlayer, totalCards, playing;

//* Starting Conditions Function
const init = function () {
  scores = [0, 0];
  totalCards = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current1El.src = `0.png`;
  current2El.src = `0.png`;
  current3El.src = `0.png`;
  current4El.src = `0.png`;

  midCardEl.classList.add('hidden');
  messageEl.classList.add('hidden');
  messageEl.textContent = '';

  player.classList.remove('player--winner', 'player--looser', 'player--active');
  dealer.classList.remove('player--winner', 'player--looser', 'player--active');
  player.classList.add('player--active'); // Player starts first
};
init();

//* Generate 2 random numbers and show cards for both Player and Dealer
btnStart.addEventListener('click', function () {
  if (playing) {
    // Generate two random numbers for Player
    const card1 = Math.floor(Math.random() * 13) + 1;
    const card2 = Math.floor(Math.random() * 13) + 1;
    current1El.src = `${card1}.png`;
    current2El.src = `${card2}.png`;

    // Calculate player's initial total score and set it to currentScore
    currentScore = card1 + card2;
    scores[0] = currentScore;
    score0El.textContent = scores[0];

    // Check if player hits 21 and wins immediately
    if (scores[0] === 21) {
      playing = false;
      messageEl.textContent = 'You Win!';
      messageEl.classList.remove('hidden');
      player.classList.add('player--winner');
      player.classList.remove('player--active');
    }

    // Check if player loses immediately (score > 21)
    if (scores[0] > 21) {
      playing = false;
      messageEl.textContent = 'You Lose!';
      messageEl.classList.remove('hidden');
      player.classList.add('player--looser');
      player.classList.remove('player--active');
    }
  }
});

//* Generate a random card number when Player gets a new card
btnGet.addEventListener('click', function () {
  if (playing) {
    // Get a random card value
    const getCard = Math.floor(Math.random() * 13) + 1;
    midCardEl.classList.remove('hidden');
    midCardEl.src = `${getCard}.png`;

    // Add the value of the new card to the current active player's score
    currentScore += getCard;
    scores[activePlayer] = currentScore;

    // Check if the current score is exactly 21 for the active player
    if (scores[activePlayer] === 21) {
      messageEl.textContent = `${activePlayer === 0 ? 'You' : 'Dealer'} Win!`;
      messageEl.classList.remove('hidden');
      if (activePlayer === 0) {
        player.classList.add('player--winner');
      } else {
        dealer.classList.add('player--winner');
      }
      playing = false; // Stop the game
    }
    // Check if the current score exceeds 21
    else if (scores[activePlayer] > 21) {
      messageEl.textContent = `${activePlayer === 0 ? 'You' : 'Dealer'} Lose!`;
      messageEl.classList.remove('hidden');
      if (activePlayer === 0) {
        player.classList.add('player--looser');
      } else {
        dealer.classList.add('player--looser');
      }
      playing = false; // Stop the game
    } else {
      // Update the total score for the active player (either player or dealer)
      if (activePlayer === 0) {
        score0El.textContent = scores[0];
      } else {
        score1El.textContent = scores[1];
      }
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // If it's the player's turn
    if (activePlayer === 0) {
      // Switch to dealer's turn
      switchPlayer();

      // Generate two random numbers for Dealer
      const card3 = Math.floor(Math.random() * 13) + 1;
      const card4 = Math.floor(Math.random() * 13) + 1;
      current3El.src = `${card3}.png`;
      current4El.src = `${card4}.png`;

      // Calculate dealer's initial total score and show it
      currentScore = card3 + card4;
      scores[1] = currentScore;
      score1El.textContent = scores[1];

      // Check if dealer hits 21 and wins immediately
      if (scores[1] === 21) {
        playing = false;
        messageEl.textContent = 'Dealer Wins!';
        messageEl.classList.remove('hidden');
        dealer.classList.add('player--winner');
        dealer.classList.remove('player--active');
      }

      // Check if dealer loses immediately (score > 21)
      if (scores[1] > 21) {
        playing = false;
        messageEl.textContent = 'Player Wins!';
        messageEl.classList.remove('hidden');
        dealer.classList.add('player--looser');
        dealer.classList.remove('player--active');
      }
    }
    // If it's the dealer's turn and btnHold is clicked again
    else if (activePlayer === 1) {
      // Compare scores and declare winner based on who has more points
      if (scores[1] > scores[0]) {
        messageEl.textContent = 'Dealer Wins!';
        messageEl.classList.remove('hidden');
        dealer.classList.add('player--winner');
        dealer.classList.remove('player--active');
      } else if (scores[0] > scores[1]) {
        messageEl.textContent = 'Player Wins!';
        messageEl.classList.remove('hidden');
        player.classList.add('player--winner');
        dealer.classList.remove('player--active');
      } else {
        // In case of a tie
        messageEl.textContent = "It's a tie!";
        messageEl.classList.remove('hidden');
      }
      playing = false; // End the game
    }
  }
});

//* Switch player function
const switchPlayer = function () {
  currentScore = 0; // Reset the current score for the new active player
  activePlayer = activePlayer === 0 ? 1 : 0; // Toggle between player and dealer
  player.classList.toggle('player--active');
  dealer.classList.toggle('player--active');
};

btnNew.addEventListener('click', init);
