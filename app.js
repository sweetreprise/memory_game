const card = document.getElementsByClassName('card');
const scoreboard = document.getElementById('scoreboard');
const restartBtn = document.querySelector('button');
let cards = [...card];

const COLORS = [
    "pink",
    "pink",
    "blue",
    "blue",
    "green",
    "green",
    "yellow",
    "yellow",
    "lilac",
    "lilac",
    "orange",
    "orange",
    "lightblue",
    "lightblue",
    "grey",
    "grey"
  ];

//to shuffle the COLORS array
  function shuffle(array) {
    let counter = array.length;
  
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
  
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
  }

let shuffledColors = shuffle(COLORS);

//to assign each div element with a colour + loop through each one to listen for a click
function assignColors(colorArray) {
    for(let i = 0; i < cards.length; i++) {
        cards[i].classList.add(shuffledColors[i]);

        cards[i].addEventListener('click', cardClicked);
    }
}

assignColors(shuffledColors);


let openCards = [];
let flipped = [];
let score = 0;
let matches = 0;
let locked = false;

function cardClicked(e) {

  if (locked) return;
  e.target.setAttribute('data-type', '');
  openCards.push(e.target.className);
  flipped.push(e);

  e.target.classList.add('flipped');
  

  if (openCards.length === 2) {

    locked = true;

    if(openCards[0] === openCards[1]) {
      score += 10;
      matches++;
      scoreboard.innerText = `SCORE: ${score}`;
      reset();
      locked = false;

    } else {
      setTimeout(() => {
        flipped[0].target.setAttribute('data-type', 'hidden');
        flipped[1].target.setAttribute('data-type', 'hidden');
        reset();
        locked = false;
      }, 1000);

      score -= 2;
      scoreboard.innerText = `SCORE: ${score}`;
      flipped[0].target.classList.remove('flipped');
      flipped[1].target.classList.remove('flipped');
    }
  }
  

  if (matches === COLORS.length / 2) {
    setTimeout(() => {
    alert('YOU WON!!');
    restart();
    }, 500);
  }
}

restartBtn.addEventListener('click', function(){
  restart();
  reset();
})

function restart() {
  score = 0;
  matches = 0;
  scoreboard.innerText = `SCORE: ${score}`;
    for (let card of cards) {
    card.className = "card";
    card.setAttribute('data-type', 'hidden');
    }

    shuffle(COLORS);
    assignColors(shuffledColors);
}

function reset() {
  openCards = [];
  flipped = [];
}