//* Selecting Elements
//* Get references to all necessary UI elements
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

//* Cheat Mode Toggle and Card Biasing
//* Enable cheat mode (toggleable with 'C' key)
let cheatMode = true;
document.addEventListener('keydown', function (e) {
  if (e.key === 'c') {
    cheatMode = !cheatMode;
    console.log(`Cheat mode is now ${cheatMode ? 'ON' : 'OFF'}`);
  }
});

//* Custom card draw function with dealer cheat bias
//* Function to draw a random card, biased if cheat mode is on and it's the dealer
function getRandomCard() {
  const allCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const lowCards = [2, 3, 4, 5];
  if (cheatMode && activePlayer === 1 && Math.random() < 0.4) {
    return lowCards[Math.floor(Math.random() * lowCards.length)];
  }
  return allCards[Math.floor(Math.random() * allCards.length)];
}

//* Function to visually add a card image to the hand display
function addCardToHand(imageSrc, playerElement) {
  const newCard = document.createElement('img');
  newCard.src = imageSrc;
  newCard.style.width = '60px';
  newCard.style.margin = '5px';
  playerElement.appendChild(newCard);
}

//* Starting Conditions Function
//* Reset the game to initial state (new game)
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
  player.classList.add('player--active');

  btnGet.disabled = true;
  btnHold.disabled = true;
};
init();

//* Generate 2 random numbers and show cards for both Player and Dealer
//* Handle start button click: deal 2 cards to player
btnStart.addEventListener('click', function () {
  if (playing) {
    const card1 = getRandomCard();
    const card2 = getRandomCard();
    current1El.src = `${card1}.png`;
    current2El.src = `${card2}.png`;

    currentScore = card1 + card2;
    scores[0] = currentScore;
    score0El.textContent = scores[0];

    if (scores[0] === 21) {
      playing = false;
      messageEl.textContent = 'You Win!';
      messageEl.classList.remove('hidden');
      player.classList.add('player--winner');
      player.classList.remove('player--active');
    }

    if (scores[0] > 21) {
      playing = false;
      messageEl.textContent = 'You Lose!';
      messageEl.classList.remove('hidden');
      player.classList.add('player--looser');
      player.classList.remove('player--active');
    }
    btnGet.disabled = false;
    btnHold.disabled = false;
  }
});

const playerHand = document.querySelector('.player .current');
const dealerHand = document.querySelector('.dealer .current');

//* Handle Get Card button: add one card to current player
btnGet.addEventListener('click', function () {
  if (playing) {
    const getCard = getRandomCard();
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

//* Handle Hold button: switch to dealer and evaluate outcome
btnHold.addEventListener('click', function () {
  if (playing) {
    if (activePlayer === 0) {
      switchPlayer();
      const card3 = getRandomCard();
      const card4 = getRandomCard();
      current3El.src = `${card3}.png`;
      current4El.src = `${card4}.png`;

      currentScore = card3 + card4;
      scores[1] = currentScore;
      score1El.textContent = scores[1];

      dealerPlay();

      if (scores[1] === 21) {
        playing = false;
        messageEl.textContent = 'Dealer Wins!';
        messageEl.classList.remove('hidden');
        dealer.classList.add('player--winner');
        dealer.classList.remove('player--active');
      }

      if (scores[1] > 21) {
        playing = false;
        messageEl.textContent = 'Player Wins!';
        messageEl.classList.remove('hidden');
        dealer.classList.add('player--looser');
        dealer.classList.remove('player--active');
      }
    } else if (activePlayer === 1) {
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
        messageEl.textContent = "It's a tie!";
        messageEl.classList.remove('hidden');
      }
      playing = false;
    }
  }
});

//* Dealer's automatic logic for hitting until reaching 17
const dealerPlay = function () {
  while (scores[1] < 17) {
    const newCard = getRandomCard();
    currentScore += newCard;
    scores[1] = currentScore;
    score1El.textContent = scores[1];

    addCardToHand(`${newCard}.png`, dealerHand);
  }

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

//* Switch the active player (player ↔ dealer)
const switchPlayer = function () {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player.classList.toggle('player--active');
  dealer.classList.toggle('player--active');
};

//* Handle New Game button click: call init()
btnNew.addEventListener('click', init);

//* Show popup modal with 'how to play' instructions when page loads
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('howToPlayModal');
  const closeBtn = document.getElementById('closeModalBtn');
  modal.style.display = 'flex';
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});
