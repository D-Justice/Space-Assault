const highScoreScreen = function() {
function displayHighScore(appendTo, displayUpTo) {
    fetch(`${URL}/score`)
    .then(response => response.json())
    .then(data => {
        let sortedScores = data.sort(sortScores)
        console.log(sortedScores)
        for (let i = 0; i < displayUpTo; i++) {
                let score = document.createElement('li')
                switch(i) {
                    case 0:
                        score.style.color = 'red';
                        break;
                    case 1:
                        score.style.color = 'green';
                        break;
                    case 2:
                        score.style.color = 'orange';
                        break;
                    default:
                        break
                }
                
                score.textContent = `${sortedScores[i].playerName}:${sortedScores[i].score}`;
                appendTo.appendChild(score)
            
        }
    })
}
function sortScores(a, b) {
    if (a.score < b.score){
        return 1
    }else if (a.score > b.score){ 
        return -1;
    }else { 
        return 0;
    }
}
function postHighScore(score, playerName) {
    fetch(`${URL}/score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'playerName': playerName,
            'score': score
        })
    })
    .then(response => response.json())
    .then(data => displayHighScore(topScoresList, 10))
}
function startMenuHighScore() {
    startGameScreen.style.display = 'none';
    lowerStartScreen.style.display = 'none';
    var topScores = document.createElement('h1')
    var ul = document.createElement('ul')
    topScores.style.textAlign = 'center';
    topScores.style.backgroundColor = 'red';
    topScores.id = 'top-scores'
    ul.style.columnCount = '2';
    ul.style.backgroundColor = 'rgba(245, 245, 245, 0.7)';
    ul.id = 'scores-list'
    backButton.style.display = 'inline-block';

    topScores.textContent = 'TOP 50 HIGH SCORES'

    startGameContainer.prepend(ul)
    startGameContainer.prepend(topScores)
    
    
    displayHighScore(ul, 50);
}

return {
    displayHighScore: displayHighScore,
    sortScores: sortScores,
    startMenuHighScore: startMenuHighScore,
    postHighScore: postHighScore
}
}()