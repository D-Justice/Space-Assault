
const teamSelectScreen = function(){
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
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
        
        newDiv.style.backgroundColor = `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`
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
function startGameWithteam(teamMembers) {
    game.style.display = 'inline-block'
    teamSelectPage.style.display = 'none'
    next(teamMembers)
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
            newDiv.style.backgroundColor = `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`
            
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
return {
    populateAstronautTeam: populateAstronautTeam,
    startGameWithteam: startGameWithteam,
    teamSelect: teamSelect
    
}

}()