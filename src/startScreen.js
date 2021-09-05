
const startScreen = function() {
    function gameStart() {
        lowerStartScreen.style.display = 'block';
        startGameScreen.style.display = 'block';
        startGameScreen.style.margin = 'auto';
        gameOverScreenDisplay.style.display = 'none';
        
    }
    return {
        gameStart: gameStart
    }
}()

