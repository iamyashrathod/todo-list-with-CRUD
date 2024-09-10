let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentEditIndex = -1;

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${index + 1}. ${task.text}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}

function editTask(index) {
    const taskInput = document.getElementById('new-task');
    taskInput.value = tasks[index].text;
    document.getElementById('add-button').style.display = 'none';
    document.getElementById('update-button').style.display = 'inline-block';
    currentEditIndex = index;
}

function updateTask() {
    const taskInput = document.getElementById('new-task');
    const updatedTaskText = taskInput.value.trim();
    
    if (updatedTaskText && currentEditIndex > -1) {
        tasks[currentEditIndex].text = updatedTaskText;
        taskInput.value = '';
        document.getElementById('add-button').style.display = 'inline-block';
        document.getElementById('update-button').style.display = 'none';
        currentEditIndex = -1;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', renderTasks);