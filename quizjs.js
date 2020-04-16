var noOfCorrectAnswers = 0;
var questionCount = 0;
var userName = "";
var timerCount;
var quizName = "WebQuizScore : ";
// questions
var questionsList = [
  "1. What color is Orange ?",
  "2. What color is Apple ?",
  "3. What color is Banana",
  "4. What color is Grape",
  "5.What color is Bluberry",
];
// answers
var answersData = [
  ["Orange", "Red", "Yellow", "Green"],
  ["Orange", "Green", "Yellow", "Red"],
  ["Orange", "Yellow", "Red", "Green"],
  ["Orange", "Red", "Yellow", "Green"],
  ["Orange", "Red", "Yellow", "Blue"],
];
// answer key
var correctAnswerList = [1, 4, 2, 4, 4];
var totalNoOfQuestions = questionsList.length;

function resetPageOnLoad() {
  noOfCorrectAnswers = 0;
  questionCount = 0;
}

function startQuiz() {
  resetPageOnLoad();
  startTimer();
  populateQuestions(questionCount);
}

function populateQuestions(questionCount) {
  var listOfAnswers =
    "<ol>" +
    "<li><button id='btn1' onclick='submitAnswer(1)'>" +
    answersData[questionCount][0] +
    "</button></li>" +
    "<li><button id='btn2' onclick='submitAnswer(2)'>" +
    answersData[questionCount][1] +
    "</button></li>" +
    "<li><button id='btn3' onclick='submitAnswer(3)'>" +
    answersData[questionCount][2] +
    "</button></li>" +
    "<li><button id='btn4' onclick='submitAnswer(4)'>" +
    answersData[questionCount][3] +
    "</button></li>" +
    "</ol>" +
    "<button id='submitBtn' onclick='SubmitQuestion()'> Submit </button>";

  document.getElementById("question").innerHTML =
    "<h2>" + questionsList[questionCount] + "</h2>";
  document.getElementById("answers").innerHTML = listOfAnswers;
}

function submitAnswer(answerReceived) {
  resetAnswers();
  var selectedElement = document.getElementById("btn" + answerReceived);
  selectedElement.style.background = "black";
  if (answerReceived == correctAnswerList[questionCount]) {
    noOfCorrectAnswers++;
  }
}

function resetAnswers() {
  for (var i = 1; i <= 4; i++) {
    document.getElementById("btn" + i).style.background = "blue";
  }
}

function SubmitQuestion() {
  questionCount++;
  if (questionCount < totalNoOfQuestions) {
    populateQuestions(questionCount);
  } else {
    timerCount = 0;
    displayResults();
  }
}

function viewHighScores() {
  document.getElementById("question").innerHTML = "";
  requestInitials();
}

function displayResults() {
  document.getElementById("question").innerHTML =
    "<h3>Your Final Score is " +
    noOfCorrectAnswers +
    " out of " +
    questionsList.length +
    "</h3>";
  requestInitials();
}

function requestInitials() {
  document.getElementById("answers").innerHTML =
    "<input type='text' " +
    " placeholder='Enter Initials' id='name' autocomplete='off'>" +
    " <button onclick='submitInitials()''> Submit </button>";
}

function submitInitials() {
  userName = document.getElementById("name").value;
  resetHighScore();
  prepareHighScoreViewPage();
}

function prepareHighScoreViewPage() {
  document.getElementById("question").innerHTML =
    "<h3>Your Name is " + userName + "</h3>";
  document.getElementById("answers").innerHTML =
    "<h3>High Score -- " +
    localStorage.getItem(quizName + userName) +
    "</h3>" +
    "<br><br>" +
    "<button onclick='prepareForNewQuiz(false)''> GO BACK </button>" +
    "<button onclick='prepareForNewQuiz(true)''> CLEAR </button>";
}

function resetHighScore() {
  var highScoreInStorage = localStorage.getItem(quizName + userName);
  if (highScoreInStorage < noOfCorrectAnswers) {
    highScoreInStorage = noOfCorrectAnswers;
  }
  localStorage.setItem(quizName + userName, highScoreInStorage);
}

function prepareForNewQuiz(clearOrNot) {
  if (clearOrNot) {
    localStorage.setItem(quizName + userName, 0);
  }
  document.getElementById("question").innerHTML = "";
  document.getElementById("answers").innerHTML = "";
}

function startTimer() {
  timerCount = 60;

  var timerFunc = setInterval(function () {
    timerCount--;
    document.getElementById("timeVal").innerHTML = timerCount + "s ";
    if (timerCount <= 0) {
      clearInterval(timerFunc);
      document.getElementById("timeVal").innerHTML = "EXPIRED";

      if (questionCount <= totalNoOfQuestions) {
        displayResults();
      }
    }
  }, 1000);
}
