// Haetaan tarvittavat elementit
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const error = document.getElementById("error-message");
const counter = document.getElementById("counter");

// Tehtävälista tallennetaan vain muistiin
let todos = [];

// Päivittää tehtävien määrän
function updateCounter() {
  const remaining = todos.filter(todo => !todo.done).length;
  counter.textContent = `Tehtäviä jäljellä: ${remaining}`;
}

// Piirtää tehtävät listalle
function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";
    li.textContent = todo.text;

    const actions = document.createElement("div");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";
    doneBtn.onclick = () => {
      todos[index].done = !todos[index].done;
      renderTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      renderTodos();
    };

    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    list.appendChild(li);
  });
  updateCounter();
}

// Lomakkeen lähetys
form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();

  if (text.length < 3) {
    input.classList.add("error");
    error.textContent = "Tehtävän pitää olla vähintään 3 merkkiä.";
    return;
  }

  input.classList.remove("error");
  error.textContent = "";

  todos.push({ text, done: false });
  renderTodos();
  input.value = "";
});

renderTodos();
