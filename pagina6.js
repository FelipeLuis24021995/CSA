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
    question: "51 – What are the steps for importing data using an import set?",
    answers: [
      { text: "A - Identify Source; Import transform map; Run transformer; Verify import.", correct: false  },
      { text: "B - Load the data; Create transform map; Transform data; Clean up import table.", correct: true},
      { text: "C - Select Source file; Run AutoMap; Transform data; Clean up target table.", correct: false },
      { text: "D - Set up LDAP; Test map; Create update set; Run import; Apply update set.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "52 – What section on the CI form, can you find Information about the other CIs associated with your CI?",
    answers: [
      { text: "A - Related Lists.", correct: false  },
      { text: "B - Related Items.", correct: true },
      { text: "C - Affected CI Tab.", correct: false },
      { text: "D - Related Links.", correct: false },
      { text: "E - Child CI Tab.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "53 – You have been asked to create a way for users to order a new iPhone, but only if they get two levels of approval. The approvers and users should be automatically notified at each approval level. What feature would you use to manage the approvals and notifications?",
    answers: [
      { text: "A - Flows.", correct: false  },
      { text: "B - Approval Criteria.", correct: false },
      { text: "C - Approval Chains.", correct: false },
      { text: "D - Approver Delegates.", correct: true },
      { text: "E - Parent-Child Approvers.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "54 – When using Context Menus on list, form, and columns headings, what are quick ways to access the menus? Choose 2 answers.",
    answers: [
      { text: "A - Ctrl M.", correct: false  },
      { text: "B - Right click on the list, form, or column heading.", correct: true},
      { text: "C - Shift click on the list, form, or columns heading.", correct: false },
      { text: "D - Double click on the list, form or column heading.", correct: false },
      { text: "E - Click on the Context Menu icon.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "55 – Which field (or fields) is used as a unique key during imports?",
    answers: [
      { text: "A - Sys IDs.", correct: false  },
      { text: "B - Match fields.", correct: false },
      { text: "C -  Key Fields.", correct: false },
      { text: "D - Coalesce Fields.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "56 – The customer wants all users to have access to the records in the Offerings [offering] table. What setting on Access Control definition would you use to grant access to all the offering table records?",
    answers: [
      { text: "A - Offering.name.", correct: false  },
      { text: "B - Offering.none.", correct: false },
      { text: "C - Offering.", correct: true },
      { text: "D - None.offering.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "57 – A new employee joins the IT department and needs to perform work assigned to Network and Hardware groups. How would you set up their access? Choose 3 answers.",
    answers: [
      { text: "A - Add User Account to Hardware group.", correct: true },
      { text: "B - Add User Account to ACL.", correct: false },
      { text: "C - Add User Account to ITIL group.", correct: false},
      { text: "D - Create User Account.", correct: true },
      { text: "E - Add User Account to IT Knowledgebase.", correct: false },
      { text: "F - Add User Account to Network group.", correct: true}
    ]
  },{
    question: "59 – The wait time for end users is based on the round-trip between the client and the server. What activities are included in the round-trips?",
    answers: [
      { text: "A - Submit + Query.", correct: false },
      { text: "B - Request + Response.", correct: true},
      { text: "C - Insert + Verify.", correct: false },
      { text: "D - Save + Update.", correct: false },
      { text: "E - Write + Read.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "60 – When using the CI Dependency View, how would you view the relationship between one CI and another CI?",
    answers: [
      { text: "A - Click on plus to expand cluster.", correct: false  },
      { text: "B - Click down arrow, View Relationship.", correct: false },
      { text: "C - Hover on connection line.", correct: false },
      { text: "D - Right click, View Relationship", correct: true},
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  }
]