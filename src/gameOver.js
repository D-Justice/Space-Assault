(function(highScoreScreen) {

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

return {
    gameOver: gameOver
}

})(highScoreScreen)