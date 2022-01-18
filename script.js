// Variable initializations
let currentQuestion = 0;
let score = 0;

const text_a = document.getElementById("text-a");
const text_b = document.getElementById("text-b");
const text_c = document.getElementById("text-c");
const text_d = document.getElementById("text-d");

const questionEl = document.getElementById("question");
const submitBtn = document.getElementById("submit");
const radioEl = document.querySelectorAll('input[type="radio');

//function to load quiz
function loadQuiz() {
  const currentQuizData = quizData[currentQuestion];

  questionEl.innerHTML = currentQuizData.question;
  text_a.innerHTML = currentQuizData.a;
  text_b.innerHTML = currentQuizData.b;
  text_c.innerHTML = currentQuizData.c;
  text_d.innerHTML = currentQuizData.d;

  return currentQuizData;
}

// function to check whether answer is selected or not
function isAnswerSelected() {
  const checkedId = checkSelected();
  let qScore = 0;

  if (checkedId) {
    qScore = isCorrectResponse(checkedId, currentQuiz);
    currentQuestion++;
  } else {
    return;
  }

  // to load next question
  if (currentQuestion < quizData.length) {
    //to set uncheck for checked radios by default
    radioEl.forEach((item) => {
      if (item.checked) {
        item.checked = false;
      }
    });

    currentQuiz = loadQuiz();
  } else {
    showResult(qScore);
  }
}

// function to find which answer is checked.
function checkSelected() {
  let checkedId = "";

  radioEl.forEach((item) => {
    if (item.checked) {
      checkedId = item.getAttribute("id");
    }
  });

  return checkedId;
}

// function to check whether the selected answer is correct or not
function isCorrectResponse(id, current) {
  if (id === current.correct) {
    score += 5;
  }

  return score;
}

// function to show the result at the end of quiz
function showResult() {
  document.querySelector(".container").style.display = "none";

  const resultEl = document.getElementById("result");
  resultEl.style.display = "block";
  resultEl.style.display = "flex";
  resultEl.style.flexDirection = "column";
  resultEl.style.justifyContent = "space-evenly";
  resultEl.style.alignItems = "center";
  const scoreEl = document.getElementById("score");
  const percentScore = (score * 100) / (quizData.length * 5);
  scoreEl.innerHTML = `${percentScore} %`;

  const message = messageShow(percentScore);
  document.getElementById("message").innerHTML = message;
}

// function to show message
function messageShow(per) {
  let msg = "";

  if (per >= 50) {
    msg = "Congratulations!";
  } else {
    msg = "Try Again!";
  }

  return msg;
}

// call loadQuiz function
let currentQuiz = loadQuiz();

// Eventlistener on submit
submitBtn.addEventListener("click", isAnswerSelected);
