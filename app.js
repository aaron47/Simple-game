let scores, roundScore, activePlayer, gamePlaying;

init();

// let lastDice;

let rollBtn = document.querySelector('.btn-roll');
rollBtn.addEventListener('click',() => {
  if(gamePlaying) {
      // 1. Random number
      let dice1 = Math.floor(Math.random() * 6) + 1;
      let dice2 = Math.floor(Math.random() * 6) + 1;

      //2. Display the result
      document.querySelector('.dice1').style.display = 'block';
      document.querySelector('.dice2').style.display = 'block';
      document.querySelector('.dice1').src = 'dice-' + dice1 + '.png';
      document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';

      //3. Update the round score IF the rolled number was NOT a 1
      if (dice1 !== 1 && dice2 !== 1) {
          //Add score
          roundScore += dice1 + dice2;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
          //Next player
          nextPlayer();
      }
      
      /*
      if (dice === 6 && lastDice === 6) {
          //Player looses score
          scores[activePlayer] = 0;
          document.querySelector('#score-' + activePlayer).textContent = '0';
          nextPlayer();
      } else if (dice !== 1) {
          //Add score
          roundScore += dice;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
          //Next player
          nextPlayer();
      }
      lastDice = dice;
      */
  }    
});

let holdBtn = document.querySelector('.btn-hold');
holdBtn.addEventListener('click', () => {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.getElementById('score-' + activePlayer).innerText = scores[activePlayer];
    // check if player won the game
    let input = document.querySelector('.win-input');
    if (scores[activePlayer] >= input.value) {
      document.getElementById('name-' + activePlayer).innerText = 'Winner!';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.win-input').disabled = true;
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
})

function nextPlayer () {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init)

function init () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  

  document.getElementById('score-0').innerText = 0;
  document.getElementById('score-1').innerText = 0;
  document.getElementById('current-0').innerText = 0;
  document.getElementById('current-1').innerText = 0;

  document.getElementById('name-0').innerText = 'Player 1';
  document.getElementById('name-1').innerText = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.win-input').disabled = false;
  document.querySelector('.win-input').value = '';
}