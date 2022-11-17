var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback')
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Function to start quiz, start screen should have hidden questions
function startQuiz() {
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');
  questionsEl.removeAttribute('class');
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}


// Function to get questions from array
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  // delete old question choices
  choicesEl.innerHTML = '';

  // create a a loop for the choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
  // we need to make a new button for every new choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;
    // append /display onto the page
    choicesEl.appendChild(choiceNode);
  }
}


function questionClick(event) {
  var buttonEl = event.target;
  // we do not want to click an element that is not a choice, make it do nothing
    if (!buttonEl.matches('.choice')) {
    return;
  }



// Wrong guesses
if (buttonEl.value !== questions[currentQuestionIndex].answer) {
  // time decreases by 15 seconds per wrong guess
  time -= 15;
  if (time < 0) {
      time = 0;
    }


  // update time on page/ display it.choices
  timerEl.textContent = time;



  feedbackEl.textContent = 'Wrong!';
  } else {
  feedbackEl.textContent = 'Correct!';
  }
// right or wrong feedback for user
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
  feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

// next question
currentQuestionIndex++;

// Have we gone through every question? Make an if statement.

  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}


// quiz end, stop timer, show the ending screen, hide questions, show final score.choices

function quizEnd() {

  clearInterval(timerId);

  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  questionsEl.setAttribute('class', 'hide');

}

// clock, update time, see if user runs out of time

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {

// Lastly, entering in initials, submitting, and storing final score.
  var initials = initialsEl.value.trim();

// cannot enter in empty string for initials.
  if (initials !== '') {
  // receive scores from local storage or set to empty array
    // var highscores = 

    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

// new user

    var newScore = {
      score: time,
      initials: initials,
    };

// saving to localstore with .push
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    
// After saving score, we need to show them the high score page.
    window.location.href = 'quizhighscores.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;


