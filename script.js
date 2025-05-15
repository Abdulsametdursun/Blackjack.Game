//* Selecting Elements
const player = document.querySelector('.player');
const dealer = document.querySelector('.dealer');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const midCardEl = document.querySelector('.midCard');
const btnNew = document.querySelector('.btn--new');
const btnGet = document.querySelector('.btn--get');
const btnHold = document.querySelector('.btn--hold');
const btnStart = document.querySelector('.btn--start');
const messageEl = document.getElementById('message');

let scores, currentScore, activePlayer, totalCards, playing;
let current1El, current2El, current3El, current4El;

function addCardToHand(imageSrc, playerElement) {
  const newCard = document.createElement('img');
  newCard.src = imageSrc;
  newCard.style.width = '60px';
  newCard.style.margin = '5px';
  playerElement.appendChild(newCard);
}

//* Starting Conditions Function
const init = function () {
  document.querySelector('.player .current').innerHTML = `
  <p class="current-label">ON HAND</p>
  <img src="0.png" alt="Playing card" class="card" id="current--1" />
  <img src="0.png" alt="Playing card" class="card" id="current--2" />
`;

  document.querySelector('.dealer .current').innerHTML = `
  <p class="current-label">ON HAND</p>
  <img src="0.png" alt="Playing card" class="card" id="current--3" />
  <img src="0.png" alt="Playing card" class="card" id="current--4" />
`;

  current1El = document.getElementById('current--1');
  current2El = document.getElementById('current--2');
  current3El = document.getElementById('current--3');
  current4El = document.getElementById('current--4');

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

  btnGet.disabled = true;
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
    btnGet.disabled = false;
  }
});

const playerHand = document.querySelector('.player .current');
const dealerHand = document.querySelector('.dealer .current');

//* Generate a random card number when Player gets a new card
btnGet.addEventListener('click', function () {
  if (playing) {
    const getCard = Math.floor(Math.random() * 13) + 1;
    midCardEl.classList.remove('hidden');
    midCardEl.src = `${getCard}.png`;

    if (activePlayer === 0) {
      addCardToHand(midCardEl.src, playerHand);
    } else {
      addCardToHand(midCardEl.src, dealerHand);
    }

    currentScore += getCard;
    scores[activePlayer] = currentScore;

    if (scores[activePlayer] === 21) {
      messageEl.textContent = `${activePlayer === 0 ? 'You' : 'Dealer'} Win!`;
      messageEl.classList.remove('hidden');
      if (activePlayer === 0) player.classList.add('player--winner');
      else dealer.classList.add('player--winner');
      playing = false;
    } else if (scores[activePlayer] > 21) {
      messageEl.textContent = `${activePlayer === 0 ? 'You' : 'Dealer'} Lose!`;
      messageEl.classList.remove('hidden');
      if (activePlayer === 0) player.classList.add('player--looser');
      else dealer.classList.add('player--looser');
      playing = false;
    } else {
      if (activePlayer === 0) score0El.textContent = scores[0];
      else score1El.textContent = scores[1];
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

      dealerPlay();

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

//* Dealer automatic play function
const dealerPlay = function () {
  while (scores[1] < 17) {
    const newCard = Math.floor(Math.random() * 13) + 1;
    currentScore += newCard;
    scores[1] = currentScore;
    score1El.textContent = scores[1];

    addCardToHand(`${newCard}.png`, dealerHand);
  }

  // Determine winner
  if (scores[1] > 21) {
    messageEl.textContent = 'Player Wins!';
    dealer.classList.add('player--looser');
  } else if (scores[1] > scores[0]) {
    messageEl.textContent = 'Dealer Wins!';
    dealer.classList.add('player--winner');
  } else if (scores[0] > scores[1]) {
    messageEl.textContent = 'Player Wins!';
    player.classList.add('player--winner');
  } else {
    messageEl.textContent = "It's a tie!";
  }

  dealer.classList.remove('player--active');
  messageEl.classList.remove('hidden');
  playing = false;
};

const switchPlayer = function () {
  currentScore = 0; // Reset the current score for the new active player
  activePlayer = activePlayer === 0 ? 1 : 0; // Toggle between player and dealer
  player.classList.toggle('player--active');
  dealer.classList.toggle('player--active');
};

btnNew.addEventListener('click', init);

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('howToPlayModal');
  const closeBtn = document.getElementById('closeModalBtn');

  // Show popup when page loads
  modal.style.display = 'flex';

  // Close popup
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});
