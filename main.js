//Reference to input:
let taskNameInput = document.getElementById('task-name');
let descriptionInput = document.getElementById('task-description');
let select = document.getElementById('clasification');

//Reference to buttons:
let openForm = document.getElementById('go-to-form');
let cancelButton = document.getElementById('cancel-add-task');
let closeFormButton = document.getElementById('close-form');
let addTaskButton = document.getElementById('add-task');

//Reference to hidden/non-hidden elements:
let form = document.getElementById('form');
let dayOff = document.getElementById('notasks-container');
let tasksContainer = document.getElementById('tasks-container');
let ul = document.getElementById('tasks-list');
let li = document.querySelector('ul li');

//Creating tasks object:
let tasks = [];

//Functions:
// Open form:
const showForm = () => {
    dayOff.classList.toggle('hidden');
    form.classList.toggle('active');
    openForm.classList.toggle('hidden');
}

// Close form or cancel add task:
const closeOrCancel = () => {
    if (tasks.length > 0) {
        tasksContainer.classList.toggle('active');
    } else {
        dayOff.classList.toggle('hidden');
    }
    openForm.classList.toggle('hidden')
    form.classList.remove('active');
    form.classList.add('hidden');
}

// Add task:
addTaskButton.addEventListener("submit", (e) => {
    e.preventDefault();

    let priority = document.querySelector('input[name="priority"]:checked').classList[1];
    // Objeto creado para guardar las tareas despu 
    let task = {
        task: e.target.taskNameInput.value,
        description: e.target.descriptionInput.value,
        category: select.value,
        priority: priority
    };

    let selectValue = select.value;
    let selectIcon = '';
    let job = './assets/job.png';
    let entertainment = './assets/ent1.png';
    let domestic = './assets/home1.png';
    let personal = './assets/personal2.png';
    switch (selectValue) {
        case "Laboral":
        selectIcon = job;
        break
        case "Personal":
        selectIcon = personal;
        break
        case "Domestica":
        selectIcon = domestic;
        break
        case "Entretenimiento":
        selectIcon = entertainment;
        break
    }
    let modelo = `<li class="list-item">
                        <div class="priority-container ${priority}">
                            <img alt=${selectValue} class="selectedIcon"src=${selectIcon}></img>
                        </div>
                        <h4 class="taskTitle">${taskNameInput.value}</h4> 
                        <p class="taskDescription">${descriptionInput.value}</p>
                        <button class="delete" title="delete" onclick="deleteItem()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="Layer_20" data-name="Layer 20"><path d="M49.93,17.33H41.87V12a1.5,1.5,0,0,0-1.5-1.5H23.63a1.5,1.5,0,0,0-1.5,1.5v5.33H14.07a1.5,1.5,0,0,0,0,3H16V48a5.49,5.49,0,0,0,5.49,5.48h21.1A5.49,5.49,0,0,0,48,48V20.33h1.89A1.5,1.5,0,0,0,49.93,17.33ZM25.13,13.5H38.87v3.83H25.13ZM45,48a2.49,2.49,0,0,1-2.49,2.48H21.45A2.49,2.49,0,0,1,19,48V20.33H45Z"/><path d="M28,25.87a1.5,1.5,0,0,0-1.5,1.5V43.46a1.5,1.5,0,1,0,3,0V27.37A1.5,1.5,0,0,0,28,25.87Z"/><path d="M36,25.87a1.5,1.5,0,0,0-1.5,1.5V43.46a1.5,1.5,0,1,0,3,0V27.37A1.5,1.5,0,0,0,36,25.87Z"/></g></svg>
                        </button>
                    </li>`;
    ul.innerHTML += modelo;
    tasksContainer.classList.add('active')
    dayOff.style.display = 'none';
});

// Delete task:
const deleteItem = () => {
    var currentTasks = document.querySelectorAll(".delete");
        for(var i=0; i < currentTasks.length; i++){
        currentTasks[i].onclick = function(){
            this.parentNode.remove();
        }
    }
}

//Listeners
openForm.addEventListener('click', showForm);
closeFormButton.addEventListener('click', closeOrCancel);
cancelButton.addEventListener('click', closeOrCancel);