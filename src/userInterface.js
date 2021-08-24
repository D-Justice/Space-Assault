
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
    myScore.innerHTML = `SCORE: ${score}`

    gameOverText.appendChild(myScore)
    
    
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
    .then(data => console.log(data))
}
function gameStart() {
    startGameScreen.style.display = 'inline-block';
    gameOverScreen.style.display = 'none';
    
}


startButton.addEventListener('click', () => {
    startGameScreen.style.display = 'none';
    game.style.display = 'inline-block'

    fetchAstronauts()
})
scoreSubmit.addEventListener('submit', (e)=> {
    e.preventDefault()
    postHighScore(score, playerName.value)
    scoreSubmit.style.display = 'none';
    let scoreSaved = document.createElement('h2');
    scoreSaved.textContent = `Your score was saved`
    scoreSaved.style.background = '#13ff13';
    scoreSaved.style.marginBottom = '50px';
    gameOverForm.prepend(scoreSaved)
    
})
restartButton.addEventListener('click', ()=> {
    scoreSubmit.submit()
})