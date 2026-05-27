const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

taskForm.addEventListener("submit", function(event){

    event.preventDefault();

    const title = document.getElementById("title").value;

    const date = document.getElementById("date").value;

    const category = document.getElementById("category").value;

    const status = document.getElementById("status").value;

    const notes = document.getElementById("notes").value;

    const task = {
        title,
        date,
        category,
        status,
        notes
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    taskForm.reset();

});

function displayTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        taskList.innerHTML += `

            <tr>

                <td>${task.title}</td>

                <td>${task.date}</td>

                <td>${task.category}</td>

                <td class="
${task.status === 'Pending'
? 'status-pending'
: task.status === 'In Progress'
? 'status-progress'
: 'status-completed'}
">

${task.status}

</td>

                <td>${task.notes}</td>

                <td>

                    <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">

                    Delete

                    </button>

                </td>

            </tr>

        `;

    });

    updateSummary();

}

function deleteTask(index){

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}

function updateSummary(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task =>
        task.status === "Completed"
    ).length;

    const pending = tasks.filter(task =>
        task.status === "Pending"
    ).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}