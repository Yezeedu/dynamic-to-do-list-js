document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Create a task element and append it to the list
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Add task and save to Local Storage
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        createTaskElement(taskText);
        saveTaskToStorage(taskText);
        taskInput.value = '';
    }

    // Save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks on page load
    loadTasks();
});
