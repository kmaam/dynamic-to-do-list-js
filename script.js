// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  loadTasks();

  // Function to Add a Task
  function addTask(taskText = null, save = true) {
    const inputText = taskText || taskInput.value.trim();

    if (inputText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create a new <li> element for the task
    const li = document.createElement('li');
    li.textContent = inputText;

    // Create a "Remove" button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // When "Remove" button is clicked, remove <li> from DOM & storage
    removeButton.onclick = function () {
      taskList.removeChild(li);
      removeTaskFromStorage(inputText);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear input field
    if (!taskText) taskInput.value = '';

    // Save to localStorage
    if (save) {
      const tasks = getTasksFromStorage();
      tasks.push(inputText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // Get tasks from localStorage (helper)
  function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // Remove task from localStorage (helper)
  function removeTaskFromStorage(taskToRemove) {
    const tasks = getTasksFromStorage().filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage and render
  function loadTasks() {
    const storedTasks = getTasksFromStorage();
    storedTasks.forEach(task => addTask(task, false));
  }

  // Attach Event Listeners
  addButton.addEventListener('click', () => addTask());

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
