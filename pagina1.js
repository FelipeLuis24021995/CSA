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
      question: "1 - Your customer has a Human Resources knowledge base, which is only accessible to members of the Human Resources department. A new procedure regarding employee quarterly reviews needs to be published to the quarterly review category of the HR knowledge base but should only be visible to HR managers. How would you meet this requirement?",
      answers: [
        { text: "A - Add User Criteria for HR Manager Group on the Can Read of the article.", correct: true },
        { text: "B - Add User Criteria for HR Manager Group on the Category’s Can Read list.", correct: false },
        { text: "C - On the Knowledge article, add an Access Control for HR Manager Group on the Can Read list, then publish article to any category.", correct: false },
        { text: "D - On the Knowledge Base, add User Criteria with a Manager Can Read script to the Can Read list, publish article to any category.", correct: false },
        { text: "", correct: false },
        { text: "", correct: false }
      ]
    },{
      question: "2 – What access does a user need to be able to import articles to a knowledge base?",
      answers: [
        { text: "A - sn_knowledge_import", correct: false  },
        { text: "B - sn_knowledge_contribute", correct: false },
        { text: "C - Can contribute", correct: true },
        { text: "D - Sn_knowledge_write", correct: false },
        { text: "E - Can write", correct: false },
        { text: "F - Can import", correct: false }
      ]
    },{
      question: "3 – What is an advantage of defining relationship types between CI Classes?",
      answers: [
        { text: "A - Improves data quality, as the CIs will automatically be related when the CMDB is activated.", correct: false  },
        { text: "B - It prevents user from relating CIs incorrectly.", correct: false },
        { text: "C - It automates the loading of CI Dependency View.", correct: true },
        { text: "D - Makes relating CIs easier, because predefined relationship suggest which types of CIs should be.", correct: false },
        { text: "", correct: false },
        { text: "", correct: false }
      ]
    },{
      question: "4 – Certain tables have a prefix like hr_ - Which kind of table has a name that starts with a custom prefix?",
      answers: [
        { text: "A - Excluded table.", correct: false  },
        { text: "B - Scoped application table.", correct: true },
        { text: "C - System table.", correct: false },
        { text: "D - Explanation table.", correct: false },
        { text: "E - Xray Search table.", correct: false },
        { text: "", correct: false }
      ]
    },{
      question: "5 – Sections on a form can appear as: - One or two columns – Tabs  -  From Form Designer, how do you define a section, so it displays as a tab?",
      answers: [
        { text: "A - Click the Gear and check the Tab option.", correct: false  },
        { text: "B - Click the Context Menu > Configure Tabs.", correct: false },
        { text: "C - Add tab to the end of the section name.", correct: false },
        { text: "D - Add _tab to the end of the section name.", correct: false },
        { text: "E - Name the section.", correct: true },
        { text: "", correct: false }
      ]
    },{
      question: "6 – When a flow runs an action, it generates a runtime value, which stays the same for the duration of the flow. What is the name of this runtime value?",
      answers: [
        { text: "A - Data pill runtime value.", correct: true },
        { text: "B - Sequence runtime value.", correct: false },
        { text: "C - Starting runtime value.", correct: false },
        { text: "D - Trigger runtime value.", correct: false },
        { text: "E - Input runtime value.", correct: false },
        { text: "", correct: false }
      ]
    },{
      question: "7 – While on an Incident record, how would you add a Tag for “Special Handing” to the record?",
      answers: [
        { text: "A - Click on the Context Menu, select Add Tag, type Special Handing, press enter.", correct: false  },
        { text: "B - On the Special Handing field, check the box.", correct: false },
        { text: "C - On the Tag field, select Special Handing from the choice list.", correct: false },
        { text: "D - Click on the … icon, click Add Tag, type Special Handing, press enter.", correct: true },
        { text: "", correct: false },
        { text: "", correct: false }
      ]
    },{
      question: "8 – Your customer requires that they be able to monitor which users are performing impersonations in their instance. What would you do to meet that requirement?",
      answers: [
        { text: "A - Add the role Log Write [sn_log_write] to the Impersonator Group.", correct: false  },
        { text: "B - Activate the glide.sys.log_impersonation script.", correct: true },
        { text: "C - Create user update set for impersonation tracking.", correct: false },
        { text: "D - On the Impersonator role record, right click and select Create Log.", correct: false },
        { text: "E - From User icon, select Elevate Roles.", correct: false },
        { text: "", correct: false }
      ]
    },{
      question: "9 – A manager wants to view a snapshot of month-end Sales performance data, as compared to Sales targets. In addition, the manager wants to be able to see those Monthly numbers trended over time and forecasted into the future. What capability do you suggest for this manager?",
      answers: [
        { text: "A - Key Performance Indicators.", correct: false  },
        { text: "B - Scheduled Reports, a custom snapshot table and a Trend report.", correct: false },
        { text: "C - Scheduled Reports, a custom snapshot table and a Projection report.", correct: false },
        { text: "D - Performance Analytics.", correct: true },
        { text: "E - Scheduled Reports and Excel.", correct: false },
        { text: "", correct: false }
      ]
    },{
      question: "10 – A Service Catalog Project will involve Building 80 catalog items. For each of the catalog items, the following fields will be mandatory on the forms: --- Requested for - Requested by - Approving manager - Delivery instructions --- All of the other variables will be specific to the individual catalog item. What features would you use when designing the catalog item form?",
      answers: [
        { text: "A - Create na Order Guide, which includes all variables; then copy and hide variables as needed.", correct: false  },
        { text: "B - Create one Variable Set for the four variables; then add that variables set to each of the 80 catalog items.", correct: true},
        { text: "C - Create a Variable Set Template; then apply to all of the catalog items.", correct: false },
        { text: "D - Create a Record Producer that contains the four fields; then add to the record producer related list on the Catalog items.", correct: false },
        { text: "E - Create a Flow Designer Action, with Variable Set Data Pill; then apply flow to all of the 80 catalog items.", correct: false },
        { text: "", correct: false }
      ]
    }
]