
let tasks = [];
const taskList = document.getElementById('taskList');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescInput = document.getElementById('taskDescription');
const addTaskButton = document.getElementById('addTaskBtn');
const filterSelect = document.getElementById('filter');


window.onload = () => {
  loadTasksFromLocalStorage();
  displayTasks();
};


addTaskButton.addEventListener('click', () => {
  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();

  if (title === '') {
    alert('Task title cannot be empty');
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false
  };

  tasks.push(newTask);
  saveTasksToLocalStorage();
  displayTasks();

  taskTitleInput.value = '';
  taskDescInput.value = '';
});


function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}


function displayTasks() {
  taskList.innerHTML = '';
  const filter = filterSelect.value;

  tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .forEach(task => {
      const li = document.createElement('li');
      li.className = task.completed  ?'completed' : '';

      li.innerHTML = `
        <span>
          <strong>${task.title}</strong>: ${task.description}
        </span>
        <span class="task-actions">
          <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </span>
      `;
      taskList.appendChild(li);
    });
}


function toggleTaskCompletion(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasksToLocalStorage();
  displayTasks();
}


function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasksToLocalStorage();
  displayTasks();
}


filterSelect.addEventListener('change', displayTasks);

