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
      onclick="window.location.href='./index.html'" 
      class="button"
    >
      Voltar   
    </button>
  `
}

const questions = [
{
    question: "71 – On what part of the ServiceNow instance, would you find the option to impersonate user?",
    answers: [
      { text: "A - Content Frame.", correct: false  },
      { text: "B - Module.", correct: false },
      { text: "C - Application navigator.", correct: false },
      { text: "D - Banner.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "72 – What are the main components of the Form Design interface?",
    answers: [
      { text: "A - Field Picker.", correct: false  },
      { text: "B - Field Layout.", correct: true},
      { text: "C - Form Layout.", correct: true},
      { text: "D - Page Header.", correct: true },
      { text: "E - Field Navigator.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "73 – When a custom table is created, which access control rules are automatically created? Choose 4 answers.",
    answers: [
      { text: "A - Update.", correct: false  },
      { text: "B - Execute.", correct: false },
      { text: "C - Create.", correct: true },
      { text: "D - Read.", correct: true },
      { text: "E - Delete.", correct: true },
      { text: "F - Write.", correct: true }
    ]
  },{
    question: "74 – When you set a policy that is applied to all data entered into the platform (UI, Import Sets or Web Services), where does this policy run by default?",
    answers: [
      { text: "A - Network.", correct: false  },
      { text: "B - Server.", correct: true },
      { text: "C - Client.", correct: false },
      { text: "D - Browser.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "75 – Which would you follow when testing a catalog item that has a manager approval flow? Choose 3 answers.",
    answers: [
      { text: "A - Make sure the latest flows are activated.", correct: false  },
      { text: "B - Use the instance incognito setting to quickly toggle between requester and approver.", correct: false },
      { text: "C - Use your Admin account, so you can approve the items quickly.", correct: true },
      { text: "D - Impersonate the requester to ensure the form works.", correct: true},
      { text: "E - Make sure the requester’s user record has a manager specified.", correct: false },
      { text: "F - Create and select your Testing Update Set, before starting the test cases.", correct: true }
    ]
  },{
    question: "76 – What capability allows users to create dashboards with widgets to visualize data over time in order to identify areas of improvement?",
    answers: [
      { text: "A - Reporting.", correct: false  },
      { text: "B - Scheduled Reports.", correct: false },
      { text: "C - Analytics Reports.", correct: false },
      { text: "D - Performance Analytics.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "77 – What types of entities can receive task assignments in ServiceNow? Choose 2 answers.",
    answers: [
      { text: "A - Groups.", correct: true },
      { text: "B - Departments.", correct: false },
      { text: "C - Teams.", correct: false },
      { text: "D - Users.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "78 – If a knowledge base has no access details specified, what users are able to read articles in that knowledge base?",
    answers: [
      { text: "A - No users.", correct: false  },
      { text: "B - Itil users.", correct: false },
      { text: "C - Users with kb_user role.", correct: false },
      { text: "D - Any user with an article’s permalink.", correct: false },
      { text: "E - Any active user.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "79 – What table acts as a staging area for records imported from a data source?",
    answers: [
      { text: "A - Staging table.", correct: false  },
      { text: "B - Temp Table.", correct: false },
      { text: "C - Transform Table.", correct: false },
      { text: "D - Import Set Table.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "80 – When importing spreadsheet data into ServiceNow, what is the first step in the process?",
    answers: [
      { text: "A - Set Coalesce.", correct: false  },
      { text: "B - Select Import Set.", correct: false },
      { text: "C - Define Data Source.", correct: false },
      { text: "D - Run Data Scrubber.", correct: false },
      { text: "E - Load Data.", correct: true },
      { text: "", correct: false }
    ]
  }
]