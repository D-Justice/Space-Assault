
const newAstroForm = document.getElementById('astro-form')
const astroName = document.getElementById('astro-name')
const astroCraft = document.getElementById('astro-craft')
const astronautList = document.getElementById('astronaut-list')
const startButton = document.getElementById('start-button')
const startGameScreen = document.getElementById('start-game-screen')
const game = document.getElementById('space')
const scoreSubmit = document.getElementById('user-score-submit')
const playerName = document.getElementById('player-name')
const gameOverScreen = document.getElementById('game-over')
const gameOverForm = document.getElementById('game-over-form')
const restartButton = document.getElementById('restart-button')
const gameOverText = document.querySelector('#game-over')
const topScoresList = document.querySelector('#high-score-display-list')
const scoresButton = document.querySelector('#scores-button')
const startGameContainer = document.querySelector('#start-game-container')
const savedScore = document.querySelector('#saved-score')
const scoreError = document.querySelector('#score-error')
const backButton = document.querySelector('#back-button')
const createTeamButton = document.querySelector('#create-team-button')
const formContainer = document.querySelector('#form-container')
const userAstroTeam = document.querySelector('#side-bar')

let userAstronauts = [];

function postNewAstro(name, craft) {
    fetch(`${URL}/astronauts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'craft': craft,
            'deleteable': true
        })
    })
}
function fetchAstronauts() {
    fetch(`${URL}/astronauts`)
    .then(response => response.json())
    .then(data => {
        var astronauts = []
        console.log(data)
        data.forEach((person, i) => {
            
            listAstronauts(person.name, person.craft,person.id, person.deleteable)
            astronauts.push(person.name)
        })
        next(astronauts)
    })
}


function listAstronauts(name, craft,id, deleteable) {
    const listItem = document.createElement('li')
    const delButton = document.createElement('button')
    
    if (deleteable) {
        delButton.textContent = 'X'
        
        listItem.textContent = `${name} -${craft}`
        listItem.appendChild(delButton)
        astronautList.appendChild(listItem)

        delButton.addEventListener('click', () =>{
            deleteAstronaut(id)
            while(!!astronautList.firstChild) {
                astronautList.lastChild.remove()
            }
            fetchAstronauts()
        })
    } else {
        listItem.textContent = `${name} -${craft}`
        astronautList.appendChild(listItem)
    }
    
}
function deleteAstronaut(id) {
    fetch(`${URL}/astronauts/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log(data))
}


function gameOver() {
    let game = document.getElementById('space')
    
    game.remove()
    gameOverText.style.display = 'inline-block';
    let myScore = document.createElement('p')
    myScore.style.color = '#ff2929'
    myScore.innerHTML = `SCORE: ${score}`

    gameOverText.appendChild(myScore)
    displayHighScore(topScoresList, 10)
    
    
}
function postHighScore(score, playerName) {
    fetch(`${URL}/score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'playerName': playerName,
            'score': score
        })
    })
    .then(response => response.json())
    .then(data => displayHighScore(topScoresList, 10))
}
function displayHighScore(appendTo, displayUpTo) {
    fetch(`${URL}/score`)
    .then(response => response.json())
    .then(data => {
        let sortedScores = data.sort(sortScores)
        console.log(sortedScores)
        for (let i = 0; i < displayUpTo; i++) {
                let score = document.createElement('li')
                switch(i) {
                    case 0:
                        score.style.color = 'red';
                        break;
                    case 1:
                        score.style.color = 'green';
                        break;
                    case 2:
                        score.style.color = 'orange';
                        break;
                    default:
                        break
                }
                score.textContent = `${sortedScores[i].playerName}:${sortedScores[i].score}`;
                appendTo.appendChild(score)
            
        }
    })
}
function createTeam() {
    startGameScreen.style.display = 'none';
    formContainer.style.display = 'inline-block';
    userAstroTeam.style.display = 'inline-block'


}
function startMenuHighScore() {
    startGameScreen.style.display = 'none';
    var topScores = document.createElement('h1')
    var ul = document.createElement('ul')
    topScores.style.textAlign = 'center';
    topScores.style.backgroundColor = 'red';
    topScores.id = 'top-scores'
    ul.style.columnCount = '2';
    ul.style.backgroundColor = 'rgba(245, 245, 245, 0.7)';
    ul.id = 'scores-list'
    backButton.style.display = 'inline-block';

    topScores.textContent = 'TOP 50 HIGH SCORES'

    startGameContainer.prepend(ul)
    startGameContainer.prepend(topScores)
    
    
    displayHighScore(ul, 50);
}
function gameStart() {
    
    startGameScreen.style.display = 'block';
    startGameScreen.style.margin = 'auto';
    startGameScreen.style.padding = '425px 0';
    gameOverScreen.style.display = 'none';
    
}
function sortScores(a, b) {
    if (a.score < b.score){
        return 1
    }else if (a.score > b.score){ 
        return -1;
    }else { 
        return 0;
    }
}


startButton.addEventListener('click', () => {
    startGameScreen.style.display = 'none';
    game.style.display = 'inline-block'

    fetchAstronauts()
})
scoresButton.addEventListener('click', () =>{
    startMenuHighScore()
})
scoreSubmit.addEventListener('submit', (e)=> {
    e.preventDefault()
    if (playerName.value === '') {
        scoreError.style.display = 'block';

    } else {
        console.log(score, playerName.value)
        postHighScore(score, playerName.value)
        scoreSubmit.style.display = 'none';
        scoreError.style.display = 'none';
        savedScore.style.display = 'block';
        
        topScoresList.innerHTML = ''
    }
    
    
})
backButton.addEventListener('click', () => {
    document.querySelector('#scores-list').remove()
    document.querySelector('#top-scores').remove()
    backButton.style.display = 'none';
    gameStart()
})

createTeamButton.addEventListener('click', () =>{
    createTeam()
})
restartButton.addEventListener('click', ()=> {
    scoreSubmit.submit()
})
newAstroForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    userAstronauts.push(astroName.value)
    astronautList.innerHTML = ''
    for (let i in userAstronauts) {
        let newAstronaut = document.createElement('li')
        newAstronaut.textContent = userAstronauts[i]
        astronautList.appendChild(newAstronaut)
    }
    newAstroForm.reset()
})