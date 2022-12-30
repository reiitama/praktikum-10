const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const compScore = document.querySelector('[data-computer-score]')
const playerScore = document.querySelector('[data-your-score]')
var winnerScore = 5;
var playerWinner = "0";
var computerWinner = "0";
const possibility = [
    {
        name: 'rock',
        image: '🪨',
        beats: 'scissors'
    },
    {
        name: 'paper',
        image: '🗒',
        beats: 'rock'
    },
    {
        name: 'scissors',
        image: '✂',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = possibility.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const playerWinner = winner(selection, computerSelection)
    const computerWinner = winner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, playerWinner)

    if (playerWinner) incrementScore(playerScore)
    else if (computerWinner) incrementScore(compScore)
}

function incrementScore(scoreResult) {
    scoreResult.innerText = parseInt(scoreResult.innerText) + 1
    winnerScore = scoreResult.innerText
    console.log(winnerScore)
}

function addSelectionResult(selection, win) {
    const div = document.createElement('div')
    div.innerText = selection.image
    div.classList.add('result-select')
    if (win) div.classList.add('win')
    finalColumn.after(div)
}

function winner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * possibility.length)
    return possibility[randomIndex]
}

function restart() {
    playerWinner = 0
    computerWinner = 0
    playerScore.innerHTML = playerWinner
    compScore.innerHTML = computerWinner
    window.location.reload(finalColumn)
}