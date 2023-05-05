const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>

    <button 
      onclick="window.location.href='./index.html.html'" 
      class="button"
    >
      Voltar   
    </button>
  `
}

const questions = [
{
    question: "101 – Your customer wants to add the company’s email banner to each customer facing email notification. How would you approach this requirement?",
    answers: [
      { text: "A - Create a Company http email wrapper.", correct: false  },
      { text: "B - Create a Company email template.", correct: false },
      { text: "C - Create a Company CSS package for emails.", correct: false },
      { text: "D - Create a Company email header and footer.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "102 – What does Natural Language Query allow you to do on a list?",
    answers: [
      { text: "A - Set list filter, using audible commands.", correct: false  },
      { text: "B - Filter list by typing in a phrase.", correct: true },
      { text: "C - Predict the filter desired by the user.", correct: false },
      { text: "D - Speak to the condition builder.", correct: false },
      { text: "E - Automatically select a filter, based on keywords.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "103 – What are examples of Core tables in ServiceNow platform?",
    answers: [
      { text: "A - Team, Party, Awards.", correct: false  },
      { text: "B - User, Task, Incident.", correct: true },
      { text: "C - Work, Caller, Timecard.", correct: false },
      { text: "D - Base Configuration Item, Configuration Item, Base task.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "104 – Which component of a table contains a piece of data for one record?",
    answers: [
      { text: "A - Item.", correct: false  },
      { text: "B - Factor.", correct: false },
      { text: "C - Datapoint.", correct: false },
      { text: "D - Element.", correct: false },
      { text: "E - Field.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "105 – What feature do you use to specify which users are able to access a Service Catalog Item?",
    answers: [
      { text: "A - Can Order Tab.", correct: false  },
      { text: "B - Catalog user Role.", correct: false },
      { text: "C - Can Read Role.", correct: false },
      { text: "D - User Criteria", correct: true},
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "106 – Which application is used primarily to load data into ServiceNow? ",
    answers: [
      { text: "A - Data Import Configuration.", correct: false  },
      { text: "B - System Import Sets.", correct: true},
      { text: "C - Import Management.", correct: false },
      { text: "D - Import Hub.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "107– Tables may have a One-to-Many relationship. From the Service Catalog, what are examples of tables having a one-to-many relationship? Choose 3 answers.",
    answers: [
      { text: "A - One Cart can have many Requests.", correct: false  },
      { text: "B - One Request can have many Requested Items.", correct: true },
      { text: "C - One Approval can have many Requests.", correct: false },
      { text: "D - One Requested Item can have many Approvals.", correct: true },
      { text: "E - One Requested Item can have many Catalog Tasks.", correct: true },
      { text: "", correct: false }
    ]
  }
]