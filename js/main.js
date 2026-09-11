// State & Data Structure
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Element References
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const searchInput = document.getElementById('search-input');
const taskList = document.getElementById('task-list');

// Render Function
function renderTasks(filterText = '') {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(filterText.toLowerCase())
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'মুছে ফেলুন';
    deleteBtn.style.backgroundColor = '#ef4444';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add New Task (Form Handling)
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text: text });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
  renderTasks();
});

// Search/Filter Functionality
searchInput.addEventListener('input', (e) => {
  renderTasks(e.target.value);
});

// Delete Functionality
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Initial Load
renderTasks();