import Deck from './deck.js';
document.body.className = "background-default";
const players = JSON.parse(localStorage.getItem("players"));
const info = document.getElementById("info");
const player = document.getElementById("player");
const dealer = document.getElementById("dealer");
const wrong = document.getElementById("wrong");
//set the beginning state of the game
let isFirstGuess = true;
let newCard;
let playerName = players[1];
let dealerName = players[0];
let guessedWrong = 0;

const deck = new Deck();
deck.shuffle();
addClick();
updateInfo(playerName, dealerName, "", guessedWrong, false, false);


function drawCard(card){
    let cardPlace = document.querySelectorAll("[data-card-" + card.value + "]");
	let lastPlace = cardPlace[cardPlace.length- 1];
    lastPlace.appendChild(card.getHTML());
    removeClick(cardPlace, card);
}

function addClick(){
    let cardPlacements = document.querySelector('[data-played-cards]');
    for(let i = 0; i < cardPlacements.childElementCount; i++){
        cardPlacements.children[i].addEventListener('click', myClick);
}
}

function myClick(e){
    let v = e.currentTarget.innerText.replace(/(\r\n|\n|\r|♠|♣|♥|♦)/gm, "");
    if(isFirstGuess)
        checkFirstAnswer(v);
    else
        checkSecondAnswer(v);      
}

function removeClick(cardPlace, card){
    let cardPlacements = document.querySelector('[data-played-cards]');
    var data = document.querySelectorAll("[data-card-" + card.value + "]");
    if(cardPlace.length === 4) data[0].removeEventListener('click', myClick);
}

function checkFirstAnswer(value){
    if(deck.numberOfCards === 0) return;
   newCard = deck.getNextCard();
   if(wrightWrong(newCard.value, value)) return;

    let info = higherLower(newCard.value, value) + " than " + value;
    updateInfo(playerName, dealerName, info, guessedWrong, false, false);
    isFirstGuess = false;
}

function checkSecondAnswer(value){
    if(wrightWrong(newCard.value, value)) return;

    isFirstGuess = true;
    let info = playerName +" drink 1!"
    guessedWrong++;
    updateInfo(playerName, dealerName, info, guessedWrong, false, true);
    drawCard(newCard);
}

function higherLower(cardValue, guessedValue){
    let actualValue;
    switch(cardValue) {
        case 'J':
            actualValue = 11;
          break;
        case 'Q':
            actualValue = 12;
          break;
        case 'K':
            actualValue = 13;
            break;
        default:
            actualValue = cardValue;
      }
    let answer = parseInt(actualValue) > parseInt(guessedValue) ? "Higher" : "Lower";
    return answer;
}

function wrightWrong(actualValue, guessedValue){
    let isCorrect = actualValue === guessedValue ? true : false;
    if(isCorrect){
        let info;
        guessedWrong = 0;
        drawCard(newCard);

        if(isFirstGuess) {
        info = dealerName + " drink 2!";
        updateInfo(playerName, dealerName, info, guessedWrong, false, true);
        }else{
        info = dealerName + " drink 1!";
        updateInfo(playerName, dealerName, info, guessedWrong, false, true);
        }

        isFirstGuess = true;
    }
    return isCorrect;
}

function updateInfo(playerName, dealerName, infoText, guessedWrong, nextDealer, nextPlayer){
    if(nextDealer || guessedWrong === 3) {
        getNextDealer(infoText);
        getNextPlayer(infoText); 
        return;
    }
    if(nextPlayer){ getNextPlayer(infoText); return;}

    player.innerText = playerName + " pick a card!";
    dealer.innerText = "Dealer: " + dealerName;
    info.innerText = infoText;
    wrong.innerText = "Wrong guesses: " + guessedWrong;

    if(deck.numberOfCards === 0){
        let btn = document.createElement("BUTTON");   
        btn.innerHTML = "REFRESH!";
        btn.addEventListener('click', function(e){
            window.location.href = "ftd.html";
        })                
       let elements = document.getElementsByClassName("dealer-info");
       elements[0].append(btn);
    }
}

function getNextPlayer(infoText){
	let currentPlayerIndex = players.indexOf(playerName);
	let nextPlayerIndex;
	nextPlayerIndex = currentPlayerIndex + 1;
	if(nextPlayerIndex === players.length){
		nextPlayerIndex = 0;
	}
	if(players[nextPlayerIndex] === dealerName){
		nextPlayerIndex += 1;
		if(nextPlayerIndex === players.length){
			nextPlayerIndex = 0;
		}
	}
    playerName = players[nextPlayerIndex];
    updateInfo(playerName, dealerName, infoText, guessedWrong, false, false);
}

function getNextDealer(infoText){
    let currentDealerIndex = players.indexOf(dealerName);
	if(currentDealerIndex + 1 >= players.length){
		dealerName = players[0];
	}else{
		dealerName = players[currentDealerIndex + 1];
	}
    guessedWrong = 0;

    updateInfo(playerName, dealerName, infoText, guessedWrong, false, false);
}

document.getElementById("background-default").addEventListener('click', function(e){
    document.body.className = "background-default";
})
document.getElementById("background-vincent").addEventListener('click', function(e){
    document.body.className = "background-vincent";
})
document.getElementById("background-panda").addEventListener('click', function(e){
    document.body.className = "background-panda";
})