const baseURL = 'http://api.open-notify.org/astros.json'
const postURL = 'http://localhost:3000'
const listItem = document.getElementById('astronaut-list')
const retrieveAstros = () => {
    fetch(baseURL)
    .then(response => response.json())
    .then(data => astroNames(data))
}
const astroNames = (data) => {
    var astronauts = []
    console.log(data)
    data.people.forEach((person, i) => {
        astronauts.push(person.name)
        // astronauts.push(newItem)
        
        postAstros(person.name, person.craft, i + 1)
    })
    
    
    
}

const postAstros = (name, craft, id) => {
    fetch(`${postURL}/astronauts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
            'name': name,
            'craft': craft 
        }) 
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log('Error: ', error))

}


retrieveAstros()