const taskForm = document.getElementById("taskForm");

const taskContainer = document.getElementById("taskContainer");

const notesContainer = document.getElementById("notesContainer");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if(taskForm){

taskForm.addEventListener("submit", function(e){

e.preventDefault();

const selectedDate =
document.getElementById("date").value;

const todayDate =
new Date();

todayDate.setHours(0,0,0,0);

const taskDate =
new Date(selectedDate);

if(taskDate < todayDate){

alert(
"You cannot add tasks for past dates."
);

return;

}

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

notes:
document.getElementById("notes").value,

mentorFeedback:
document.getElementById("mentorFeedback").value,

errors:
document.getElementById("errors").value

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

function formatTime(time){

    if(!time) return "--:--";
    
    let [hours,minutes] = time.split(":");
    
    hours = parseInt(hours);
    
    const ampm =
    hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12 || 12;
    
    return `${hours}:${minutes} ${ampm}`;
    
    }
    
    function displayTasks(){
    
    if(!taskContainer) return;
    
    taskContainer.innerHTML = "";
    
    const deadlineContainer =
    document.getElementById("deadlineContainer");
    
    if(deadlineContainer){
    deadlineContainer.innerHTML = "";
    }
    
    const todayDate = new Date();

const today =
todayDate.getFullYear() +
"-" +
String(todayDate.getMonth()+1).padStart(2,"0") +
"-" +
String(todayDate.getDate()).padStart(2,"0");
    
    tasks.sort((a,b)=>{
    
    const order = {
    High:0,
    Medium:1,
    Low:2
    };
    
    return order[a.priority] -
    order[b.priority];
    
    });
    
    tasks.forEach((task,index)=>{
    
    let priorityClass = "low";
    
    if(task.priority === "High"){
    priorityClass = "high";
    }
    else if(task.priority === "Medium"){
    priorityClass = "medium";
    }
    
    const isToday =
    task.date === today;
    
    let formattedDate;
    
    if(isToday){
    formattedDate = "Today";
    }
    else{
    formattedDate =
    new Date(task.date)
    .toLocaleDateString(
    'en-GB',
    {
    day:'numeric',
    month:'short'
    }
    );
    }
    
    let statusIcon = "🟡";
    
    if(task.status === "Completed"){
    statusIcon = "🟢";
    }
    else if(task.status === "In Progress"){
    statusIcon = "🔵";
    }
    
    if(isToday){
    
    taskContainer.innerHTML += `
    
    <div class="task-card ${priorityClass}">
    
    <div class="task-left">
    
    <div class="time-box">
    
    <h3>${formatTime(task.startTime)}</h3>
    
    <h3>${formatTime(task.deadline)}</h3>
    
    </div>
    
    <div class="task-info">
    
    <h3>${task.title}</h3>
    
    <p>📁 ${task.category}</p>
    
    <p>📅 ${formattedDate}</p>
    
    </div>
    
    </div>
    
    <div class="task-actions">
    
    <div class="status-tag">
    <select
    class="status-select"
    onchange="updateStatus(${index},this.value)"
    >
    
    <option value="Pending"
    ${task.status==="Pending"?"selected":""}>
    🟡 Pending
    </option>
    
    <option value="In Progress"
    ${task.status==="In Progress"?"selected":""}>
    🔵 In Progress
    </option>
    
    <option value="Completed"
    ${task.status==="Completed"?"selected":""}>
    🟢 Completed
    </option>
    
    </select>
    
    </div>
    
    <div class="action-buttons">
    
    <button
    class="edit-btn"
    onclick="editTask(${index})">
    Edit
    </button>
    
    <button
    class="delete-btn"
    onclick="deleteTask(${index})">
    Delete
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    `;
    
    }
    
    const taskDate =
new Date(task.date);

const todayDate =
new Date(today);

if(
deadlineContainer &&
taskDate > todayDate
){
    
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
        confirm("Delete this task?");
        
        if(confirmDelete){
        
        tasks.splice(index,1);
        
        localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
        );
        
        displayTasks();
        displayAnalytics();
        displayNotes();
        
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

    let editIndex = null;

    function editTask(index){
    
    editIndex = index;
    
    const task = tasks[index];
    
    document.getElementById("editTitle").value =
    task.title;
    
    document.getElementById("editCategory").value =
    task.category;
    
    document.getElementById("editPriority").value =
    task.priority;
    
    document.getElementById("editStart").value =
    task.startTime;
    
    document.getElementById("editEnd").value =
    task.deadline;
    
    document.getElementById("editDate").value =
    task.date;
    
    document.getElementById("editNotes").value =
    task.notes;
    
    document.getElementById("editModal").style.display =
    "flex";
    
    }
    
    function closeModal(){
    
    document.getElementById("editModal").style.display =
    "none";
    
    }
    
    function saveEdit(){
    
    tasks[editIndex].title =
    document.getElementById("editTitle").value;
    
    tasks[editIndex].category =
    document.getElementById("editCategory").value;
    
    tasks[editIndex].priority =
    document.getElementById("editPriority").value;
    
    tasks[editIndex].startTime =
    document.getElementById("editStart").value;
    
    tasks[editIndex].deadline =
    document.getElementById("editEnd").value;
    
    tasks[editIndex].date =
    document.getElementById("editDate").value;
    
    tasks[editIndex].notes =
    document.getElementById("editNotes").value;
    
    localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
    );
    
    closeModal();
    
    displayTasks();
    displayAnalytics();
    displayNotes();
    
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

    const learningContainer =
    document.getElementById("learningContainer");
    
    const mentorContainer =
    document.getElementById("mentorContainer");
    
    const errorContainer =
    document.getElementById("errorContainer");
    
    const achievementContainer =
    document.getElementById("achievementContainer");
    
    const totalLearningNotes =
    document.getElementById("totalLearningNotes");
    
    const mentorCount =
    document.getElementById("mentorCount");
    
    if(
    !learningContainer &&
    !mentorContainer &&
    !errorContainer
    ){
    return;
    }
    
    if(learningContainer)
    learningContainer.innerHTML = "";
    
    if(mentorContainer)
    mentorContainer.innerHTML = "";
    
    if(errorContainer)
    errorContainer.innerHTML = "";
    
    let learnings = 0;
    let mentors = 0;
    let errors = 0;
    
    tasks.forEach(task=>{
    
    if(!task.notes) return;
    
    const type =
    task.noteType || "Learning";
    
    const card = `
    
    <div class="note-card">
    
    <h3>${task.title}</h3>
    
    <p>${task.notes}</p>
    
    </div>
    
    `;
    
    if(type === "Learning"){
    
    learnings++;
    
    if(learningContainer)
    learningContainer.innerHTML += card;
    
    }
    
    if(type === "Mentor"){
    
    mentors++;
    
    if(mentorContainer)
    mentorContainer.innerHTML += card;
    
    }
    
    if(type === "Error"){
    
    errors++;
    
    if(errorContainer)
    errorContainer.innerHTML += card;
    
    }
    
    });
    
    if(totalLearningNotes){
    
    totalLearningNotes.textContent =
    learnings;
    
    }
    
    if(mentorCount){
    
    mentorCount.textContent =
    mentors;
    
    }
    
    if(achievementContainer){
    
    achievementContainer.innerHTML = "";
    
    if(tasks.length >= 1){
    
    achievementContainer.innerHTML +=
    
    `
    <div class="achievement-card">
    🚀
    <h3>First Task Added</h3>
    <p>Unlocked</p>
    </div>
    `;
    
    }
    
    if(learnings >= 1){
    
    achievementContainer.innerHTML +=
    
    `
    <div class="achievement-card">
    📚
    <h3>First Learning Logged</h3>
    <p>Unlocked</p>
    </div>
    `;
    
    }
    
    if(tasks.length >= 10){
    
    achievementContainer.innerHTML +=
    
    `
    <div class="achievement-card">
    ⭐
    <h3>10 Tasks Completed</h3>
    <p>Unlocked</p>
    </div>
    `;
    
    }
    
    }
    
    }
displayTasks();

displayAnalytics();

displayNotes();

/* ======================
FOCUS TIMER
====================== */

let timer;
let isRunning = false;

const timerCircle =
document.querySelector(".timer-circle");

const startBtn =
document.getElementById("startBtn");

const pauseBtn =
document.getElementById("pauseBtn");

const resetBtn =
document.getElementById("resetBtn");

const timerMinutes =
document.getElementById("timerMinutes");

let timeLeft = 1500;

function updateTimerDisplay(){

if(!timerCircle) return;

const mins =
Math.floor(timeLeft / 60);

const secs =
timeLeft % 60;

timerCircle.innerHTML =

`${mins}:${secs < 10 ? "0"+secs : secs}`;

}

if(startBtn){

startBtn.addEventListener("click",()=>{

if(isRunning) return;

const selectedMinutes =

parseInt(timerMinutes.value);

if(
selectedMinutes < 1 ||
selectedMinutes > 60
){

alert(
"Timer must be between 1 and 60 minutes."
);

return;

}

if(timeLeft <= 0){

timeLeft =
selectedMinutes * 60;

}

timer = setInterval(()=>{

timeLeft--;

updateTimerDisplay();

if(timeLeft <= 0){

clearInterval(timer);

isRunning = false;
timerMinutes.disabled = false;

alert(
"Focus Session Completed 🎉"
);

}

},1000);

isRunning = true;
timerMinutes.disabled = true;

});

}

if(pauseBtn){

pauseBtn.addEventListener("click",()=>{

if(!isRunning){

timer = setInterval(()=>{

timeLeft--;

updateTimerDisplay();

if(timeLeft <= 0){

clearInterval(timer);

isRunning = false;

}

},1000);

isRunning = true;

pauseBtn.innerHTML =

"⏸ Pause";

}

else{

clearInterval(timer);

isRunning = false;

pauseBtn.innerHTML =

"▶ Resume";

}

});

}

if(resetBtn){

resetBtn.addEventListener("click",()=>{

clearInterval(timer);

isRunning = false;

const selectedMinutes =

parseInt(timerMinutes.value);

timeLeft = 0;
timerMinutes.disabled = false;

pauseBtn.innerHTML =
"⏸ Pause";

updateTimerDisplay();

});

}

if(timerMinutes){

timerMinutes.addEventListener("change",()=>{

timeLeft =
parseInt(timerMinutes.value) * 60;

updateTimerDisplay();

});

}

updateTimerDisplay();
