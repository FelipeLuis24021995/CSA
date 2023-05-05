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
    question: "21 – An IT user calls the service desk because they need to work on task records. All they can see is Self Service on their homepage when they login to the ServiceNow instance. What issue could explain this? ",
    answers: [
      { text: "A - Their user account does not have itil role.", correct: true  },
      { text: "B - Their user account was not approved by their manager.", correct: false },
      { text: "C - Their user account does not belong to any groups, which contain the itil role.", correct: true },
      { text: "D - Their user account failed LDAP authentication.", correct: false },
      { text: "E - Their user account is not logged in property.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "22 – To quickly return to a Homepage you were using five minutes ago, which item would you click?",
    answers: [
      { text: "A - Gear icon.", correct: false  },
      { text: "B - Clock icon.", correct: true },
      { text: "C - Right click History.", correct: false },
      { text: "D - Homepage icon.", correct: false },
      { text: "E - History Module.", correct: false },
      { text: "F - Star icon.", correct: false }
    ]
  },{
    question: "23 – What are the different ways you can create a Favorite for a particular record?",
    answers: [
      { text: "A - From the record Related Links, click Add Favorites.", correct: false  },
      { text: "B - From the record form header, click the Star icon.", correct: false },
      { text: "C - From the record form header, click Additional Actions menu and select Create Favorite.", correct: true },
      { text: "D - From list, click the Star icon.", correct: false },
      { text: "E - From list, drag record number to Favorites on the Navigator.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "24 – On a list, what part of the table, does each column show?",
    answers: [
      { text: "A - An element.", correct: false  },
      { text: "B - A relationship.", correct: false },
      { text: "C - A record.", correct: false },
      { text: "D - An atribute.", correct: false },
      { text: "E - A field.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "25 – Which type of field allows you to enter freely using letters, numbers, and special characters?",
    answers: [
      { text: "A - Multi line text.", correct: false  },
      { text: "B - Single line text.", correct: false },
      { text: "C - Open text.", correct: false },
      { text: "D - Text.", correct: false },
      { text: "E - String.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "26 – To quickly return to your instance’s home page, what item would you click?",
    answers: [
      { text: "A - Star icon.", correct: false  },
      { text: "B - Shortcuts icon.", correct: false },
      { text: "C - Navigation header.", correct: false },
      { text: "D - Gear icon.", correct: false },
      { text: "E - Instance logo.", correct: true },
      { text: "F - User menu.", correct: false }
    ]
  },{
    question: "27 – Which admin role is required to make changes to High Security Settings?",
    answers: [
      { text: "A - Acl_admin.", correct: false  },
      { text: "B - High_sec_admin.", correct: false },
      { text: "C - High_sec_admin.", correct: false },
      { text: "D - Admin.", correct: false },
      { text: "E - Security_admin.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "28 – Your customer wants to update a notification, so it is sent to the Caller, and also the Manager of the Caller. How would you approach this requirement?",
    answers: [
      { text: "A - Set Who will receive to subscribable.", correct: false  },
      { text: "B - On the Who tab, add Caller field, and dot walking to Caller’s.", correct: true },
      { text: "C - Create workflow and include a notification in the workflow.", correct: false },
      { text: "D - On Who will receive tab, select copy manager check box.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "29 – What section on a task record would you use to see the most recent update made to a record?",
    answers: [
      { text: "A - Journal.", correct: false  },
      { text: "B - Timeline.", correct: false },
      { text: "C - Update Log.", correct: false },
      { text: "D - Audit Log.", correct: false },
      { text: "E - Diary.", correct: false },
      { text: "F - Activity.", correct: true }
    ]
  },{
    question: "30 – What controls the publishing and retiring process for knowledge articles?",
    answers: [
      { text: "A - Workflow Designer.", correct: false  },
      { text: "B - Workflows.", correct: true },
      { text: "C - State Lifecycle.", correct: false },
      { text: "D - Approval Policies.", correct: false },
      { text: "E - Approval Definitions.", correct: false },
      { text: "", correct: false }
    ]
  }
]