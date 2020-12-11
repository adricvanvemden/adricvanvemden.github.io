class Game{
    constructor(players){
        this.players = players;
    }
}

const addButton = document.querySelector('[data-add-btn]');
const playerName = document.querySelector('[data-player-input]');
const playerList = document.querySelector('[data-player-list]');
const startButton = document.querySelector('[data-start-btn]');
let players = [];

addButton.addEventListener('click', function(){
    addPlayer();
});

playerName.addEventListener('keypress', function(e){
    if (e.key != 'Enter') return
    addPlayer();
})

startButton.addEventListener('click', function(e){
    localStorage.setItem("players", JSON.stringify(players));
    window.location.href = "ftd.html";
})

function addPlayer(){
    if(playerName.value === '') return;
    if(players.length === 9) return;
    players.push(playerName.value);
    let item = document.createElement("div");
    item.className = 'list-element';
    item.addEventListener('click', function(){
        removePlayer(item);
    })
    item.innerText = playerName.value;
    playerList.append(item);
    playerName.value = '';
    checkStart();
}

function checkStart(){
    if(players.length >= 2){
    startButton.style.display = "block";
    }else{
        startButton.style.display = "none";
    }
}

function removePlayer(target){
    players.pop(target);
    playerList.removeChild(target);
    checkStart();
}