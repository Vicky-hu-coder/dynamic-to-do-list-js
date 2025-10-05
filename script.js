// Ensure all code runs after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements using the exact variable names required by the tests
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user and stop
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When Remove is clicked, remove this list item from the task list
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the Remove button to the list item and the list item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add task when the Add Task button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter is pressed inside the input field (keypress event specifically)
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
