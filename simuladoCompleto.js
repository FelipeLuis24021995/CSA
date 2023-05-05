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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
    question: "101 – Your customer wants to add the company’s email banner to each customer facing email notification. How would you approach this requirement?",
    answers: [
      { text: "A - Create a Company http email wrapper.", correct: false  },
      { text: "B - Create a Company email template.", correct: false },
      { text: "C - Create a Company CSS package for emails.", correct: false },
      { text: "D - Create a Company email header and footer.", correct: true },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "102 – What does Natural Language Query allow you to do on a list?",
    answers: [
      { text: "A - Set list filter, using audible commands.", correct: false  },
      { text: "B - Filter list by typing in a phrase.", correct: true },
      { text: "C - Predict the filter desired by the user.", correct: false },
      { text: "D - Speak to the condition builder.", correct: false },
      { text: "E - Automatically select a filter, based on keywords.", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "103 – What are examples of Core tables in ServiceNow platform?",
    answers: [
      { text: "A - Team, Party, Awards.", correct: false  },
      { text: "B - User, Task, Incident.", correct: true },
      { text: "C - Work, Caller, Timecard.", correct: false },
      { text: "D - Base Configuration Item, Configuration Item, Base task.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "104 – Which component of a table contains a piece of data for one record?",
    answers: [
      { text: "A - Item.", correct: false  },
      { text: "B - Factor.", correct: false },
      { text: "C - Datapoint.", correct: false },
      { text: "D - Element.", correct: false },
      { text: "E - Field.", correct: true },
      { text: "", correct: false }
    ]
  },{
    question: "105 – What feature do you use to specify which users are able to access a Service Catalog Item?",
    answers: [
      { text: "A - Can Order Tab.", correct: false  },
      { text: "B - Catalog user Role.", correct: false },
      { text: "C - Can Read Role.", correct: false },
      { text: "D - User Criteria", correct: true},
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "106 – Which application is used primarily to load data into ServiceNow? ",
    answers: [
      { text: "A - Data Import Configuration.", correct: false  },
      { text: "B - System Import Sets.", correct: true},
      { text: "C - Import Management.", correct: false },
      { text: "D - Import Hub.", correct: false },
      { text: "", correct: false },
      { text: "", correct: false }
    ]
  },{
    question: "107– Tables may have a One-to-Many relationship. From the Service Catalog, what are examples of tables having a one-to-many relationship? Choose 3 answers.",
    answers: [
      { text: "A - One Cart can have many Requests.", correct: false  },
      { text: "B - One Request can have many Requested Items.", correct: true },
      { text: "C - One Approval can have many Requests.", correct: false },
      { text: "D - One Requested Item can have many Approvals.", correct: true },
      { text: "E - One Requested Item can have many Catalog Tasks.", correct: true },
      { text: "", correct: false }
    ]
  },
]