const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

document.body.classList.toggle("dark", darkMode);
themeToggle.textContent = darkMode ? "☀️" : "🌙";

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const title = document.createElement("span");
    title.textContent = task.text;

    const meta = document.createElement("span");
    meta.classList.add("task-meta");
    meta.textContent = `${task.category} • ${task.dueDate || "No due date"}`;

    taskInfo.appendChild(title);
    taskInfo.appendChild(meta);

    title.addEventListener("dblclick", () => editTask(index));

    li.addEventListener("click", () => toggleComplete(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(taskInfo);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const category = categorySelect.value;

  if (!text) return;

  tasks.push({ text, completed: false, dueDate, category });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dueDateInput.value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
  document.body.classList.toggle("dark", darkMode);
  themeToggle.textContent = darkMode ? "☀️" : "🌙";
});

renderTasks();
