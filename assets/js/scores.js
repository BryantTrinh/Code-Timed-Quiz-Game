function printHighscores() {
  // retrieve scores from local storage.
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // sorting by descending order
  highscores.sort(function (a,b) {
    return b.score - a.score;
  });

  for (var i =0; i< highscores.length; i+=1) {
    // create list tag for each high score
    var liTag= document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
    // display/ append to page
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// when page loads, run the function


printHighscores();