// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load saved tasks on startup
window.onload = loadTasksFromLocalStorage;

// Add Task
addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
  }
});

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task}</span>
    <button class="deleteBtn">X</button>
  `;

  // Delete button logic
  li.querySelector('.deleteBtn').addEventListener('click', () => {
    taskList.removeChild(li);
    removeTaskFromLocalStorage(task);
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load tasks and display them
function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(addTaskToDOM);
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskToRemove) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
