const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('transitionend', removeTransition);
})
function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

const btns = document.querySelectorAll('.playButton');
btns.forEach((button) => {
    button.addEventListener('click', displayRoundResult)
})
function displayRoundResult(e){
    const btn = document.querySelector(`button[id="${e.target.id}"]`);
    const key = btn.parentElement;
    key.classList.add('playing');
    getResult(playRound(btn.id, computerPlay()));
}
function computerPlay() {
    // randomly return rock, paper or scissors
    const availablePlays = ["rock", "paper", "scissors"];
    let randomPlay = availablePlays[getRandomInt(0, availablePlays.length - 1)];
    return randomPlay;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let gameStatus=[0,0,0];

function calculateScore(round, playerScore, computerScore){
    gameStatus[0] += round;
    gameStatus[1] += playerScore;
    gameStatus[2] += computerScore;
    if (gameStatus[1] == 5)
        return "You Win!"
    else if (gameStatus[2] == 5)
        return "You Lose!"
}
function playRound(playerChoice, computerSelection) {
    let capitalizedPlayerSelection = capitalize(playerChoice);
    let capitalizedComputerSelection = capitalize(computerSelection);
    if (playerChoice == "rock" && computerSelection == "scissors" ||
        playerChoice == "paper" && computerSelection == "rock" ||
        playerChoice == "scissors" && computerSelection == "paper") {
        calculateScore(1, 1, 0);
        if (gameStatus[1] >= 4 || gameStatus[2] >= 4)
            return `Match Point: You Win! ${capitalizedPlayerSelection} beats ${capitalizedComputerSelection}`;
        return `Round ${gameStatus[0]}: You Win! ${capitalizedPlayerSelection} beats ${capitalizedComputerSelection}`;
    }
    else if (playerChoice == "rock" && computerSelection == "paper" ||
        playerChoice == "paper" && computerSelection == "scissors" ||
        playerChoice == "scissors" && computerSelection == "rock") {
        calculateScore(1, 0, 1);
        if (gameStatus[1] >= 4 || gameStatus[2] >= 4)
            return `Match Point: You Lose! ${capitalizedComputerSelection} beats ${capitalizedPlayerSelection}`;
        return `Round ${gameStatus[0]}: You Lose! ${capitalizedComputerSelection} beats ${capitalizedPlayerSelection}`;
    }
    else if (playerChoice == "rock" && computerSelection == "rock" ||
        playerChoice == "paper" && computerSelection == "paper" ||
        playerChoice == "scissors" && computerSelection == "scissors") {
        calculateScore(1, 0, 0);
        if (gameStatus[1] >= 4 || gameStatus[2] >= 4)
            return `Match Point: You Draw!`;
        return `Round ${gameStatus[0]}: You Draw!`;
    }
}

playAgainBtn = document.querySelector('.restartButton');
playAgainBtn.addEventListener('click', () => {
    playAgain();
});

function getResult(result){
    gamePoint = document.querySelector('.gamePoint');
    gamePoint.innerText = `Round ${gameStatus[0]} | Player Score: ${gameStatus[1]} | Computer Score: ${gameStatus[2]}`;

    if (gameStatus[1] == 5 || gameStatus[2] == 5){
        gamePoint.innerText = `Round ${gameStatus[0]} | Player Score: ${gameStatus[1]} | Computer Score: ${gameStatus[2]}
                                ${calculateScore(0, 0, 0)}`;
        restartBtn = document.querySelector('.restartButton');
        restartBtn.style.display = "block";

        playBtns = document.querySelectorAll('.playButton');
        playBtns.forEach(button => {
            button.disabled = true;
        })
    }

    const resultDiv = document.querySelector('.result');
    const p = document.createElement('p');
    p.innerText = result;
    resultDiv.insertBefore(p, resultDiv.children[0]);
}

function playAgain(){
    location.reload();
}