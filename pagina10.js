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
    question: "91 – Which type of scripts run in the browser?",
    answers: [
      { text: "A - Flow Designer Actions.", correct: false  },
      { text: "B - Scripts Includes.", correct: false },
      { text: "C - Business Rules.", correct: false },
      { text: "D - ACL Scripts.", correct: false },
      { text: "E - Transform Maps.", correct: false },
      { text: "F - UI Policies and Client Script.", correct: true }
    ]
  },{
    question: "92 – What tool allows you to drag and drop to specify links between source fields on an Import Set table and destination fields on any ServiceNow table?",
    answers: [
      { text: "A - Mapping Assist Utility.", correct: true },
      { text: "B - Import Workspace.", correct: false },
      { text: "C - Data Source Map.", correct: false },
      { text: "D - Import Designer.", correct: false },
      { text: "E - Transform Designer.", correct: false },
      { text: "F - Transform Dashboard.", correct: false }
    ]
  },{
    question: "93 – When importing data, what happens to imported rows, if no coalesce field is specified?",
    answers: [
      { text: "A - All rows are treated as new records, but errors will be flagged in the import log.", correct: false  },
      { text: "B - Duplicate rows are rejected from the import.", correct: false },
      { text: "C - All rows are treated as new records. No existing record are updated.", correct: true},
      { text: "D - All rows are rejected from the import, as coalesce field is required.", correct: false },
      { text: "E - ", correct: false },
      { text: "F - ", correct: false }
    ]
  },{
    question: "94 – What ServiceNow feature allows you to include data from a secondary related table on a report?",
    answers: [
      { text: "A - Outer Join.", correct: false  },
      { text: "B - Joins.", correct: false },
      { text: "C - SQL.", correct: false },
      { text: "D - Dot Walking.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "95 – What options can you see, when you right click on a CI, from the CI Dependency view map? Choose 3 answers.",
    answers: [
      { text: "A - View Affected Cis", correct: true },
      { text: "B - View Cases", correct: false },
      { text: "C - View Related Tasks", correct: true },
      { text: "D - View Recent Outages", correct: true },
      { text: "E - View Knowledge", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "96 – What are advantages of using Flow Designer? Choose 3 answers.",
    answers: [
      { text: "A - Reduces technical debt.", correct: true },
      { text: "B - Enables complicated scripting.", correct: false },
      { text: "C - Less manual scripting.", correct: true },
      { text: "D - Smooth integration with 3rd party systems.", correct: true},
      { text: "E - Supports advanced developers.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "97 – You have an existing customer, who is using workflows for their catalog items. Their existing purchasing policy is to require approval for any request that totals over $1000. However, management wants to change the approval threshold to $1500. Which workflow would you update to make this change?",
    answers: [
      { text: "A - Service Approval Processing.", correct: false  },
      { text: "B - Purchasing Process Flow.", correct: false },
      { text: "C - Service Catalog Request.", correct: true },
      { text: "D - Service Catalog Item Request", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "98 – A task worker asks how they can monitor any updates occurring to records assigned to him, like responses from customer. What do you suggest?",
    answers: [
      { text: "A - On My Work list, select the Activity Stream icon to show a frame with live updates.", correct: false  },
      { text: "B - Select Service Desk > My Work Dashboard.", correct: false },
      { text: "C - Open an Agent workspace tab for each record he wants to monitor.", correct: true },
      { text: "D - Click on the eyeglass icon to expand the Monitor frame..", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "99 – After you create a new table, what is the best practice regarding the navigation pane?",
    answers: [
      { text: "A - Create Application Menu with the same name as the table label.", correct: true },
      { text: "B - Set the font style on both the Application Menu and the Module.", correct: false },
      { text: "C - Specify which Roles are able to see the Module.", correct: false },
      { text: "D - Set the filter condition on the Application Menu.", correct: false },
      { text: "E - Create Module with the plural of the table label.", correct: true },
      { text: "F - Specify which Roles are able to see the Application Menu.", correct: false }
    ]
  },{
    question: "100 – An IT manager is responsible for the Network and Hardware assignment groups; each contains 5 team members. These team members are working on many tables, but the manager cannot see any tasks on the Service Desk > My Groups Work list. What could explain this?",
    answers: [
      { text: "A - The manager is not a member of the Network and Hardware group.", correct: true },
      { text: "B - The Assignment Group manager field is empty.", correct: false },
      { text: "C - The manager is not a member of the Service Desk group.", correct: false },
      { text: "D - The manager does not have the itil role.", correct: false },
      { text: "E - ", correct: false },
      { text: "F - ", correct: false }
    ]
  }
]