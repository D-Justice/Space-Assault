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


// function next(astros) {



//         var earth = new Image();
//         var moon = new Image();
//         var spaceMan = new Image();
//         var sun = new Image();
//         var width = document.getElementById('space').width
//         var height = document.getElementById('space').height
        
        
//         let men = [sun, moon, earth, spaceMan]
//         function init() {
//             sun.src = './astronaut.png'
//             moon.src = './astronaut.png'
//             earth.src = './astronaut.png'
//             spaceMan.src = './astronaut.png'
            
//         }
        
    
//         function man(x, y, velX, velY, source, text, color) {
//             this.x = random(875, 1000)
    
//             this.y = random(256, height - 256)
//             this.velX = (velX <= 0.5 && velX >= -0.5) ? velX + 1 : velX
//             this.velY = (velY <= 0.5 && velY >= -0.5) ? velY + 1 : velY
//             this.source = source
//             this.text = text
//             this.color = color
//             this.angle = randomfloat(-0.5,0.5)
//             this.angle = (this.angle === 0) ? 0.3 : this.angle
//             this.rotation = (Math.PI / 180) * randomfloat(-0.5, 0.5);
//         }
//         function random(min, max) {
//             const num = Math.floor(Math.random() * (max - min + 1)) + min;
//             return num;
//         }
//         function randomfloat(min, max) {
//             const num = Math.random() * (max - min + 1) + min;
//             return num;
//         }
    
//         var ctx = document.getElementById('space').getContext('2d');
    
        
    
//         man.prototype.update = function() {
//             if((this.x) >= (width / 2.5) + (this.source.width * 1.35)) {
//             this.velX = -(this.velX);
//             }
        
//             if((this.x) <= (width / 2.5) + 50) {
//             this.velX = -(this.velX);
//             }
        
//             if((this.y) >= height  - this.source.height / 5) {
//             this.velY = -(this.velY);
//             }
        
//             if((this.y) <= this.source.height / 5) {
//             this.velY = -(this.velY);
//             }
            
//             this.x += this.velX;
//             this.y += this.velY;
//         };
    
    
//         man.prototype.draw = function(i) {
            
//             let item = newMen[i]
//             ctx.fillStyle = item.color
//             ctx.font = '20px serif'
            
//             this.angle += this.rotation
//             ctx.save();
//             ctx.translate(this.x, this.y);
//             ctx.rotate(this.angle);
//             ctx.translate(-50,-50);
//             ctx.drawImage(item.source,0,0, 100, 100);
            
//             ctx.restore();
//             ctx.fillText(item.text, this.x - item.source.width / 4, this.y - item.source.height / 4)
            
            
//             ctx.beginPath();
//             ctx.lineWidth = '4'
//             ctx.strokeStyle = 'green'
//             ctx.rect(width / 2.5,0,400,height)
//             ctx.stroke()
//         }
//         var newMen = []
//         let i = -1
    
    
//         while(newMen.length < astros.length) {
            
//             let sir = new man(
//                 random(0, 100),
//                 random(0, 100),
//                 random(-2, 2),
//                 random(-2, 2),
//                 men[1],
//                 astros[i += 1],
//                 `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`,
                
//             )
            
//             newMen.push(sir)
            
    
//         }
    
    
//         function loop() {
            
//             ctx.width = window.innerWidth;
//             ctx.height = window.innerHeight
//             ctx.clearRect(0,0,width, height)
            
//             for (let i = 0; i < newMen.length; i++) {
//                 newMen[i].draw(i)
//                 newMen[i].update()
                
//             }
//             requestAnimationFrame(loop)
//         }
    
    
//         loop()
//         init();
//         document.getElementById('space').addEventListener('click', (e) => {
           
//             newMen.forEach((elem, i) => {
//                 if (e.pageX <= (elem.x + (elem.source.width / 3)) && e.pageX >= (elem.x) && (e.pageY <= (elem.y + (elem.source.height / 4))) && (e.pageY >= (elem.y - (elem.source.height / 8)))) {
                
//                     console.log(elem.text)
//                 }})
//         })
//     }