//Creamos la variable tasks y le asignamos sus valores, que son: el array tasks de local storage, en caso de que tenga tareas almacenadas. En caso de que no tenga tareas almacenadas, un array vacio.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const form = document.querySelector('#form');
const taskNameInput = form.querySelector('input[name="taskName"]');
const taskClasificationInput = form.querySelector('select[name="taskClasification"]');
const taskDescriptionInput = form.querySelector('textarea[name="taskDescription"]');
const priorityInputs = form.querySelectorAll('input[name="priority"]');
const tasksList = document.querySelector('#tasks-list');
const initContainer = document.querySelector('#notasks');
const openFormButton = document.querySelector('#open-form');
const closeFormButton = form.querySelector('#close-form');
const cancelFormButton = form.querySelector('#cancel-add-task');
const taskModal = document.querySelector('#modal');

function renderTasks() {
    if (tasks.length === 0) {
        initContainer.style.display = 'flex';
        tasksList.innerHTML = '';
    } else {
    initContainer.style.display = 'none';
    tasksList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('task-item');
        const priorityClass = getPriorityClass(task.priority);
        const taskIcon = getTaskIcon(task.classification);
        listItem.innerHTML = `
            <div class="task-icon ${priorityClass}">
            <img src="${taskIcon}" alt="task icon" />
            </div>
            <div class="task-info">
            <h4>${task.name}</h4>
            <p>${task.description}</p>
            <div class="task-actions">
                <button class="delete-btn" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M16 6v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6"></path>
                    <line x1="10" y1="3" x2="10" y2="6"></line>
                    <line x1="14" y1="3" x2="14" y2="6"></line>
                </svg>
                </button>
            </div>
            </div>
        `;
        tasksList.appendChild(listItem);
        });
    }
}

function getPriorityClass(priority) {
    switch(priority) {
        case 'baja':
        return 'low-priority';
        case 'media':
        return 'medium-priority';
        case 'alta':
        return 'high-priority';
        default:
        return '';
    } 
}

function getTaskIcon(classification) {
    switch(classification) {
        case 'Personal':
        return './assets/personal.png';
        case 'Domestica':
        return './assets/domestica.png';
        case 'Entretenimiento':
        return './assets/entretenimiento.png';
        case 'Laboral':
        return './assets/laboral.png';
        default:
        return '';
    }
}

function addTask(event) {
    event.preventDefault(); 
    const taskNameInput = document.querySelector('input[name="taskName"]');
    const taskClasificationInput = document.querySelector('select[name="taskClasification"]');
    const taskDescriptionInput = document.querySelector('textarea[name="taskDescription"]');
    const priorityInput = document.querySelector('input[name="priority"]:checked');

    // Validación de campos
    if (!taskNameInput.value || !taskClasificationInput.value || !priorityInput) {
        alert('Por favor completa todos los campos!');
        return;
    }

    // Crear objeto de tarea
    const task = {
        name: taskNameInput.value,
        clasification: taskClasificationInput.value,
        description: taskDescriptionInput.value,
        priority: priorityInput.classList[1] // Clase de prioridad (baja, media, alta)
    };

    // Agregar tarea a la lista
    tasks.push(task);
    saveTasks();
    renderTasks();

    // Cerrar formulario
    closeModal();
}

tasks = loadTasks();

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');

    // Limpiar lista de tareas
    tasksList.innerHTML = '';

    // Agregar tareas a la lista
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.classList.add(`priority-${task.priority}`);
  
      const taskHeader = document.createElement('div');
      taskHeader.classList.add('task-header');
      taskHeader.innerHTML = `
        <h4>${task.name}</h4>
        <div class="icons-container">
          <img class="icon" src="./assets/${task.clasification.toLowerCase()}.png" alt="${task.clasification}">
        </div>
      `;
  
      const taskDescription = document.createElement('div');
      taskDescription.classList.add('task-description');
      taskDescription.innerHTML = `
        <p>${task.description}</p>
      `;
  
      const taskActions = document.createElement('div');
      taskActions.classList.add('task-actions');
      taskActions.innerHTML = `
        <button class="remove-task-btn" data-index="${index}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 5v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4h2v4h10V5h-4V3H7v2H5v4h14V5h-2z"/></svg>
        </button>
      `;
  
      taskItem.appendChild(taskHeader);
      taskItem.appendChild(taskDescription);
      taskItem.appendChild(taskActions);
      tasksList.appendChild(taskItem);
    });
  
    // Mostrar mensaje si no hay tareas

    }
    
    function noTasksSection() {
        const noTasks = document.getElementById("notasks");
        const tasksDisplay = document.getElementById("tasks-display");
        const tasksList = document.getElementById("tasks-list");
        if (tasksList.innerHTML.trim() === "") {
            noTasks.style.display = "block";
            tasksDisplay.style.display = "none";
        } else {
            noTasks.style.display = "none";
            tasksDisplay.style.display = "block";
        }
    }


function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        if (parsedTasks.length > 0) {
            parsedTasks.forEach((task) => {
            const { id, title, completed } = task;
            addTaskToList(id, title, completed);
            });
            return;
        }
        }
        // if no tasks are saved or parsed, display "no tasks" message
        noTasksSection();
}