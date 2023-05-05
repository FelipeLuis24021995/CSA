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
    question: "11 – Tables may be set up with Many to Many relationships. What is a classic example of a scenario where the tables would have many to many relationships?",
    answers: [
      { text: "A - A Task can trigger many Workflows; and a Workflow can trigger many Tasks.", correct: false  },
      { text: "B - Vendors can sell multiple products; and products can be sold by multiple vendors.", correct: true },
      { text: "C - Requests can contain many items; and items can be any item from the catalog.", correct: false },
      { text: "D - Requests can contain many items; and items can be any item from the catalog.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "12 – When moving a homepage or dashboard between instances, what must you remember?",
    answers: [
      { text: "A - They are automatically added to the update set.", correct: false  },
      { text: "B - Create a separate update set for them.", correct: false },
      { text: "C - They can be moved using ZIP files.", correct: false },
      { text: "D - They cannot be moved via XML.", correct: false },
      { text: "E - Manually add them to the update set.", correct: true },
      { text: "F - They cannot be moved via update set.", correct: false }
    ]
  },{
    question: "13 – Which storefront is a single location for accessing pre-built spokes, to quickly integrate with third party services to build and share content?",
    answers: [
      { text: "A - Integration One Stop.", correct: false  },
      { text: "B - Spoke Store.", correct: false },
      { text: "C - ServiceNow Spoke Store.", correct: false },
      { text: "D - Integration Portal.", correct: false },
      { text: "E - ServiceNow Store.", correct: true },
      { text: "F - Integration Spoke Hub.", correct: false }
    ]
  },{
    question: "14 – What type of rule specifies which user or groups are responsible to work on different types of tasks?",
    answers: [
      { text: "A - On-call.", correct: false  },
      { text: "B - Assigment.", correct: true },
      { text: "C - Routing.", correct: false },
      { text: "D - Calendar.", correct: false },
      { text: "E - Escalation.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "15 – If you have the impersonate role, what type of user are you not able to impersonate?",
    answers: [
      { text: "A - Extended Security Admin.", correct: true },
      { text: "B - Security Desk Users.", correct: false },
      { text: "C - Special Agents.", correct: false },
      { text: "D - Government Customers.", correct: false },
      { text: "E - Security Incident Response Users.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "16 – What is the most important thing to remember about activating a Plugin?",
    answers: [
      { text: "A - Install dependent plugins first.", correct: false  },
      { text: "B - Tick the box for adding demo data.", correct: false },
      { text: "C - Plugins once installed, cannot be uninstalled.", correct: true },
      { text: "D - Submit a HI ticket to get authorization.", correct: false },
      { text: "E - Plugins are prohibited in personal developer instances.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "17 – A new Service Desk employee in Latin America complains that the created dates and times are incorrect on their incident list. What would you suggest to fix this issue?",
    answers: [
      { text: "A - Use the system properties to connect the instance’s time zone.", correct: false  },
      { text: "B - Have them connect the time zone on their computer.", correct: false },
      { text: "C - Recommend they use Chrome, instead of Explorer.", correct: false },
      { text: "D - Have them use the gear icon is set the employee’s time zone.", correct: true },
      { text: "E - Have them clear their cache.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "18 – A manager is complaining that they can’t get the data they need on a report, because the data resides in two different tables. This data is used for many different reports in their department. You have checked to see if dot-walking will meet the requirement, and it is not possible. What else might you try to help this manager?",
    answers: [
      { text: "A - Create a Database View.", correct: true },
      { text: "B - Create a Report Source.", correct: false },
      { text: "C - Create a custom table.", correct: false },
      { text: "D - Export the tables to spreedsheet.", correct: false },
      { text: "E - Create a Report Template.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "19 – Tables can be characterized in multiple ways. Which of these combinations is possible?",
    answers: [
      { text: "A - Custom and Core.", correct: true },
      { text: "B - Custom and Child.", correct: false },
      { text: "C - Custom and Child.", correct: false },
      { text: "D - Custom and Parent.", correct: false },
      { text: "E - Core and Base.", correct: false },
      { text: "F - Child and Base.", correct: false }
    ]
  },{
    question: "20 – What section on the notes tab, shows the history of the work documented on the record?",
    answers: [
      { text: "A - Journal.", correct: false  },
      { text: "B - Audit Log.", correct: false },
      { text: "C - Diary.", correct: false },
      { text: "D - Activity.", correct: true },
      { text: "E - Timeline.", correct: false },
      { text: "", correct: false }
    ]
  }
]