let tasksContainer = document.querySelector('#tasks-display');
let openFormButton = document.querySelector('#open-form');
let initMessage = document.querySelector('#notasks')
let modal = document.querySelector('#modal');

// Inicializamos las tareas como un array vacio:
let tasks = [];

const toggleModal = (modal, className) => {
    modal.classList.toggle(className);
}

// Función que muestra o no el mensaje inicial, 
// según si hay o no tareas en la lista
const showHideInitMessage = (tasks) => {
    if (tasks.length === 0) {
        initMessage.classList.remove('hidden');
    } else {
        initMessage.classList.add('hidden');
    }
}


const showTasks = () => {
    document.addEventListener('load', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        showHideInitMessage(tasks);
        if (tasks.length > 0) {
            tasksContainer.classList.add('active');
            tasksContainer.classList.remove('hidden');
        } else {
            tasksContainer.classList.remove('active');
            tasksContainer.classList.add('hidden');
        }
    })
}

openFormButton.addEventListener('click', () => {
    toggleModal(modal, 'active');
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    initMessage.classList.add('hidden');
});

addTask()


//Close form
    const closeForm = () => {
        modal.classList.toggle('active')
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        showHideInitMessage(tasks);
        initMessage.classList.toggle('hidden')
    }

let closeFormButton = document.querySelector('#close-form').addEventListener('click', closeForm)
let cancelButton = document.querySelector('#cancel-add-task').addEventListener('click', closeForm)

//Add task
function addTask () {
let form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let taskPriority = document.querySelector('input[name="priority"]:checked').classList[1];

        let task = {
            name: e.target.elements.taskName.value,
            category: e.target.elements.clasification.value,
            priority: taskPriority,
            done: false
            }
        
        //Añadimos la tarea a localStorage:
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks));

        //Añadimos la tarea al container de tareas:
        const tasksContainer = document.querySelector('#tasks-display');
        
        tasks.forEach(task => {

            let selectIcon = '';
        
            let job = './assets/job.png';
            let entertainment = './assets/ent2.png';
            let domestic = './assets/home1.png';
            let personal = './assets/personal2.png';
        
            let select = document.querySelector('#clasification'); //se puede poner el .value aca, cuando este todo refactorizar.
            let taskCategory = select.value;
        
            switch (taskCategory) {
                case 'Laboral':
                selectIcon = job;
                break
                case 'Personal':
                selectIcon = personal;
                break
                case 'Domestica':
                selectIcon = domestic;
                break
                case 'Entretenimiento':
                selectIcon = entertainment;
                break
            }
        
            let addedTask = `<div class="list-item priority-container ${task.priority}">
                                <img alt=${task.category} class="selectedIcon"src=${selectIcon}></img>
                                <div class=task-content>        
                                    <input class="input-content" type="text" value=${task.name} readonly />
                                </div>
                                        <div class="task-btns-container">
                                        <div class="content-container">
                                            <input class="checked-input" type="checkbox" checked=${task.done} onclick="checkItem()/>
                                            </div>
                                            <button class="edit" title="edit" onclick="editItem()">
                                            <button class="delete" title="delete" onclick="deleteItem()">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="Layer_20" data-name="Layer 20"><path d="M49.93,17.33H41.87V12a1.5,1.5,0,0,0-1.5-1.5H23.63a1.5,1.5,0,0,0-1.5,1.5v5.33H14.07a1.5,1.5,0,0,0,0,3H16V48a5.49,5.49,0,0,0,5.49,5.48h21.1A5.49,5.49,0,0,0,48,48V20.33h1.89A1.5,1.5,0,0,0,49.93,17.33ZM25.13,13.5H38.87v3.83H25.13ZM45,48a2.49,2.49,0,0,1-2.49,2.48H21.45A2.49,2.49,0,0,1,19,48V20.33H45Z"/><path d="M28,25.87a1.5,1.5,0,0,0-1.5,1.5V43.46a1.5,1.5,0,1,0,3,0V27.37A1.5,1.5,0,0,0,28,25.87Z"/><path d="M36,25.87a1.5,1.5,0,0,0-1.5,1.5V43.46a1.5,1.5,0,1,0,3,0V27.37A1.5,1.5,0,0,0,36,25.87Z"/></g></svg>
                                            </button>
                                        </div>
                            </div>`;
            
        tasksContainer.insertAdjacentHTML('beforeend', addedTask)
        e.target.reset();
    })
})
}

const deleteItem = () => { 
    var currentTasks = document.querySelectorAll(".delete");
        for(var i=0; i < currentTasks.length; i++){
        currentTasks[i].onclick = function(){
            this.parentNode.remove();
            dayOff.style.display = 'flex';
            tasksContainer.style.display = 'none';
            //openForm.style.display = 'flex'
        }
    }
}

