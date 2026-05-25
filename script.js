const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

taskForm.addEventListener("submit", function(event){

    event.preventDefault();

    const title = document.getElementById("title").value;

    const date = document.getElementById("date").value;

    const category = document.getElementById("category").value;

    const status = document.getElementById("status").value;

    const task = {
        title,
        date,
        category,
        status
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

                <td>${task.status}</td>

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

}

function deleteTask(index){

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}