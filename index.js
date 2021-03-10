const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('transitionend', removeTransition);
})
function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

const btns = document.querySelectorAll('button');
btns.forEach((button) => {
    button.addEventListener('click', playRoundAndEffect)
})
function playRoundAndEffect(e){
    const btn = document.querySelector(`button[id="${e.target.id}"]`);
    playRound(btn.id, computerPlay());
    const key = btn.parentElement;
    key.classList.add('playing');
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
function playRound(playerChoice, computerSelection) {
    let capitalizedPlayerSelection = capitalize(playerChoice);
    let capitalizedComputerSelection = capitalize(computerSelection);
    if (playerChoice == "rock" && computerSelection == "scissors" ||
        playerChoice == "paper" && computerSelection == "rock" ||
        playerChoice == "scissors" && computerSelection == "paper") {
        return console.log(("You Win! " + capitalizedPlayerSelection + " beats " + capitalizedComputerSelection));
    }
    else if (playerChoice == "rock" && computerSelection == "paper" ||
        playerChoice == "paper" && computerSelection == "scissors" ||
        playerChoice == "scissors" && computerSelection == "rock") {
        return console.log(("You Lose! " + capitalizedComputerSelection + " beats " + capitalizedPlayerSelection));
    }
    else if (playerChoice == "rock" && computerSelection == "rock" ||
        playerChoice == "paper" && computerSelection == "paper" ||
        playerChoice == "scissors" && computerSelection == "scissors") {
        return console.log("You Draw!");
    }
}