const API_URL = 'http://localhost:8080/api/tasks';

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

async function loadTasks() {
    try {
        const [todoTasks, ongoingTasks, completedTasks] = await Promise.all([
            fetch(`${API_URL}/status/TODO`).then(res => res.json()),
            fetch(`${API_URL}/status/ONGOING`).then(res => res.json()),
            fetch(`${API_URL}/status/COMPLETED`).then(res => res.json())
        ]);
        
        renderTasks('todoList', todoTasks);
        renderTasks('ongoingList', ongoingTasks);
        renderTasks('completedList', completedTasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function renderTasks(containerId, tasks) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        container.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `task-card ${task.priority.toLowerCase()}`;
    div.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="task-actions">
            ${getTaskActions(task)}
        </div>
    `;
    return div;
}

function getTaskActions(task) {
    const actions = [];
    
    if (task.status === 'TODO') {
        actions.push(`
            <button onclick="updateTaskStatus(${task.id}, 'ONGOING')">Start</button>
            <button onclick="updateTaskPriority(${task.id}, '${task.priority === 'IMPORTANT' ? 'UNIMPORTANT' : 'IMPORTANT'}')">
                ${task.priority === 'IMPORTANT' ? 'Mark Unimportant' : 'Mark Important'}
            </button>
        `);
    } else if (task.status === 'ONGOING') {
        actions.push(`
            <button onclick="updateTaskStatus(${task.id}, 'COMPLETED')">Complete</button>
            <button onclick="updateTaskStatus(${task.id}, 'TODO')">Move to Todo</button>
        `);
    } else if (task.status === 'COMPLETED') {
        actions.push(`
            <button onclick="deleteTask(${task.id})" class="delete">Delete</button>
        `);
    }
    
    return actions.join('');
}

async function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                priority
            })
        });
        
        if (response.ok) {
            clearForm();
            loadTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function updateTaskStatus(taskId, status) {
    try {
        const response = await fetch(`${API_URL}/${taskId}/status?status=${status}`, {
            method: 'PUT'
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error updating task status:', error);
    }
}

async function updateTaskPriority(taskId, priority) {
    try {
        const response = await fetch(`${API_URL}/${taskId}/priority?priority=${priority}`, {
            method: 'PUT'
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error updating task priority:', error);
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function clearForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskPriority').value = 'IMPORTANT';
} 