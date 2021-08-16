const baseURL = 'http://api.open-notify.org/astros.json'
const listItem = document.getElementById('astronaut-list')
const retrieveAstros = () => {
    fetch(baseURL)
    .then(response => response.json())
    .then(data => astroNames(data))
}
const astroNames = (data) => {
    var astronauts = []
    for (let i in data.people) {
        astronauts.push(data.people[i].name)
        let newItem = document.createElement('li')
        
        newItem.textContent = data.people[i].name
        // newItem.style.fontSize = '30px'
        listItem.appendChild(newItem)
    }

    next(astronauts)
}
retrieveAstros()
function next(astros) {
    var earth = new Image();
    var moon = new Image();
    var spaceMan = new Image();
    var sun = new Image();
    var width = document.getElementById('space').width
    var height = document.getElementById('space').height
    var x = 0
    var y = 0
    var right = true
    var down = true
    let men = [sun, moon, earth, spaceMan]
    function init() {
        sun.src = './astronaut.png'
        moon.src = './astronaut.png'
        earth.src = './astronaut.png'
        spaceMan.src = './astronaut.png'
        
    }
    let velo = 1;

    function man(x, y, velX, velY, source, text, color) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.source = source
        this.text = text
        this.color = color
    }
    function random(min, max) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
    }

    var ctx = document.getElementById('space').getContext('2d');

    ctx.clearRect(0,0, width, height)

    man.prototype.update = function() {
        if((this.x) >= width - 230) {
        this.velX = -(this.velX);
        }
    
        if((this.x) <= 0) {
        this.velX = -(this.velX);
        }
    
        if((this.y) >= height  - 100) {
        this.velY = -(this.velY);
        }
    
        if((this.y) <= 0) {
        this.velY = -(this.velY);
        }
        
        this.x += this.velX;
        this.y += this.velY;
    };


    man.prototype.draw = function(i) {
        
        let item = newMen[i]
        ctx.fillStyle = item.color
        ctx.font = '40px serif'
        
        ctx.fillText(item.text, this.x, this.y)
        ctx.drawImage(item.source, this.x, this.y, 100, 100)
        ctx.beginPath();
        
        ctx.stroke()
    }
    let newMen = []
    let i = -1


    while(newMen.length < astros.length) {
        
        let sir = new man(
            random(0, 100),
            random(0, 100),
            random(-3, 3),
            random(-3, 3),
            men[1],
            astros[i += 1],
            `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`
        )
        
        newMen.push(sir)
        

    }


    function loop() {
        ctx.width = window.innerWidth;
        ctx.height = window.innerHeight
        ctx.clearRect(0,0,width, height)
        for (let i = 0; i < newMen.length; i++) {
            newMen[i].draw(i)
            newMen[i].update()
            
        }
        requestAnimationFrame(loop)
    }


    loop()
    init();
}