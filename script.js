'use strict';

// Selecting Elements
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
const score_0 = document.querySelector('#score--0');
const score_1 = document.querySelector('#score--1');
const current_0 = document.querySelector('#current--0');
const current_1 = document.querySelector('#current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const btnRules = document.querySelector('.btn--rules');

let activePlayer, score, current_score, playing;

// Inits or Resets the game.
const Reset = function () {
  score = [0, 0];
  current_score = 0;
  activePlayer = 0;
  playing = true;

  score_0.textContent = 0;
  score_1.textContent = 0;
  current_0.textContent = 0;
  current_1.textContent = 0;

  dice.classList.add('hidden');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
  player_0.classList.add('player--active');
  player_1.classList.remove('player--active');

  document.querySelector(`.current-label--0`).textContent = 'Current';
  document.querySelector(`.current-label--1`).textContent = 'Current';
};

Reset();

// switchs player
const switchPlayer = function () {
  if (playing)
    document.getElementById(`current--${activePlayer}`).textContent = 0;

  current_score = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
};

// Rolling the Dice.
const RollDice = function () {
  if (playing) {
    // Generate a dice number
    let Dice = Math.trunc(Math.random() * 6) + 1;

    dice.setAttribute('src', `dice-${Dice}.png`);
    dice.classList.remove('hidden');

    // if dice is 1 reset player score and switch.
    if (Dice == 1) {
      switchPlayer();
    } else {
      // Add & display score
      current_score += Dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = current_score;
    }
  }
};

// add Score for active player
const Hold = function () {
  if (playing) {
    //add current points to score
    score[activePlayer] += current_score;

    //display score.
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    CheckWin(activePlayer);
    switchPlayer();
  }
};

// Check Winner.
const CheckWin = function (activePlayer) {
  if (score[activePlayer] >= 100) {
    //add winner mode effects.
    document.querySelector(`#current--${activePlayer}`).textContent = '💯';

    document.querySelector(`.current-label--${activePlayer}`).textContent =
      'Winner 🎉';

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    //hide dice and stop playing.
    dice.classList.add('hidden');
    playing = false;
  }
};

// New Game.
btnNew.addEventListener('click', Reset);

// Roll the Dice.
btnRoll.addEventListener('click', RollDice);

//Hold
btnHold.addEventListener('click', Hold);

// Hide Rules
btnRules.addEventListener('click', function () {
  document.querySelector('.rules').classList.add('hiddenRules');
  document.querySelector('main').classList.remove('blur');
  document.querySelector('main').classList.remove('blur');
});
