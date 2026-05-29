const taskForm = document.getElementById("taskForm");

const taskContainer = document.getElementById("taskContainer");

const notesContainer = document.getElementById("notesContainer");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if(taskForm){

taskForm.addEventListener("submit", function(e){

e.preventDefault();

const task = {

title: document.getElementById("title").value,

category: document.getElementById("category").value,

priority: document.getElementById("priority").value,

startTime:
document.getElementById("startTime").value || "09:00",

deadline:
document.getElementById("deadline").value || "10:00",

date: document.getElementById("date").value,

status: "Pending",

notes: document.getElementById("notes").value

};

if(task.startTime >= task.deadline){

    alert(
    "Completion time must be after start time."
    );
    
    return;
    
    }

tasks.push(task);

localStorage.setItem("tasks", JSON.stringify(tasks));

alert("Task Added Successfully!");

taskForm.reset();

});

}

function displayTasks(){

    if(!taskContainer) return;
    
    taskContainer.innerHTML = "";
    
    const deadlineContainer =
    document.getElementById("deadlineContainer");
    
    if(deadlineContainer){
    deadlineContainer.innerHTML = "";
    }
    
    tasks.sort((a,b)=>{

        const order = {
        High:0,
        Medium:1,
        Low:2
        };
        
        return order[a.priority] - order[b.priority];
        
        });
    
    tasks.forEach((task,index)=>{
    
    let priorityClass = "low";
    
    if(task.priority === "High"){
    priorityClass = "high";
    }
    
    else if(task.priority === "Medium"){
    priorityClass = "medium";
    }
    
    const formattedDate =
    new Date(task.date)
    .toLocaleDateString(
    'en-GB',
    {
    day:'numeric',
    month:'short'
    }
    );
    
    let statusIcon = "🟡";
    
    if(task.status === "Completed"){
    statusIcon = "✅";
    }
    
    else if(task.status === "In Progress"){
    statusIcon = "🔵";
    }
    
    taskContainer.innerHTML += `
    
    <div class="task-card ${priorityClass}">
    
    <div class="task-left">
    
    <div class="time-box">
    
    <h3>${task.startTime}</h3>
    
    <p>to ${task.deadline}</p>
    
    </div>
    
    <div class="task-info">
    
    <h3>${task.title}</h3>
    
    <p>📁 ${task.category}</p>
    
    <p>📅 Due: ${formattedDate}</p>
    
    </div>
    
    </div>
    
    <div class="task-actions">
    
    <div class="status-tag">
    
    ${statusIcon}
    
    <select
    class="status-select"
    onchange="updateStatus(${index},this.value)"
    >
    
    <option value="Pending"
    ${task.status==="Pending"?"selected":""}>
    Pending
    </option>
    
    <option value="In Progress"
    ${task.status==="In Progress"?"selected":""}>
    In Progress
    </option>
    
    <option value="Completed"
    ${task.status==="Completed"?"selected":""}>
    Completed
    </option>
    
    </select>
    
    </div>
    
    <div class="action-buttons">
    
    <button
    class="edit-btn"
    onclick="editTask(${index})"
    >
    
    Edit
    
    </button>
    
    <button
    class="delete-btn"
    onclick="deleteTask(${index})"
    >
    
    Delete
    
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    `;
    
    if(deadlineContainer){
    
    deadlineContainer.innerHTML += `
    
    <div class="deadline-item">
    
    <h4>${task.title}</h4>
    
    <p>Due: ${formattedDate}</p>
    
    </div>
    
    `;
    
    }
    
    });
    
    }
    function deleteTask(index){

        const confirmDelete =
        confirm("Are you sure you want to delete this task?");
        
        if(confirmDelete){
        
        tasks.splice(index,1);
        
        localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
        );
        
        location.reload();
        
        }
        
        }

function updateStatus(index,newStatus){

    tasks[index].status = newStatus;
    
    localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
    );
    
    displayTasks();
    
    displayAnalytics();
    
    }

    function editTask(index){

        const task = tasks[index];
        
        const newTitle =
        prompt("Edit Title", task.title);
        
        const newCategory =
        prompt("Edit Category", task.category);
        
        const newPriority =
        prompt("Edit Priority", task.priority);
        
        const newStart =
        prompt("Edit Start Time", task.startTime);
        
        const newDeadline =
        prompt("Edit Deadline", task.deadline);
        
        if(
        newTitle &&
        newCategory &&
        newPriority &&
        newStart &&
        newDeadline
        ){
        
        task.title = newTitle;
        
        task.category = newCategory;
        
        task.priority = newPriority;
        
        task.startTime = newStart;
        
        task.deadline = newDeadline;
        
        localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
        );
        
        displayTasks();
        
        displayAnalytics();
        
        }
        
        }
function displayAnalytics(){

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");

const progressTasks = document.getElementById("progressTasks");

if(!totalTasks) return;

const completed = tasks.filter(task =>
task.status === "Completed").length;

const pending = tasks.filter(task =>
task.status === "Pending").length;

const progress = tasks.filter(task =>
task.status === "In Progress").length;

totalTasks.textContent = tasks.length;

completedTasks.textContent = completed;

pendingTasks.textContent = pending;

progressTasks.textContent = progress;

}

function displayNotes(){

if(!notesContainer) return;

notesContainer.innerHTML = "";

tasks.forEach(task=>{

if(task.notes.trim() !== ""){

notesContainer.innerHTML += `

<div class="note-card">

<h3>${task.title}</h3>

<p>${task.notes}</p>

</div>

`;

}

});

}

displayTasks();

displayAnalytics();

displayNotes();

let timer;

let isRunning = false;

let timeLeft = 1500;

const timerCircle =
document.querySelector(".timer-circle");

const focusBtn =
document.querySelector(".focus-btn");

function updateTimerDisplay(){

let minutes =
Math.floor(timeLeft / 60);

let seconds =
timeLeft % 60;

seconds =
seconds < 10
? "0" + seconds
: seconds;

timerCircle.textContent =
`${minutes}:${seconds}`;

}

if(focusBtn){

focusBtn.innerHTML =
"▶ Start";

focusBtn.addEventListener("click", ()=>{

if(!isRunning){

timer = setInterval(()=>{

timeLeft--;

updateTimerDisplay();

if(timeLeft <= 0){

clearInterval(timer);

alert("Session Complete!");

timeLeft = 1500;

updateTimerDisplay();

isRunning = false;

focusBtn.innerHTML =
"▶ Start";

}

},1000);

isRunning = true;

focusBtn.innerHTML =
"⏸ Pause";

}

else{

clearInterval(timer);

isRunning = false;

focusBtn.innerHTML =
"▶ Resume";

}

});

}

updateTimerDisplay();