const newAstroForm = document.getElementById('astro-form')
const astroName = document.getElementById('astro-name')
const astroCraft = document.getElementById('astro-craft')
const astronautList = document.getElementById('astronaut-list')
const startButton = document.getElementById('start-button')
const startGameScreen = document.getElementById('start-game-screen')
const game = document.getElementById('space')
const scoreSubmit = document.getElementById('user-score-submit')
const playerName = document.getElementById('player-name')
const gameOverScreenDisplay = document.getElementById('game-over')
const gameOverForm = document.getElementById('game-over-form')
const restartButton = document.getElementById('restart-button')
const gameOverText = document.querySelector('#game-over')
const topScoresList = document.querySelector('#high-score-display-list')
const scoresButton = document.querySelector('#scores-button')
const startGameContainer = document.querySelector('#start-game-container')
const savedScore = document.querySelector('#saved-score')
const scoreError = document.querySelector('#score-error')
const backButton = document.querySelector('#high-score-back-button')
const createTeamBackButton = document.querySelector('#create-team-back-button')
const createTeamButton = document.querySelector('#create-team-button')
const saveTeamButton = document.querySelector('#save-team')
const formContainer = document.querySelector('#form-container')
const userAstroTeam = document.querySelector('#side-bar')
const createTeamError = document.querySelector('#create-team-error')
const createTeamPage = document.querySelector('#create-team')
const teamSelectPage = document.querySelector('#team-select')
const teamSelectBackButton = document.querySelector('#team-select-back-button')
const teamSelectRow1 = document.querySelector('#team-select-r1')
const teamSelectRow2 = document.querySelector('#team-select-r2')
const teamList = document.querySelector('#team-list')
const teams = document.querySelector('#teams')
const howToPlayScreen = document.querySelector('#how-to-play-screen')
const howToPlayButton = document.querySelector('#how-to-play-button')
const lowerStartScreen = document.querySelector('.lower-start-screen')
const howToPlayBackButton = document.querySelector('#how-to-play-back-button')
var userAstronauts = [];

var warned = false
const URL = 'http://localhost:3000'
const baseURL = 'http://api.open-notify.org/astros.json'
const postURL = 'http://localhost:3000'
let sameName = false

const retrieveAstros = () => {
    fetch(baseURL)
    .then(response => response.json())
    .then(data => astroNames(data))
}
const astroNames = (data) => {
    
    data.people.forEach((person, i) => {
        
        
        checkExists(person.name, person.craft)
        
    })
    
    
    
}
const checkExists = (name, craft) => {
    fetch(`${postURL}/astronauts`)
    .then(response => response.json())
    .then(data => {
        
       data.forEach((person, i) => {
           if (person.name === name) {
            sameName = true
           }
       })
       if (!sameName) {
           postAstros(name, craft)
       } else {
           sameName = false
       }
    })
}
const postAstros = (name, craft, id) => {
    fetch(`${postURL}/astronauts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
            'name': name,
            'craft': craft,
            'deleteable': false
        }) 
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log('Error: ', error))

}


retrieveAstros()