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
    question: "81 – After finishing your work on High Security Settings, what is a possible way to return to normal admin security levels?",
    answers: [
      { text: "A - Select Global Update Set.", correct: false  },
      { text: "B - End Impersonation.", correct: false },
      { text: "C - Use System Administration > Normal Security module.", correct: false },
      { text: "D - Select normal role.", correct: false },
      { text: "E - Log out and back in.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "82 – When designing a flow, how do you reference data from a record, in that flow?",
    answers: [
      { text: "A - Use the condition builder to specify the desired values.", correct: false  },
      { text: "B - Drag the data pill onto the flow definition.", correct: true },
      { text: "C - Add the table reference using the slush bucket.", correct: false },
      { text: "D - Specify the source table on the data pill related list.", correct: false },
      { text: "E - Drag the table icon onto the flow definition.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "83 – Access controls are evaluated in this order: - Match object against table ACL - Match the object against field ACL --- Within step 1 above, what order are table ACLs evaluated?",
    answers: [
      { text: "A - General to specific: Table ACL, Table.Field ACL, Parent Table.Field ACL.", correct: false  },
      { text: "B - Specific to general: Table.Field ACL, Parent Table.Field ACL,*.Field ACL.", correct: false },
      { text: "C - Top to bottom: Wildcard Table ACL, Parent Table ACL, Table ACL.", correct: false },
      { text: "D - Bottom to top: Table ACL, Table.Field ACL, Parent Table.Field ACL.", correct: false },
      { text: "E - Specific to general: Table ACL, Parent Table ACL, Wildcard (*) ACL.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "84 – Why is it recommended that you limit update sets to a maximum of 100 records? Choose 2 answers.",
    answers: [
      { text: "A -  Comply with ISO audit requirements.", correct: false  },
      { text: "B - Smaller update sets can be imported to production during business hours.", correct: false },
      { text: "C - Reduce potential conflicts.", correct: false },
      { text: "D - Improve ability to troubleshoot issues with default update set.", correct: false },
      { text: "E - Make it easier to identify and review changes.", correct: true},
      { text: "F - Keeps update set logs shorter.", correct: true }
    ]
  },{
    question: "85 – What import utility does the system use when the field names on the import set match the name of the fields on the Target table?",
    answers: [
      { text: "A - Schema Mapping.", correct: false  },
      { text: "B - Mapping Assist tool.", correct: false },
      { text: "C - Automatic Mapping.", correct: true},
      { text: "D - Mapping Dashboard.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "86 – When selecting the Target table for an import, which tables can you select? Choose 3 answers.",
    answers: [
      { text: "A - Related tables, using Dot Walk.", correct: false  },
      { text: "B - Tables outside of ServiceNow.", correct: false },
      { text: "C - Tables within the existing application scope.", correct: true },
      { text: "D - Tables within the global scope.", correct: true },
      { text: "E - Tables which allow write access to other applications.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "87 – A user wants to create a set of filter conditions, where they want to show records which satisfy two conditions: - Incidents where the state is Closed - Incidents where Assignment Group is Network --- After clicking the Funnel icon, what should the user do?",
    answers: [
      { text: "A - Define the first condition; click AND button; define second condition; click run.", correct: true },
      { text: "B - Define the first condition; click OR button; define second condition; press enter.", correct: false },
      { text: "C - Define the first condition; click > icon on breadcrumb, define second condition; press enter.", correct: false },
      { text: "D - Define the first condition; click > icon on breadcrumb, define second condition; click Run.", correct: false },
      { text: "E - Define the first condition; click AND button; define second condition; press enter.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "88 – Here is an example of the criteria set for a knowledge base: - Companies: ACME North America - Departments: HR - Groups: ACME Managers - Match All: Yes --- In this example, what users would have access to this knowledge base?",
    answers: [
      { text: "A - Members of the ACME Managers group, and HR department, regardless of geography.", correct: false  },
      { text: "B - Employees of ACME North America, who are members of HR Department or the ACME Managers group.", correct: false },
      { text: "C - Members of the ACME Manager group, who are also members of HR Department and part of ACME North America.", correct: true},
      { text: "D - Users which are members of either ACME North America, or HR Department, or ACME Managers group.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "89 – When using the Report Designer, it is a best practice to make a copy of an existing, then make modifications to your copy of that report. When viewing the report inside the designer, how would you make a copy of the report?",
    answers: [
      { text: "A - Click on the Paper icon and select Create New.", correct: false  },
      { text: "B - Click on the Properties tab and select Save As.", correct: false },
      { text: "C - Click on the down triangle and select Insert and Stay.", correct: false },
      { text: "D - Click on Context Menu and select Insert and Stay.", correct: true },
      { text: "E - Click on the Funnel icon and select Create Copy.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "90 – A department users SLA data advisory to run reports. They keep asking for help with building reports off of the same set of tables. They seem to be confused by Dot Walking. What could you do to make it easier for them to build their reports?",
    answers: [
      { text: "A - Create a custom table to house their reporting data.", correct: false  },
      { text: "B - Write knowledge articles explaining how to do Dot Walking.", correct: false },
      { text: "C - Create a Data Source for them, and show them how to use it.", correct: true },
      { text: "D - Send a team member to a reporting class; kick out any untrained users.", correct: false },
      { text: "E - Show them how to export to Excel format.", correct: false },
      { text: "", correct: false }
    ]
  }
]