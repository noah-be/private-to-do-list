function editTask(taskId) {
    fetch(`/api/tasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
            // Populate the form fields in the popup
            document.getElementById('editTitle').value = task.title;
            document.getElementById('editPriority').value = task.priority;
            document.getElementById('editDone').checked = task.done;

            // Store the task ID in the form for later use
            document.getElementById('editTaskForm').setAttribute('data-task-id', taskId);

            // Display the popup
            document.getElementById('editTaskModal').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}






function updateTaskRowAppearance(taskRow, isDone, priority) {
    taskRow.classList.remove('done', 'not-done-low', 'not-done-normal', 'not-done-high');

    if (isDone) {
        taskRow.classList.add('done');
    } else {
        taskRow.classList.add(`not-done-${priority}`);
    }
}



function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');

    if (taskInput.value.trim() === '') {
        alert("Please enter a task");
        return;
    }

    const task = {
        task: taskInput.value,
        date: new Date().toLocaleDateString(),
        priority: priorityInput.value,
        done: false
    };

    fetch('/tasks/add-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(data => {
            appendTaskToTable(data.task, data.index);
            taskInput.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function appendTaskToTable(task, index) {
    const table = document.getElementById('todoTable');
    const row = table.insertRow(-1);

    const priorityClass = `not-done-${task.priority}`;
    row.classList.add('task-row', priorityClass);

    const isChecked = task.done ? 'checked' : '';

    row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td>${task.priority}</td>
        <td><input type="checkbox" ${isChecked} onchange="toggleTask(${index}, this)"></td>
    `;
}


window.addTask = addTask;
window.appendTaskToTable = appendTaskToTable;
window.updateTaskRowAppearance = updateTaskRowAppearance;
window.editTask = editTask;

