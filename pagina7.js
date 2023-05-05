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
    question: "61 – What catalog tool would you use to create a catalog item or record producer?",
    answers: [
      { text: "A - Catalog Formatter.", correct: false  },
      { text: "B - Catalog Flow Builder.", correct: false },
      { text: "C - Catalog Builder.", correct: true},
      { text: "D - Catalog Designer.", correct: false },
      { text: "E - Variable Designer.", correct: false },
      { text: "F - Form Designer.", correct: false }
    ]
  },{
    question: "62 – On a form header, what icon would you click to access Template features?",
    answers: [
      { text: "A - Paper clip.", correct: false  },
      { text: "B - Stamp.", correct: false },
      { text: "C - Context Menu.", correct: false },
      { text: "D - More options (…).", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "63 – While testing a Catalog Item for ordering an expensive computer, the mandatory approval is being skipped for requester Bob Smith, but not for any of the other requesters. What could explain the issue?",
    answers: [
      { text: "A - The manager does not have a delegate assigned.", correct: false  },
      { text: "B - There is a business rule excluding Bob Smith from any approvals.", correct: false },
      { text: "C - The Bob Smith user account does not have a manager specified.", correct: true },
      { text: "D - Bob Smith is a VIP.", correct: false },
      { text: "E - Bob Smith does not have a delegate set up on his account.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "64 – What features are available in Knowledge Management to support continuous improvement on the knowledge articles? Choose 4 answers.",
    answers: [
      { text: "A - Flag Article.", correct: false  },
      { text: "B - Tag as Helpful.", correct: false },
      { text: "C - Submit KB Errata.", correct: false },
      { text: "D - Click frowning icon.", correct: false },
      { text: "E - Add Comments.", correct: false },
      { text: "F - Rate with Stars.", correct: false }
    ]
  },{
    question: "65 – What instance resource allows you to access guided tours, information about actions, and instructions on how to use inputs and outputs in your flow?",
    answers: [
      { text: "A - Getting Started.", correct: false  },
      { text: "B - Wiki.", correct: false },
      { text: "C - Help Panel (question mark icon).", correct: true },
      { text: "D - Docs.", correct: false },
      { text: "E - User Guide.", correct: false },
      { text: "F - Community.", correct: false }
    ]
  },{
    question: "66 – Which tab on the knowledge base record, would you use to identify the sets of users who are able to read articles in that knowledge base?",
    answers: [
      { text: "A - Can read.", correct: true },
      { text: "B - Access list.", correct: false },
      { text: "C - Accessible to.", correct: false },
      { text: "D - Can Access.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "67 – When adding a related list to a form, you choose the related list from the list collector. What is an example of a related list you might see on the list collector? Choose 3 answers.",
    answers: [
      { text: "A - Outage > Task number.", correct: true },
      { text: "B - Catalog Task > Parent.", correct: true },
      { text: "C - HR Case > Parent.", correct: true },
      { text: "D - Problem == Parent.", correct: false },
      { text: "E - Release Phase = Parent.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "68 – In Flow Designer, where is the data from an action stored so it can be used in subsequent actions in the flow?",
    answers: [
      { text: "A - Data Pill.", correct: true },
      { text: "B - Data Trigger.", correct: false },
      { text: "C - Data Element.", correct: false },
      { text: "D - Field Icon.", correct: false },
      { text: "E - Field Value.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "69 – What are different types of Data Sources, which may be imported into ServiceNow? Choose 4 answers.",
    answers: [
      { text: "A - Implementation Spoke.", correct: false  },
      { text: "B - JDBC Connection.", correct: true },
      { text: "C - DataHub.", correct: true},
      { text: "D - Network Server.", correct: false },
      { text: "E - LDAP Connection.", correct: true},
      { text: "F - Local Sourcers (i.e. XML, CSV, Excel).", correct: true }
    ]
  },{
    question: "70 – What are examples of UI Actions relating to forms? Choose 3 answers.",
    answers: [
      { text: "A - Form Context Menu.", correct: true },
      { text: "B - Form Columns.", correct: false },
      { text: "C - Form Links.", correct: true },
      { text: "D - Forms Buttons.", correct: true},
      { text: "E - Form View.", correct: false },
      { text: "", correct: false }
    ]
  }
]