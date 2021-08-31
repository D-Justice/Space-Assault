(function(createTeamScreen, startScreen, teamSelectScreen, highScoreScreen){


startButton.addEventListener('click', () => {
    startGameScreen.style.display = 'none';
    teamSelectPage.style.display = 'inline-block'
    //game.style.display = 'inline-block'
    teamSelectBackButton.style.display = 'inline-block'
    teamSelectScreen.teamSelect()
    //fetchAstronauts()
})
scoresButton.addEventListener('click', () =>{
    highScoreScreen.startMenuHighScore()
})
createTeamButton.addEventListener('click', () =>{
    createTeamPage.style.display = 'block';
    saveTeamButton.style.display = 'block'
    teamList.style.display = 'inline-block'
    createTeamScreen.createTeam()
})

createTeamBackButton.addEventListener('click', () => {
    createTeamPage.style.display = 'none';
    createTeamError.style.display = 'none';
    let teamNumber = document.querySelector('#team-number')
    userAstronauts = []
    teams.innerHTML = ''
    astronautList.innerHTML = ''
    teamNumber.innerHTML = ''
    startScreen.gameStart()
})
newAstroForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    
    if (userAstronauts.length >= 9) {
        createTeamError.style.display = 'inline-block';
    } else {
        
        userAstronauts.push(astroName.value)
        astronautList.innerHTML = ''
        let teamNumber = document.createElement('li')
        teamNumber.id = 'team-number'
        for (let i in userAstronauts) {
            let newAstronaut = document.createElement('li')
            let deleteButton = document.createElement('button')
            deleteButton.textContent = 'X'
            newAstronaut.textContent = userAstronauts[i]
            newAstronaut.appendChild(deleteButton)
            astronautList.appendChild(newAstronaut)
            deleteButton.addEventListener('click', (e) => {
                e.target.parentNode.remove()
                let text = e.target.parentNode.textContent
                
                text = text.replace('X', '')
                index = userAstronauts.findIndex((person) => person === text)
                userAstronauts.splice(index, 1)
                teamNumber.innerHTML = `${userAstronauts.length} / 9`
        
                if(userAstronauts.length < 9) {createTeamError.style.display = 'none'}
                
            })
        }
        
        teamNumber.innerHTML = `${userAstronauts.length} / 9`
        teamNumber.style.listStyle = 'none';
        teamNumber.style.color = 'white';
        teamNumber.style.textAlign ='right';
        astronautList.prepend(teamNumber)
        
    }
    newAstroForm.reset()
    
})
saveTeamButton.addEventListener('click', ()=> {
    
    createTeamScreen.teamAtMax()
})
scoreSubmit.addEventListener('submit', (e)=> {
    e.preventDefault()
    if (playerName.value === '') {
        scoreError.style.display = 'block';

    } else {
        console.log(score, playerName.value)
        highScoreScreen.postHighScore(score, playerName.value)
        scoreSubmit.style.display = 'none';
        scoreError.style.display = 'none';
        savedScore.style.display = 'block';
        
        topScoresList.innerHTML = ''
    }
    
    
})
restartButton.addEventListener('click', ()=> {
    scoreSubmit.submit()
})
teamSelectBackButton.addEventListener('click', () => {
    
    teamSelectPage.style.display = 'none';
    teamSelectRow1.innerHTML = ''
    teamSelectRow2.innerHTML = ''
    startGameScreen.style.display = 'inline-block';
})
backButton.addEventListener('click', () => {
    document.querySelector('#scores-list').remove()
    document.querySelector('#top-scores').remove()
    backButton.style.display = 'none';
    startScreen.gameStart()
})
})(createTeamScreen, startScreen, teamSelectScreen, highScoreScreen)



















// function postNewAstro(name, craft) {
//     fetch(`${URL}/astronauts`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'name': name,
//             'craft': craft,
//             'deleteable': true
//         })
//     })
// }

// function fetchAstronauts() {
//     fetch(`${URL}/astronauts`)
//     .then(response => response.json())
//     .then(data => {
//         var astronauts = []
//         console.log(data)
//         data.forEach((person, i) => {
            
//             //listAstronauts(person.name, person.craft,person.id, person.deleteable)
//             astronauts.push(person.name)
//         })
//         next(astronauts)
//     })
// }


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
// function deleteAstronaut(id) {
//     fetch(`${URL}/astronauts/${id}`, {
//         method: 'DELETE',
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
// }












