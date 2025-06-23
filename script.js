// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to Add a Task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create a new <li> element for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a "Remove" button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // When "Remove" button is clicked, remove the <li> from the list
    removeButton.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the remove button to the <li>
    li.appendChild(removeButton);

    // Append the <li> to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
  }

  // Attach Event Listeners
  addButton.addEventListener('click', addTask); // Add task on button click

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask(); // Add task on Enter key press
    }
  });
});
