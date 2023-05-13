// Get references to the buttons
const playButton = document.getElementById('playbutton');
const cardButton1 = document.getElementById('cardbutton1');
const cardButton2 = document.getElementById('cardbutton2');
const cardButton3 = document.getElementById('cardbutton3');
const cardButton4 = document.getElementById('cardbutton4');
const sButton = document.getElementById('sButton');
const rButton = document.getElementById('rButton');
const eButton = document.getElementById('eButton');
const sText = document.getElementById('sText');
const rText = document.getElementById('rText');

// Add event listeners to the buttons
playButton.addEventListener('click', playButtonFunction);
cardButton1.addEventListener('click', cardButton1Function);
cardButton2.addEventListener('click', cardButton2Function);
cardButton3.addEventListener('click', cardButton3Function);
cardButton4.addEventListener('click', cardButton4Function);
sButton.addEventListener('click', sButtonFunction);
rButton.addEventListener('click', rButtonFunction);
eButton.addEventListener('click', eButtonFunction);

// game variables
let sDeck = shuffle([2,2,2,3,3,3,4,4,4,5,5,5,9,9,9]);
let rDeck = shuffle([3,3,3,4,4,4,5,5,5,7,7,7,6,6,6]);
let hand = [];
let locked = false;
let secondPlay = false;
let innit = false;
let lastPressed = 0;
let selectedCard = 0;
let sValue = 0;
let rValue = 0;

// game logic
function playButtonFunction() {  
  if (!innit) return;
  
  if(lastPressed == 3) return;
  
  if(lastPressed == 2 && !secondPlay) {
    rValue = hand[selectedCard];
    
    hand.splice(selectedCard, 1);
    
    rDeck = hand.concat(rDeck);
    
    sDeck = drawCards(sDeck);
    
    lastPressed = 1;
    secondPlay = true;
    
    sButton.style.backgroundColor = "rgb(123,240,138)";
    rButton.style.backgroundColor = "#B2F6FFC4";
    return;
  }
  
  if(lastPressed == 2 && secondPlay) {
    rValue = hand[selectedCard];
    
    hand.splice(selectedCard, 1);
    
    rDeck = hand.concat(rDeck);
        
    resetButtons();
    locked = false;
    lastPressed = 0;
    secondPlay = false;
    
    rButton.style.backgroundColor = "#B2F6FFC4";
    return;
  }
  
  if(lastPressed == 1 && !secondPlay) {
    sValue = hand[selectedCard];
    
    hand.splice(selectedCard, 1);
    
    sDeck = hand.concat(sDeck);
    
    rDeck = drawCards(rDeck);
    lastPressed = 2;
    secondPlay = true;
    
    sButton.style.backgroundColor = "#B2F6FFC4";
    rButton.style.backgroundColor = "rgb(123,240,138)";
    return;
  }
  
  if(lastPressed == 1 && secondPlay) {
    sValue = hand[selectedCard];
    
    hand.splice(selectedCard, 1);
    
    sDeck = hand.concat(sDeck);
    
    resetButtons();
    locked = false;
    lastPressed = 0;
    secondPlay = false;
    
    sButton.style.backgroundColor = "#B2F6FFC4";
    return;
  }
}


function sButtonFunction() {
  innit = true;
  
  if(locked) return;
  
  if(lastPressed == 3){
    sDeck = [2].concat(sDeck);
    eButton.style.backgroundColor = "#B2F6FFC4";
    lastPressed = 0;
    return;
  }
  
  sButton.style.backgroundColor = "rgb(123,240,138)";
  locked = true;
  lastPressed = 1;

  sDeck = drawCards(sDeck);
}

function rButtonFunction() {
  innit = true;
  
  if(locked) return;
  
  if(lastPressed == 3){
    rDeck = [2].concat(rDeck);
    eButton.style.backgroundColor = "#B2F6FFC4";
    lastPressed = 0;
    return;
  }
  
  rButton.style.backgroundColor = "rgb(123,240,138)";
  locked = true;
  lastPressed = 2;
  
  rDeck = drawCards(rDeck);
}

function eButtonFunction() {
  if (!innit) return;
  if(locked) return;
  if(lastPressed == 3){
    lastPressed = 0;
    eButton.style.backgroundColor = "#B2F6FFC4";
  }
  else {
    lastPressed = 3;
    eButton.style.backgroundColor = "rgb(123,240,138)";
  }
}


function cardButton1Function() {
  if (!innit) return;
  selectedCard = 0;
  cardButton1.style.backgroundColor = "rgb(123,240,138)";
  cardButton2.style.backgroundColor = "#B2F6FFC4";
  cardButton3.style.backgroundColor = "#B2F6FFC4";
  cardButton4.style.backgroundColor = "#B2F6FFC4";
}

function cardButton2Function() {
  if (!innit) return;
  selectedCard = 1;
  cardButton2.style.backgroundColor = "rgb(123,240,138)";
  cardButton1.style.backgroundColor = "#B2F6FFC4";
  cardButton3.style.backgroundColor = "#B2F6FFC4";
  cardButton4.style.backgroundColor = "#B2F6FFC4";
}

function cardButton3Function() {
  if (!innit) return;
  selectedCard = 2;
  cardButton3.style.backgroundColor = "rgb(123,240,138)";
  cardButton2.style.backgroundColor = "#B2F6FFC4";
  cardButton1.style.backgroundColor = "#B2F6FFC4";
  cardButton4.style.backgroundColor = "#B2F6FFC4";
}

function cardButton4Function() {
  if (!innit) return;
  selectedCard = 3;
  cardButton4.style.backgroundColor = "rgb(123,240,138)";
  cardButton2.style.backgroundColor = "#B2F6FFC4";
  cardButton3.style.backgroundColor = "#B2F6FFC4";
  cardButton1.style.backgroundColor = "#B2F6FFC4";
}


// Define the shuffle function
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return [0].concat(array);
}

function drawCards(array) {
  hand = [];
  
  for(let i = 0; i < 4; ++i) {
    let temp = 2;
    
    if(!array.length == 0) temp = array.pop();
    
    if(temp == 0) {
      temp = 2;
      if(!array.length == 0){
        array = shuffle(array);
        temp = array.pop();
      }
    }
    
    hand.push(temp);
  }
  
  cardButton1.textContent = hand[0];
  cardButton2.textContent = hand[1];
  cardButton3.textContent = hand[2];
  cardButton4.textContent = hand[3];
  
  return array;
}

function resetButtons(){
  cardButton2.style.backgroundColor = "#B2F6FFC4";
  cardButton3.style.backgroundColor = "#B2F6FFC4";
  cardButton1.style.backgroundColor = "#B2F6FFC4";
  cardButton4.style.backgroundColor = "#B2F6FFC4";
  cardButton1.textContent = "X";
  cardButton2.textContent = "X";
  cardButton3.textContent = "X";
  cardButton4.textContent = "X";
  rText.textContent = "Rouleur Value: " + rValue;
  sText.textContent = "Sprinter Value: " + sValue;
}

/*
function debug(){
  console.log(sValue);
  console.log(rValue);
  console.log("================================");
}
*/