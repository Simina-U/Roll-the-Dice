'user strict';

//Selection of all DOM elements needed to interact with
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
const currScPlayer1 = document.querySelector('#current--0');
const currScPlayer2 = document.querySelector('#current--1');
const namePlayer1 = document.querySelector('.name-player--0');
const namePlayer2 = document.querySelector('.name-player--1');

const diceEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn-new');
const rollDice = document.querySelector('.btn-roll');
const holdScore = document.querySelector('.btn-hold');

const initialValues = function () {
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  currScPlayer1.textContent = 0;
  currScPlayer2.textContent = 0;

  diceEl.classList.add('hidden');

  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  player0.classList.add('player-active');
  namePlayer1.classList.remove('hidden');
  namePlayer2.classList.remove('hidden');
  document.querySelector('#winner--0--message').classList.add('hidden');
  document.querySelector('#winner--1--message').classList.add('hidden');
  document.querySelector('#score--0').classList.remove('hidden');
  document.querySelector('#score--1').classList.remove('hidden');
};
initialValues();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};
//Roll button implementation
rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      if (currentScore > 30) {
        playing = false;
        diceEl.classList.add('hidden');

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player-winner');
        document
          .querySelector(`.name-player--${activePlayer}`)
          .classList.add('hidden');
        document
          .querySelector(`#winner--${activePlayer}--message`)
          .classList.remove('hidden');
        document
          .querySelector(`#score--${activePlayer}`)
          .classList.add('hidden');
      } else {
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      }
    } else {
      switchPlayer();
    }
  }
});

holdScore.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.name-player--${activePlayer}`)
        .classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-winner');

      document
        .querySelector(`#winner--${activePlayer}--message`)
        .classList.remove('hidden');

      document.querySelector(`#score--${activePlayer}`).classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
newGameBtn.addEventListener('click', initialValues);
