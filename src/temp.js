class Plant {
    constructor(height, colour, name, maxHeight, alive) {
        this.height = height,
        this.colour = colour,
        this.name = name, 
        this.maxHeight = maxHeight,
        this.alive = alive
    }


    get water() {
        return this.height += 3
    }
    // set water(newHeight) {
    //     this.height = newHeight;
        
    // }
    
    
}

const cactus = new Plant(5, 'green', 'cactus', 155, true);

while (cactus.height <= cactus.maxHeight) {
    cactus.water;
    (cactus.height > cactus.maxHeight) ? cactus.alive = false : cactus.alive = true
}


class PottedPlant extends Plant {
    constructor(height, colour, name, maxHeight, alive, potted) {
        super(height, colour, name, maxHeight, alive)
        this.potted = potted
    }
    
    
}
const pottedCactus = new Plant(0, 'red', 'big cactus', 300, true, true);

// while (pottedCactus.height <= pottedCactus.maxHeight) {
//     pottedCactus.water;
//     (pottedCactus.height >= pottedCactus.maxHeight) ? pottedCactus.alive = false : pottedCactus.alive = true
// }

console.log(`Complete! ${cactus.name} finished at ${cactus.height}cm tall!` + ((cactus.alive) ? ` And it survived!` : ` But its dead now...`));
