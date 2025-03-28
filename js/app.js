// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        renderTasks(tasks);
    };
    
    // Render tasks to the DOM
    const renderTasks = (tasks) => {
        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-tasks text-4xl mb-2"></i>
                    <p>No tasks yet. Add your first task above!</p>
                </div>
            `;
            return;
        }
        
        taskList.innerHTML = tasks.map(task => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow transition-shadow ${task.completed ? 'task-completed' : ''} ${'priority-' + task.priority}">
                <div class="flex justify-between items-start">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                            class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            data-id="${task.id}">
                        <h3 class="font-medium text-lg">${task.title}</h3>
                    </div>
                    <button class="text-red-500 hover:text-red-700" data-id="${task.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                ${task.description ? `<p class="mt-2 text-gray-600">${task.description}</p>` : ''}
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <i class="far fa-calendar-alt mr-1"></i>
                    ${new Date(task.createdAt).toLocaleDateString()}
                </div>
            </div>
        `).join('');
    };
    
    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-description').value.trim();
        const priority = document.getElementById('task-priority').value;
        
        if (!title) return;
        
        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTasks(tasks);
        taskForm.reset();
    });
    
    // Handle task completion and deletion
    taskList.addEventListener('click', (e) => {
        if (e.target.closest('input[type="checkbox"]')) {
            const checkbox = e.target.closest('input[type="checkbox"]');
            const taskId = Number(checkbox.dataset.id);
            
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.map(task => 
                task.id === taskId ? {...task, completed: checkbox.checked} : task
            );
            
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            renderTasks(updatedTasks);
        }
        
        if (e.target.closest('button[data-id]')) {
            const button = e.target.closest('button[data-id]');
            const taskId = Number(button.dataset.id);
            
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            renderTasks(updatedTasks);
        }
    });
    
    // Initial load
    loadTasks();
});