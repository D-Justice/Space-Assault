


var ctx = document.getElementById('space').getContext('2d');
var width = document.getElementById('space').width
var height = document.getElementById('space').height
var astronaut = new Image();
var spaceship = new Image();
var runOnce = false


var newMen = []
var enemies = []

var enemyNum = 11;
var score = 0;

class Astronauts {
    constructor(x, y, velX, velY, source, text, color) {
        this.x = x
        this.y = y
        this.velX = velX//(velX <= 0.5 && velX >= -0.5) ? velX + 1 : velX
        this.velY = velX//(velY <= 0.5 && velY >= -0.5) ? velY + 1 : velY
        this.source = source
        this.text = text
        this.color = color
        this.angle = Astronauts.randomfloat(-0.5,0.5)
        this.angle = (this.angle === 0) ? 0.3 : this.angle
        this.rotation = (Math.PI / 180) * Astronauts.randomfloat(-0.5, 0.5);
    }
    static init() {
        astronaut.src = './imgs/astronaut.png'
        spaceship.src = './imgs/spaceShip.png'
        
        
    }
    static random(min, max) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
    }
    static randomfloat(min, max) {
        const num = Math.random() * (max - min + 1) + min;
        return num;
    }
    update() {
        if((this.x) >= (width / 2.5) + (this.source.width * 1.35)) {
        this.velX = -(this.velX);
        }
    
        if((this.x) <= (width / 2.5) + 50) {
        this.velX = -(this.velX);
        }
    
        if((this.y) >= height  - this.source.height / 5) {
        this.velY = -(this.velY);
        }
    
        if((this.y) <= this.source.height / 5) {
        this.velY = -(this.velY);
        }
        
        this.x += this.velX;
        this.y += this.velY;
    };
    enemyUpdate(enemies, i) {
        if((this.x) >= (width / 2) - (this.source.width / 1.35) && (this.x) <= (width / 2)){
            console.log('hit')
            newMen.pop()
        enemies = enemies.filter(function(enemy) {
            
            return enemy !== enemies[i]
        })
        }
        
        if((this.x) <= (0)) {
        this.velX = -(this.velX); 
        }
        if(((this.x) <= (width / 2.5) + (this.source.width * 1.65)) && ((this.x) >= (width/ 2))) {
            newMen.pop()
            enemies = enemies.filter(function(enemy) {
                return enemy !== enemies[i]
            })
            }
        //NECCESSARY FIX - DELETES ENEMIES WHEN HITS RIGHT WALL
        // if((this.x) >= (width)) {
        //     this.velX = (this.VelX)
        // }
    
        if((this.y) >= height  - this.source.height / 5) {
        this.velY = -(this.velY);
        }
    
        if((this.y) <= this.source.height / 5) {
        this.velY = -(this.velY);
        }
        
        this.x += this.velX;
        this.y += this.velY;
        return enemies
    };
    
    draw(newMen) {
        
        let item = newMen
        ctx.fillStyle = item.color
        ctx.font = '20px serif'
        
        this.angle += this.rotation
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-50,-50);
        ctx.drawImage(item.source,0,0, 100, 100);
        
        ctx.restore();
        ctx.fillText(item.text, this.x - item.source.width / 4, this.y - item.source.height / 4)
        ctx.fillStyle = 'red'
        ctx.fillText(`Score: ${score}`, 100, 100)


        ctx.beginPath();
        ctx.lineWidth = '4'
        ctx.strokeStyle = 'green'
        ctx.rect(width / 2.5,0,400,height)
        ctx.stroke()
    }
    collision(enemies) {
        for (let i in enemies) {
            if (this.y >= enemies[i].y) {
                this.velY = -this.velY
            }
        }
        this.y += this.velY
        
        
    }
    static loop() {
        
        ctx.width = window.innerWidth;
        ctx.height = window.innerHeight
        ctx.clearRect(0,0,width, height)
        
        for (let i = 0; i < newMen.length; i++) {
            newMen[i].draw(newMen[i])
            newMen[i].update()
            
            
        }
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].draw(enemies[i])
            enemies = enemies[i].enemyUpdate(enemies, i)
            try {
                enemies[i].collision(enemies)
            }
            catch {
                
            }
            
        }
        if (enemies.length === 0) {
            let toggle = false
            enemyNum += 2
            for(let i = 0; i < enemyNum; i++) {
                toggle = !toggle
                let enemy = createEnemies(toggle)
                enemies.push(enemy)
            }
            
        }
        if (newMen.length === 0) {
            
            if (!runOnce) {
                console.log('GameOver')
                gameOver()
                runOnce = true
            }
            
        }
        requestAnimationFrame(() =>{Astronauts.loop()})
    }
    
}
function gameOver() {
    let game = document.getElementById('space')
    
    game.remove()
    gameOverText.style.display = 'inline-block';
    let myScore = document.createElement('p')
    myScore.style.color = '#ff2929'
    myScore.innerHTML = `SCORE: ${score}`

    gameOverText.appendChild(myScore)
    highScoreScreen.displayHighScore(topScoresList, 10)
    
    
}


function createEnemies(toggle) {
    var enemy = new Astronauts(
        (toggle) ? 100 : width - 100,
        Astronauts.random(256, height - 256),
        Astronauts.random(-2, -4), //NECCESSARY FIX
        Astronauts.random(-2, 2),
        spaceship,
        'Enemy',
        `red`,
        
    )
    enemy.angle = 0
    enemy.rotation = 0
    return enemy
}
function next(astros) {
    
    
    let i = -1
    let toggle = false
    while(newMen.length < astros.length) {
        
        var sir = new Astronauts(
            Astronauts.random(875, 1000),
            Astronauts.random(256, this.height - 256),
            Astronauts.random(-2, 2), 
            Astronauts.random(-2, 2),
            astronaut,
            astros[i += 1],
            `rgb(${Astronauts.random(0,255)}, ${Astronauts.random(0,255)}, ${Astronauts.random(0,255)})`,
            
        )
        newMen.push(sir)
    }
    while(enemies.length < enemyNum && astros.length > 0) {
        
        toggle = !toggle
        let newEnemy = createEnemies(toggle)
        
        
        enemies.push(newEnemy)
    }
        
        
    
    

    
    document.getElementById('space').addEventListener('click', (e) => {
       
        enemies.forEach((elem, i) => {
            if (e.pageX <= (elem.x + (elem.source.width / 3)) && e.pageX >= (elem.x - (elem.source.width / 20)) && (e.pageY <= (elem.y + (elem.source.height / 4))) && (e.pageY >= (elem.y - (elem.source.height / 30)))) {
                score += 100
                console.log(e.pageX,elem.x, e.pageY, elem.y)
                console.log(elem.source.height / 6)
                enemies = enemies.filter(function(enemy) {
                    return enemy !== enemies[i]
                })
               
            }})
            
    })
    Astronauts.loop()
    Astronauts.init()
    
}



    







// newAstroForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     postNewAstro(astroName.value, astroCraft.value)
//     astronautList.innerHTML = ''
//     fetchAstronauts()
//     newAstroForm.reset() 
// })

