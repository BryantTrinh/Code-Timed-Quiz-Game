var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn - document.getElementById('submit');
var startBtn = document.getElementById('start');

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Function to start quiz, start screen should have hidden questions
function startQuiz() {
  var startScreenEl = document.getElemenyById('start-screen');
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
  for (var i=0; i< currentQuestion.choices.length; i++) {
  // we need to make a new button for every new choice
    var choice = currentQuestions.choices[i];
    var choiceQuestion = document.createElement('button');
    choiceQuestion.setAttribute('class', 'qchoice');
    choiceQuestion.setAttribute('value', qchoice);
    choiceQuestion.textContent = i + 1 + '. ' + choice;
    // append /display onto the page
    choicesEl.appendChild(choiceQuestion);
  }
}

// Wrong guesses
if (buttonEl.value !== questions[currentQuestionIndex].answer){
  // time decreases by 15 seconds per wrong guess
  time -= 15;
  if (time < 0){
    time = 0;
  }

  // update time on page/ display it.choices
  timerEl.textContent = time;
}




function questionClick(event) {
  var buttonEl = event.target;
  // we do not want to click an element that is not a choice, make it do nothing
  if(!buttonEl.matches('.choice')) {
    return;
  }
}
