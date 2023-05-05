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
    question: "31 – Of the CI tables, which is a base table of the cmdb hierachy?",
    answers: [
      { text: "A - Ecmdb.", correct: false  },
      { text: "B - Cmdb_rel_ci.", correct: false },
      { text: "C - Cmdb_ci.", correct: false },
      { text: "D - Cmdb.", correct: true },
      { text: "E - Ecmdb_rel_ci.", correct: false },
      { text: "F - Ecmdb_ci.", correct: false }
    ]
  },{
    question: "32 – Using the module System Properties > My Company, what branding options are available?",
    answers: [
      { text: "A - Banner Image, Banner text, Color Scheme.", correct: false  },
      { text: "B - Company Name, Company Logo.", correct: false },
      { text: "C - Banner Image, Banner Text.", correct: true},
      { text: "D - Company Name, Company Logo, Colo Scheme.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "33 – A manager wants to run a report showing how many Service Requests have been fullfilled for Business Card, since the beginning of the year. What table would they select for Building the report?",
    answers: [
      { text: "A - Request [sc_req].", correct: true },
      { text: "B - Requested Item [sec_req_item].", correct: false },
      { text: "C - Task [task].", correct: false },
      { text: "D - Catalog Item [sec_cat_item].", correct: false },
      { text: "E - Catalog Task [sc_task].", correct: false },
      { text: "F - Service Catalog [sc_catalog].", correct: false }
    ]
  },{
    question: "34 – A subject matter expert routinely receives tasks which have been worked by first level support, before receiving the assignment. What could you suggest, to make it easier for the expert to read only the work notes in the Activity log?",
    answers: [
      { text: "A - Click Context menu > Work Notes View.", correct: false  },
      { text: "B - Click Funnel icon and select only work notes.", correct: true},
      { text: "C - Click Context menu > History.", correct: false },
      { text: "D - Click Personalize icon and select Activity Stream.", correct: false },
      { text: "E - Right click form header > Form Layout > Add Work Notes Section.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "35 – Where is the data from an action stored so it can be used in subsequent actions in the flow?",
    answers: [
      { text: "A - Field icon.", correct: false  },
      { text: "B - Data Trigger.", correct: false },
      { text: "C - Data Element.", correct: false },
      { text: "D - Field Value.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "36 – Within the Report Library, there are many baseline reports that can be used for learning about reports. What could you Search for, to locate ITIL best practice indicator reports?",
    answers: [
      { text: "A - KPI.", correct: true },
      { text: "B - ITSM.", correct: false },
      { text: "C - ITIL.", correct: false },
      { text: "D - PA.", correct: false },
      { text: "E - Sn_itil.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "37 – You have been asked to configure a form so an employee could order a tablet and select the standard accessory options to purchase with it. These standard options are carrying case, screen cleaner, tablet stand and screen protector. What approach would you take? Choose 3 answers.",
    answers: [
      { text: "A - a. On Shopping Cart Configuration, select option to show the Add Accessories button.", correct: false  },
      { text: "B - b. Create one Catalog Item for each: tablet, carrying case, screen cleaner tablet stands and screen protector.", correct: false },
      { text: "C - Create Catalog item for the Tablet and add a variable set to the form for the accessory options.", correct: true },
      { text: "D - Create a Record producer and on the form, add a check box variable for each accessory option.", correct: true },
      { text: "E - Create Catalog Item for the tablet and on the form, add a check box variable for each accessory option.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "38 – Which resource would you use to determine if a specific user could contribute to a particular knowledge base?",
    answers: [
      { text: "A - User Criteria Diagnostics.", correct: true },
      { text: "B - Knowledge Author Group.", correct: false },
      { text: "C - User Criteria Job Log.", correct: false },
      { text: "D - KB Author Checker.", correct: false },
      { text: "E - Sn_kb_author Role.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "39 – With the admin role, a user would have access to all platform features, functions, and data, with what exceptions?",
    answers: [
      { text: "A - High Security and Human Resources.", correct: false  },
      { text: "B - Human Resources and Security Operations.", correct: true },
      { text: "C - Employee Personally Indetifiable Information (PII) and Security Operations.", correct: false },
      { text: "D - Human Resources and Enterprise CMDB.", correct: false },
      { text: "E - Security Operations and Vulnerability Response.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "40 – From the My Approval module, you want to quickly authorize a Request. How can you do this quickly from the list view?",
    answers: [
      { text: "A - Right click on the Requested State, select Approve.", correct: true },
      { text: "B - Right click on the Approval number, select Approve.", correct: false },
      { text: "C - Right click on the Approval number, select Approve.", correct: false },
      { text: "D - Right click on the Approval number, select Approved, click green check.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  }
]