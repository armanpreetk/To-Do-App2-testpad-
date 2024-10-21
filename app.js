// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
  }
  
  // Function to save tasks to local storage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Get the task list and new task textarea
  const taskList = document.getElementById('task-list');
  const taskTextarea = document.getElementById('new-task');
  
  // Add event listener for pressing Enter in the textarea
  taskTextarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && taskTextarea.value.trim() !== '') {
      event.preventDefault();
      addTask(taskTextarea.value);
      taskTextarea.value = ''; // Clear the textarea
    }
  });
  
  // Add task to the list and local storage
  function addTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);
    createTaskElement(taskText, false);
  }
  
  // Function to create the task element
  function createTaskElement(taskText, isCompleted) {
    const newTask = document.createElement('li');
  
    // Checkbox to mark the task as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', function() {
      toggleTaskCompletion(taskText);
    });
  
    // Task content
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    if (isCompleted) {
      taskContent.classList.add('completed');
    }
  
    // Edit button
    const editBtn = document.createElement('span');
    editBtn.textContent = '✏️';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', function() {
      editTask(taskText, taskContent);
    });
  
    // Delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
      deleteTask(taskText, newTask);
    });
  
    // Append elements to the task item
    newTask.appendChild(checkbox);
    newTask.appendChild(taskContent);
    newTask.appendChild(editBtn);
    newTask.appendChild(deleteBtn);
  
    // Add the task to the task list
    taskList.appendChild(newTask);
  }
  
  // Function to toggle task completion status
  function toggleTaskCompletion(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      if (task.text === taskText) {
        task.completed = !task.completed;
      }
    });
    saveTasks(tasks);
    taskList.innerHTML = ''; // Clear the task list
    loadTasks(); // Reload the updated task list
  }
  
  // Function to delete a task
  function deleteTask(taskText, taskElement) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    saveTasks(updatedTasks);
    taskList.removeChild(taskElement);
  }
  
  // Function to edit a task
  function editTask(oldTaskText, taskContent) {
    const newTaskText = prompt('Edit your task:', oldTaskText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        if (task.text === oldTaskText) {
          task.text = newTaskText;
        }
      });
      saveTasks(tasks);
      taskContent.textContent = newTaskText;
    }
  }
  
  // Load tasks from local storage on page load
  document.addEventListener('DOMContentLoaded', loadTasks);
  