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

startTime: document.getElementById("startTime").value,

deadline: document.getElementById("deadline").value,

date: document.getElementById("date").value,

status: document.getElementById("status").value,

notes: document.getElementById("notes").value

};

tasks.push(task);

localStorage.setItem("tasks", JSON.stringify(tasks));

alert("Task Added Successfully!");

taskForm.reset();

});

}

function displayTasks(){

if(!taskContainer) return;

taskContainer.innerHTML = "";

tasks.forEach((task, index)=>{

let priorityClass = "low";

if(task.priority === "High"){
priorityClass = "high";
}

else if(task.priority === "Medium"){
priorityClass = "medium";
}

taskContainer.innerHTML += `

<div class="task-card ${priorityClass}">

<h3>${task.title}</h3>

<p>📁 ${task.category}</p>

<p>🕒 ${task.startTime} - ${task.deadline}</p>

<p>📅 ${task.date}</p>

<p>📌 ${task.status}</p>

<button onclick="deleteTask(${index})">
Delete
</button>

</div>

`;

});

}

function deleteTask(index){

tasks.splice(index,1);

localStorage.setItem("tasks", JSON.stringify(tasks));

location.reload();

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