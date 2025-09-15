// sticky-todo script: event delegation, filters, delete-on-Delete-key, dark mode, responsive-friendly
document.addEventListener("DOMContentLoaded", init);

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
const darkToggle = document.getElementById("darkToggle");

let tasks = []; // in-memory cache
let currentFilter = "all"; // all | active | completed

function init() {
  // wire up
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", onInputKeyDown);
  taskList.addEventListener("click", handleTaskClick);
  taskList.addEventListener("keydown", onListKeyDown); // for keyboard delete on focused li
  clearAllBtn.addEventListener("click", clearAllTasks);
  filterBtns.forEach(b => b.addEventListener("click", onFilterClick));
  darkToggle.addEventListener("click", toggleDark);

  // load prefs & tasks
  loadTheme();
  loadTasks();
  render();
}

/* ---------- storage ---------- */
function getStoredTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}
function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------- create / render ---------- */
function createTaskObject(text) {
  return { id: Date.now().toString() + Math.floor(Math.random()*1000), text, completed: false, rot: randomRotation() };
}

function randomRotation() {
  // small random rotation between -6 and +6 degrees
  return (Math.random() * 12 - 6).toFixed(2) + "deg";
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  const t = createTaskObject(text);
  tasks.push(t);
  storeTasks();
  appendTaskToDOM(t);
  taskInput.value = "";
  taskInput.focus();
  applyFilterClass(); // ensure visibility for current filter
}

function appendTaskToDOM(task) {
  const li = document.createElement("li");
  li.tabIndex = 0; // make focusable
  li.dataset.id = task.id;
  li.style.setProperty("--rot", task.rot);

  if (task.completed) li.classList.add("completed");

  const p = document.createElement("div");
  p.className = "note-text";
  p.textContent = task.text;
  li.appendChild(p);

  const row = document.createElement("div");
  row.className = "note-row";

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `<small style="color:var(--muted);font-size:0.78rem">${task.completed ? "Done" : "Todo"}</small>`;
  row.appendChild(meta);

  const del = document.createElement("button");
  del.className = "deleteBtn";
  del.type = "button";
  del.title = "Delete task";
  del.textContent = "Delete";
  row.appendChild(del);

  li.appendChild(row);
  taskList.appendChild(li);
}

/* Render entire list (used on load and filter changes) */
function render() {
  // load data
  tasks = getStoredTasks();
  // clear DOM
  taskList.innerHTML = "";
  // append each
  tasks.forEach(appendTaskToDOM);
  applyFilterClass();
}

/* ---------- events ---------- */
function handleTaskClick(e) {
  const li = e.target.closest("li");
  if (!li) return;
  const id = li.dataset.id;

  // Clicked delete button?
  if (e.target.classList.contains("deleteBtn")) {
    // confirm and delete
    if (!confirm("Delete this task?")) return;
    removeTask(id);
    li.remove();
    return;
  }

  // Otherwise toggle completed when clicking the note (not delete)
  toggleTask(id, li);
}

function onInputKeyDown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
}

function onListKeyDown(e) {
  // when a list item is focused and user presses Delete, remove it
  const li = document.activeElement;
  if (!li || li.tagName !== "LI") return;

  if (e.key === "Delete") {
    e.preventDefault();
    const id = li.dataset.id;
    if (!id) return;
    if (confirm("Delete selected task?")) {
      removeTask(id);
      li.remove();
    }
  }

  // Optional: space/Enter toggle completion while focused
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    toggleTask(li.dataset.id, li);
  }
}

function onFilterClick(e) {
  filterBtns.forEach(b => b.classList.remove("active"));
  e.currentTarget.classList.add("active");
  currentFilter = e.currentTarget.dataset.filter;
  applyFilterClass();
}

/* ---------- task ops ---------- */
function findTaskIndex(id) {
  return tasks.findIndex(t => t.id === id);
}

function toggleTask(id, liElement) {
  const idx = findTaskIndex(id);
  if (idx === -1) return;
  tasks[idx].completed = !tasks[idx].completed;
  storeTasks();
  // update DOM class and meta label text
  if (liElement) {
    liElement.classList.toggle("completed", tasks[idx].completed);
    const metaSmall = liElement.querySelector(".meta small");
    if (metaSmall) metaSmall.textContent = tasks[idx].completed ? "Done" : "Todo";
  } else {
    render();
  }
  applyFilterClass();
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  storeTasks();
}

/* ---------- filters ---------- */
function applyFilterClass() {
  const lis = Array.from(taskList.children);
  lis.forEach(li => {
    const id = li.dataset.id;
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    li.style.display = ""; // reset
    if (currentFilter === "active" && t.completed) li.style.display = "none";
    if (currentFilter === "completed" && !t.completed) li.style.display = "none";
  });
}

/* ---------- clear all ---------- */
function clearAllTasks() {
  if (!taskList.firstChild) return;
  if (!confirm("Are you sure you want to delete ALL tasks?")) return;
  tasks = [];
  storeTasks();
  taskList.innerHTML = "";
}

/* ---------- theme (dark mode) ---------- */
function loadTheme() {
  const saved = localStorage.getItem("sticky-todo-theme");
  if (saved === "dark") enableDark(true);
  else enableDark(false);
}
function enableDark(on) {
  if (on) {
    document.documentElement.classList.add("dark");
    darkToggle.setAttribute("aria-pressed","true");
    localStorage.setItem("sticky-todo-theme","dark");
  } else {
    document.documentElement.classList.remove("dark");
    darkToggle.setAttribute("aria-pressed","false");
    localStorage.setItem("sticky-todo-theme","light");
  }
}
function toggleDark() {
  const isDark = document.documentElement.classList.toggle("dark");
  darkToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  localStorage.setItem("sticky-todo-theme", isDark ? "dark" : "light");
}

/* ---------- helpers ---------- */
/* initial load wrapper */
function loadTasks() {
  tasks = getStoredTasks();
}
