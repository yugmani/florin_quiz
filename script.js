let currentQuestion = 0;
const questionEl = document.getElementById("question");
let score = 0;

const text_a = document.getElementById("text-a");
const text_b = document.getElementById("text-b");
const text_c = document.getElementById("text-c");
const text_d = document.getElementById("text-d");

const submitBtn = document.getElementById("submit");

const radioEl = document.querySelectorAll('input[type="radio');
console.log(radioEl);

function loadQuiz() {
  const currentQuizData = quizData[currentQuestion];
  questionEl.innerHTML = currentQuizData.question;
  text_a.innerHTML = currentQuizData.a;
  text_b.innerHTML = currentQuizData.b;
  text_c.innerHTML = currentQuizData.c;
  text_d.innerHTML = currentQuizData.d;
  checkSelected();
}

loadQuiz();

submitBtn.addEventListener("click", function () {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    alert("Thank you");
  }
});

function checkSelected() {
  let checkedId = "";
  radioEl.forEach((item) => {
    if (item.checked) {
      checkedId = item.getAttribute("id");
    }
  });

  if (!checkedId) {
    return;
  }

  isCorrectResponse(checkedId);
}

function isCorrectResponse(id) {
  if (id === currentQuizData[currentQuestion].correct) {
    score += 5;
    alert("You are right!");
  }
  console.log(score);
  return score;
}
