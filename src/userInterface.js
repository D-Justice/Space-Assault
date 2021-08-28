
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
var userAstronauts = [];

var warned = false



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
            
            //listAstronauts(person.name, person.craft,person.id, person.deleteable)
            astronauts.push(person.name)
        })
        next(astronauts)
    })
}


// function listAstronauts(name, craft,id, deleteable) {
//     const listItem = document.createElement('li')
//     const delButton = document.createElement('button')
    
//     if (deleteable) {
//         delButton.textContent = 'X'
        
//         listItem.textContent = `${name} -${craft}`
//         listItem.appendChild(delButton)
//         astronautList.appendChild(listItem)

//         delButton.addEventListener('click', () =>{
//             deleteAstronaut(id)
//             while(!!astronautList.firstChild) {
//                 astronautList.lastChild.remove()
//             }
//             fetchAstronauts()
//         })
//     } else {
//         listItem.textContent = `${name} -${craft}`
//         astronautList.appendChild(listItem)
//     }
    
// }
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
                score.style.fontSize = '25px'
                score.textContent = `${sortedScores[i].playerName}:${sortedScores[i].score}`;
                appendTo.appendChild(score)
            
        }
    })
}
function createTeam() {
    startGameScreen.style.display = 'none';
    formContainer.style.display = 'inline-block';
    userAstroTeam.style.display = 'inline-block'
    let teamNumber = document.createElement('li')
    teamNumber.innerHTML = `${userAstronauts.length} / 9`
    teamNumber.id = 'team-number'
    teamNumber.style.listStyle = 'none';
    teamNumber.style.textAlign ='right';
    teamNumber.style.color = 'white';
    astronautList.prepend(teamNumber)
    createTeamBackButton.style.display = 'block'
    document.getElementById('astronaut-list').style.display = 'inline-block'
    populateTeamList()

}
function populateTeamList() {
    fetch(`${URL}/team`)
    .then(response => response.json())
    .then(data => {
        let li = document.createElement('li')
        li.textContent = 'Astronauts'
        teams.append(li)
        
        for(let i in data){
            let li = document.createElement('li')
            let deleteButton = document.createElement('button')
            deleteButton.textContent = 'Delete'
            
            li.textContent = data[i].teamName
            deleteButton.style.position = 'absolute'
            deleteButton.style.right = '20px'
            li.appendChild(deleteButton)
            teams.appendChild(li)
            deleteButton.addEventListener('click', (e) => {
                e.target.parentNode.remove()
                // let team = e.target.parentNode.textContent
                // let team = team.replace('Delete', '')
                console.log(data[i].id)
                deleteTeam(data[i].id)
            })
        }
    })
}
function deleteTeam(id) {
    fetch(`${URL}/team/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
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
    gameOverScreen.style.display = 'none';
    
}
function populateAstronautTeam() {
    fetch(`${URL}/astronauts`)
    .then(response=> response.json())
    .then(data => {
        let team = []
        let newDiv = document.createElement('div')
        let p = document.createElement('p')
        let ul = document.createElement('ul')

        newDiv.id = 'astronaut-team'

        newDiv.classList = 'col team'

        p.textContent = 'Astronauts'
        
        ul.id = 'astronaut-team-list'

        newDiv.appendChild(p)
        newDiv.appendChild(ul)
        newDiv.style.border = '2px solid grey'
        newDiv.style.borderRadius = '25px';
        teamSelectRow1.insertBefore(newDiv, teamSelectRow1.childNodes[0])
        
        newDiv.style.backgroundColor = `rgb(${Astronauts.random(0,255)}, ${Astronauts.random(0,255)}, ${Astronauts.random(0,255)})`
        data.forEach((person, i) => {
            console.log(person.name)
            let li = document.createElement('li')
            
            
            li.textContent = person.name
            team.push(person.name)
            ul.appendChild(li)
             
        })
        newDiv.addEventListener('click', ()=> {startGameWithteam(team)})
    })
}
function teamSelect() {
    fetch(`${URL}/team`)
    .then(response => response.json())
    .then(data => {
        populateAstronautTeam()
        data.forEach((team, i) =>{
            console.log(team.teamName)
            let newDiv = document.createElement('div')
            let nameOfTeam = document.createElement('p')
            let teamList = document.createElement('ul')
            
            team.teamMembers.forEach((member, i)=> {
                let teamMember = document.createElement('li')
                teamMember.textContent = member

                teamList.appendChild(teamMember)
            })
            
            nameOfTeam.textContent = `${team.teamName}`
            newDiv.id = team.teamName;


            newDiv.classList = 'col team';
            newDiv.style.border = '2px solid grey'
            newDiv.style.borderRadius = '25px';
            newDiv.style.backgroundColor = `rgb(${Astronauts.random(0,255)}, ${Astronauts.random(0,255)}, ${Astronauts.random(0,255)})`
            
            newDiv.appendChild(nameOfTeam)
            newDiv.appendChild(teamList)
            newDiv.addEventListener('click', (e)=>{startGameWithteam(team.teamMembers)})
            teamSelectBackButton.style.display = 'inline-block'
            if( i + 1 < 3) {
                teamSelectRow1.appendChild(newDiv)
            } else {
                teamSelectRow2.appendChild(newDiv)
            }

        })
        
    })
}
function startGameWithteam(teamMembers) {
    game.style.display = 'inline-block'
    teamSelectPage.style.display = 'none'
    next(teamMembers)
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
function saveTeam(team, teamName) {
    fetch(`${URL}/team`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'teamName': teamName,
            'teamMembers': team
        })
    })
    .then(response=>response.json())
    .then(data => console.log(data))
}

startButton.addEventListener('click', () => {
    startGameScreen.style.display = 'none';
    teamSelectPage.style.display = 'inline-block'
    //game.style.display = 'inline-block'
    teamSelectBackButton.style.display = 'inline-block'
    teamSelect()
    //fetchAstronauts()
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
createTeamBackButton.addEventListener('click', () => {
    createTeamPage.style.display = 'none';
    let teamNumber = document.querySelector('#team-number')
    userAstronauts = []
    teams.innerHTML = ''
    astronautList.innerHTML = ''
    teamNumber.innerHTML = ''
    gameStart()
})
createTeamButton.addEventListener('click', () =>{
    createTeamPage.style.display = 'block';
    saveTeamButton.style.display = 'block'
    teamList.style.display = 'inline-block'
    createTeam()
})
restartButton.addEventListener('click', ()=> {
    scoreSubmit.submit()
})
newAstroForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    console.log(userAstronauts)
    if (userAstronauts.length >= 9) {
        createTeamError.style.display = 'inline-block';
    } else {
        userAstronauts.push(astroName.value)
        astronautList.innerHTML = ''
        let teamNumber = document.createElement('li')
        teamNumber.id = 'team-number'
        for (let i in userAstronauts) {
            let newAstronaut = document.createElement('li')
            newAstronaut.textContent = userAstronauts[i]
            astronautList.appendChild(newAstronaut)
        }
        teamNumber.innerHTML = `${userAstronauts.length} / 9`
        teamNumber.style.listStyle = 'none';
        teamNumber.style.color = 'white';
        teamNumber.style.textAlign ='right';
        astronautList.prepend(teamNumber)
        
    }
    newAstroForm.reset()
    
})
function teamAtMax() {
    fetch(`${URL}/team`)
    .then(response => response.json())
    .then(data => {
        if (!(data.length + 1 >= 6)) {
            if(userAstronauts.length < 9 && warned === false) {
                alert('Your team is less than 9 players, this will make the game more difficult. Press the save button again to save')
                warned = true
            } else { 
                var teamName = prompt('Enter a name for your team: ')
                saveTeam(userAstronauts, teamName)
                warned = false
                teams.innerHTML = ''
                
                populateTeamList()
            } 
        } else {
            alert('Please delete a team before creating a new one')
        }
        
        
    })
}
saveTeamButton.addEventListener('click', ()=> {
    
    teamAtMax()
})
teamSelectBackButton.addEventListener('click', () => {
    teamSelectPage.style.display = 'none';
    teamSelectRow1.innerHTML = ''
    teamSelectRow2.innerHTML = ''
    startGameScreen.style.display = 'inline-block';
})