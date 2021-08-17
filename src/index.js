const URL = 'http://localhost:3000'
function fetchAstronauts() {
    fetch(`${URL}/astronauts`)
    .then(response => response.json())
    .then(data => {
        var astronauts = []
        console.log(data)
        data.forEach((person, i) => {
            astronauts.push(person.name)
        })
        next(astronauts)
    })
}
let angle = 0
function next(astros) {



    var earth = new Image();
    var moon = new Image();
    var spaceMan = new Image();
    var sun = new Image();
    var width = document.getElementById('space').width
    var height = document.getElementById('space').height
    
    
    let men = [sun, moon, earth, spaceMan]
    function init() {
        sun.src = './astronaut.png'
        moon.src = './astronaut.png'
        earth.src = './astronaut.png'
        spaceMan.src = './astronaut.png'
        
    }
    

    function man(x, y, velX, velY, source, text, color) {
        this.x = random(256, 1000 - 256)
        console.log(source.width)
        this.y = random(256, 1000 - 256)
        this.velX = (velX <= 0.5 && velX >= -0.5) ? velX + 1 : velX
        this.velY = (velY <= 0.5 && velY >= -0.5) ? velY + 1 : velY
        this.source = source
        this.text = text
        this.color = color
        this.angle = randomfloat(-0.5,0.5)
        this.angle = (this.angle === 0) ? 0.3 : this.angle
        this.rotation = (Math.PI / 180) * randomfloat(-0.5, 0.5);
    }
    function random(min, max) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
    }
    function randomfloat(min, max) {
        const num = Math.random() * (max - min + 1) + min;
        return num;
    }

    var ctx = document.getElementById('space').getContext('2d');

    

    man.prototype.update = function() {
        if((this.x) >= width - this.source.width / 2) {
        this.velX = -(this.velX);
        }
    
        if((this.x) <= this.source.width / 2) {
        this.velX = -(this.velX);
        }
    
        if((this.y) >= height  - this.source.height / 2) {
        this.velY = -(this.velY);
        }
    
        if((this.y) <= this.source.height / 2) {
        this.velY = -(this.velY);
        }
        
        this.x += this.velX;
        this.y += this.velY;
    };


    man.prototype.draw = function(i) {
        
        let item = newMen[i]
        ctx.fillStyle = item.color
        ctx.font = '40px serif'
        
        this.angle += this.rotation
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-item.source.width / 2,-item.source.height / 2);
        ctx.drawImage(item.source,0,0);
        
        ctx.restore();
        ctx.fillText(item.text, this.x - item.source.width / 2, this.y - item.source.height / 2)
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
            `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`,
            
        )
        
        newMen.push(sir)
        

    }


    function loop() {
        ctx.width = window.innerWidth;
        ctx.height = window.innerHeight
        //ctx.clearRect(0,0,width, height)
        
        for (let i = 0; i < newMen.length; i++) {
            newMen[i].draw(i)
            newMen[i].update()
            
        }
        requestAnimationFrame(loop)
    }


    loop()
    init();
}
setTimeout(function(){fetchAstronauts()}, 3000)