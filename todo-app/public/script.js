const API_URL = "/api/todos";
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");

// Fetch and display todos
async function loadTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.className = "todo";
    div.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">${todo.title}</span>
      <div>
        <button onclick="toggleCompleted(${todo.id})">${todo.completed ? "khatam" : "Complete"}</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;
    todoList.appendChild(div);
  });
}

// Add new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = todoInput.value.trim();
  if (!title) return;
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  todoInput.value = "";
  loadTodos();
});

// Toggle completed
window.toggleCompleted = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "PUT" });
  loadTodos();
};

// Delete todo
window.deleteTodo = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTodos();
};

// Initial load
loadTodos();
ps;
