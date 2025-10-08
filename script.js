document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = [];

  // Save tasks to Local Storage
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a task to DOM and optionally save
  function addTask(taskText, save = true) {
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    const task = { id: Date.now().toString(), text: trimmedText };
    tasks.push(task);

    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeTask(task.id));

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) saveTasksToLocalStorage();
  }

  // Remove task from DOM and Local Storage
  function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    const el = taskList.querySelector(`[data-id="${id}"]`);
    if (el) el.remove();
    saveTasksToLocalStorage();
  }

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = storedTasks;
    storedTasks.forEach(task => addTask(task.text, false));
  }

  // Initialize
  loadTasks();

  // Handle form submit
  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    addTask(taskInput.value, true);
    taskInput.value = '';
    taskInput.focus();
  });
});
