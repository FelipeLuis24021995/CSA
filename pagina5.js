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
    question: "41 – Which module do you use to access the full-screen view of Connect?",
    answers: [
      { text: "A - Connect > Dashboard.", correct: false  },
      { text: "B - Connect > Workspace.", correct: false },
      { text: "C - Connect > Connect Chat.", correct: true },
      { text: "D - Connect > Tools > Workspace.", correct: false },
      { text: "E - Connect > Agent Workspace.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "42 – When would you use the following steps? - Homepage Admin > Pages - Right click on Homepage record - Select unload Portal Page",
    answers: [
      { text: "A - To add a homepage to an update set.", correct: true },
      { text: "B - To delete a homepage.", correct: false },
      { text: "C - To publish a homepage to the portal.", correct: false },
      { text: "D - To retire a Homepage.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "43 – On a Business Rule, the When setting determines at what point the rule executes. What are the options for a specifying that timing?",
    answers: [
      { text: "A - Prior to, Synchronous, on Update.", correct: false  },
      { text: "B - Insert, Update, Delete, Query.", correct: false },
      { text: "C - Before, Synchronous, Scheduled Job, View.", correct: false },
      { text: "D - Before, After, Async, Display.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "44 – Which script can run when a record is displayed, inserted, updated, deleted or when a table is queried?",
    answers: [
      { text: "A - Client script.", correct: false  },
      { text: "B - Business rule.", correct: true },
      { text: "C - UI script.", correct: false },
      { text: "D - Scheduled job.", correct: false },
      { text: "E - Record rule.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "45 – What process allows users to create, categorize, review, approve and browse important Information in a centralized location that is shared by the entire organization?",
    answers: [
      { text: "A - Self Service Management.", correct: false  },
      { text: "B - Knowledge-Centered Management.", correct: false },
      { text: "C - Knowledge Management.", correct: true },
      { text: "D - Business Information Management.", correct: false },
      { text: "E - Information Portal Management.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "47 – Which role can manage multiple knowledge bases?",
    answers: [
      { text: "A - Sn_kb_admin.", correct: false  },
      { text: "B - Kb_admin.", correct: false },
      { text: "C - Knowledge_admin.", correct: true },
      { text: "D - Knowledge_base_admin.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "48 – You are creating a catalog item for ordering a new desktop computer. The computers have these options: - Color: Black or Silver - RAM: 32MB or 64MB - Keyboard: Standard or Ergonomic - Monitor: 24 inch or 32 inch --- How would you add these options to the catalog item form?",
    answers: [
      { text: "A - Add choices.", correct: false  },
      { text: "B - Add UI options.", correct: false },
      { text: "C - Add variable.", correct: true },
      { text: "D - Add fields.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "49 – What is a best practice regarding data imports?",
    answers: [
      { text: "A - Plan time before your import to remove obsolete or inaccurate data.", correct: true },
      { text: "B - Use extremely large import Sets, instead of multiple large Import Sets.", correct: false },
      { text: "C - Adjust your Transform maps, after the data is loaded into the target table.", correct: false },
      { text: "D - Create a new Import set table for each new data load.", correct: false },
      { text: "E - Monitor data quality and clean imported data, using the Data Scrub Workspace.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "50 – Which ServiceNow resource can be used as a blueprint to map your IT services to ServiceNow?",
    answers: [
      { text: "A - Configuration Management Database (CMDB).", correct: false  },
      { text: "B - Now Learning.", correct: false },
      { text: "C - ServiceNow Wiki.", correct: false },
      { text: "D - Service Mapping Guided Setup.", correct: false },
      { text: "E - Common Services Data Model (CSDM).", correct: true },
      { text: "F - IT Service Management.", correct: false }
    ]
  }
]