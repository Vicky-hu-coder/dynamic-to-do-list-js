document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  let tasks = [];

  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.textContent = task.text;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeTask(task.id));

    li.appendChild(span);
    li.appendChild(removeBtn);
    return li;
  }

  function addTask(taskOrText, save = true) {
    let task;
    if (typeof taskOrText === 'object') {
      task = taskOrText;
    } else {
      const text = taskOrText.trim();
      if (!text) return;
      task = { id: Date.now().toString(), text };
      tasks.push(task);
    }

    const li = createTaskElement(task);
    taskList.appendChild(li);

    if (save) saveTasksToLocalStorage();
  }

  function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    document.querySelector(`[data-id=\"${id}\"]`).remove();
    saveTasksToLocalStorage();
  }

  function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = stored;
    tasks.forEach(task => addTask(task, false));
  }

  loadTasks();

  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    addTask(taskInput.value, true);
    taskInput.value = '';
  });
});
