
const createTeamScreen = function() {

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
    astronautList.style.display = 'inline-block'
    populateTeamList()

}
function populateTeamList() {
    fetch(`../public/team.json`)
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
function saveTeam(team, teamName) {
    fetch(`../public/team.json`, {
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
    .then(data => {
        document.querySelectorAll('.deletableMember').forEach(e => e.remove());
        populateTeamList()
        console.log(userAstronauts.length)
        while(userAstronauts.length > 0) {
            userAstronauts.pop();
        }
        document.getElementById('team-number').innerHTML = `${userAstronauts.length} / 9`
    })
}

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
                if (teamName === null){
                    console.log(teamName)
                } else {
                    console.log(teamName)
                    saveTeam(userAstronauts, teamName)
                    warned = false
    
                    teams.innerHTML = ''
                }
                
                
                
            } 
        } else {
            alert('Please delete a team before creating a new one')
        }
        
        
    })
}


return {
    createTeam: createTeam,
    populateTeamList: populateTeamList,
    deleteTeam: deleteTeam,
    saveTeam: saveTeam,
    teamAtMax: teamAtMax
}
}()
