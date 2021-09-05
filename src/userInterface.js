(function(createTeamScreen, startScreen, teamSelectScreen, highScoreScreen){


startButton.addEventListener('click', () => {
    startGameScreen.style.display = 'none';
    teamSelectPage.style.display = 'inline-block'
    lowerStartScreen.style.display = 'none';
    teamSelectBackButton.style.display = 'inline-block'
    teamSelectScreen.teamSelect()
})
scoresButton.addEventListener('click', () =>{
    
    highScoreScreen.startMenuHighScore()
})
createTeamButton.addEventListener('click', () =>{
    createTeamPage.style.display = 'block';
    saveTeamButton.style.display = 'block'
    lowerStartScreen.style.display = 'none';
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
        createTeamError.style.display = 'none';
        userAstronauts.push(astroName.value)
        astronautList.innerHTML = ''
        let teamNumber = document.createElement('li')

        teamNumber.id = 'team-number'
        for (let i in userAstronauts) {
            let newAstronaut = document.createElement('li')
            let deleteButton = document.createElement('button')
            newAstronaut.style.marginBottom = '10px'
            newAstronaut.classList = 'deletableMember'
            deleteButton.textContent = 'X'
            deleteButton.style.position = 'absolute';
            deleteButton.style.right = '20px'
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
    startScreen.gameStart()
})
backButton.addEventListener('click', () => {
    document.querySelector('#scores-list').remove()
    document.querySelector('#top-scores').remove()
    
    backButton.style.display = 'none';
    startScreen.gameStart()
})
howToPlayButton.addEventListener('click', () => {
    startGameScreen.style.display = 'none';
    lowerStartScreen.style.display = 'none';
    howToPlayBackButton.style.display = 'block'
    howToPlayScreen.style.display = 'inline-block';
})
howToPlayBackButton.addEventListener('click', () => {
    howToPlayBackButton.style.display = 'none';
    howToPlayScreen.style.display = 'none';
    startScreen.gameStart()
})
})(createTeamScreen, startScreen, teamSelectScreen, highScoreScreen)