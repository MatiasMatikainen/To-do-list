let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Enter näppäimen tuki
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        // Valintaruutu
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed || false;
        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        };
        li.appendChild(checkbox);

        // Teksti
        const text = document.createElement('div');
        text.className = 'task-text';
        text.innerHTML = `<strong>${task.text}</strong><br><span class="task-time">${task.time}</span>`;
        if (task.completed) {
            text.style.textDecoration = 'line-through';
            text.style.opacity = '0.6';
        }
        li.appendChild(text);

        // Napit
        const btnGroup = document.createElement('div');
        btnGroup.className = 'buttons';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.onclick = () => {
            const newTask = prompt("Edit your task:", task.text);
            if (newTask) {
                tasks[index].text = newTask.trim();
                saveTasks();
                renderTasks();
            }
        };

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);
        li.appendChild(btnGroup);
        list.appendChild(li);
    });
}

// Lisää uusi tehtävä
function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText) {
        const timestamp = new Date().toLocaleString();
        tasks.push({ text: taskText, time: timestamp, completed: false });
        saveTasks();
        renderTasks();
        input.value = '';
    }
}

renderTasks();