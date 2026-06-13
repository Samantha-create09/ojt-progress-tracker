console.log("Calendar Loaded");

let currentDate = new Date();

const calendarGrid =
document.getElementById("calendarGrid");

const monthYear =
document.getElementById("monthYear");

const selectedTasks =
document.getElementById("selectedTasks");

function getTasks() {

return JSON.parse(
localStorage.getItem("tasks")
) || [];

}

function renderCalendar() {

if(!calendarGrid) return;

calendarGrid.innerHTML = "";

const tasks = getTasks();

const year =
currentDate.getFullYear();

const month =
currentDate.getMonth();

monthYear.textContent =
new Date(
year,
month
).toLocaleString(
"default",
{
month:"long",
year:"numeric"
}
);

const firstDay =
new Date(
year,
month,
1
).getDay();

const totalDays =
new Date(
year,
month + 1,
0
).getDate();

for(let i=0;i<firstDay;i++){

const empty =
document.createElement("div");

calendarGrid.appendChild(empty);

}

for(let day=1;day<=totalDays;day++){

const fullDate =
`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

const dayTasks =
tasks.filter(
task => task.date === fullDate
);

const cell =
document.createElement("div");

cell.classList.add("calendar-date");

cell.innerHTML =
`
${day}
${dayTasks.length > 0
? '<div class="task-dot"></div>'
: ''}
`;

cell.addEventListener("click",()=>{

showTasks(fullDate);

});

calendarGrid.appendChild(cell);

}

}

function showTasks(date){

const tasks = getTasks();

const dayTasks =
tasks.filter(
task => task.date === date
);

if(dayTasks.length === 0){

selectedTasks.innerHTML =
`
<p>No tasks on this date.</p>
`;

return;

}

selectedTasks.innerHTML = "";

dayTasks.forEach((task,index)=>{

selectedTasks.innerHTML +=
`
<div class="selected-task">

<h4>${task.title}</h4>

<p>
📁 ${task.category}
</p>

<p>
⭐ ${task.priority}
</p>

<p>
🕒 ${task.startTime}
-
${task.deadline}
</p>

<button
class="edit-btn"
onclick="editCalendarTask('${date}',${index})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteCalendarTask('${date}',${index})">
Delete
</button>

</div>
`;

});

}

function deleteCalendarTask(date,index){

let tasks = getTasks();

const filtered =
tasks.filter(
task => task.date === date
);

const targetTask =
filtered[index];

tasks =
tasks.filter(
task =>
!(
task.title === targetTask.title &&
task.date === targetTask.date
)
);

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

showTasks(date);

renderCalendar();

}

function editCalendarTask(date,index){

    let tasks = getTasks();
    
    const filtered =
    tasks.filter(
    task => task.date === date
    );
    
    const task =
    filtered[index];
    
    const newTitle =
    prompt(
    "Task Title",
    task.title
    );
    
    if(newTitle !== null){
    task.title = newTitle;
    }
    
    const newCategory =
    prompt(
    "Category",
    task.category
    );
    
    if(newCategory !== null){
    task.category = newCategory;
    }
    
    const newPriority =
    prompt(
    "Priority (High / Medium / Low)",
    task.priority
    );
    
    if(newPriority !== null){
    task.priority = newPriority;
    }
    
    const newStart =
    prompt(
    "Start Time",
    task.startTime
    );
    
    if(newStart !== null){
    task.startTime = newStart;
    }
    
    const newEnd =
    prompt(
    "End Time",
    task.deadline
    );
    
    if(newEnd !== null){
    task.deadline = newEnd;
    }
    
    localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
    );
    
    showTasks(date);
    
    renderCalendar();
    
    }
    
function previousMonth(){

    currentDate.setMonth(
    currentDate.getMonth()-1
    );
    
    selectedTasks.innerHTML =
    "Select a date";
    
    renderCalendar();
    
    }

    function nextMonth(){

        currentDate.setMonth(
        currentDate.getMonth()+1
        );
        
        selectedTasks.innerHTML =
        "Select a date";
        
        renderCalendar();
        
        }

renderCalendar();