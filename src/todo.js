const todos = document.querySelector(".js-todo-list");
const todoForm = document.querySelector(".js-todo-form");
const todoInput = document.querySelector(".js-input-todo");
const TODOS_LS = "todos";
let taskId = new Date().getTime();
let todoArray = [];

function makeNode(id, text) {
  const arg = {
    id: id,
    text: text
  };
  return arg;
}

function updateTodos(event) {
  event.preventDefault();

  if (todoInput.value !== "") {
    const tempId = taskId++;
    makeTodoArray(tempId, todoInput.value);
    makeList(tempId, todoInput.value);
    localStorage.setItem(TODOS_LS, JSON.stringify(todoArray));
  }
  todoInput.value = "";
}

function makeTodoArray(id, text) {
  const task = makeNode(id, text);
  todoArray.push(task);
}

function deleteTask(event) {
  event.preventDefault();
  const deleteNode = event.target.parentNode;
  //console.log(deleteNode.id);
  todos.removeChild(deleteNode);
  let tempArray = todoArray.filter(function(arr) {
    //console.log(arr.id, deleteNode.id);
    return arr.id != parseInt(deleteNode.id);
  });
  todoArray = tempArray;
  localStorage.setItem(TODOS_LS, JSON.stringify(todoArray));
}

function makeList(id, text) {
  const li = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerText = "❌";
  delButton.classList.add("delete-button");

  delButton.addEventListener("click", deleteTask);

  li.id = id;
  li.innerHTML = text;
  li.appendChild(delButton);
  todos.appendChild(li);
}

function loadTodoList() {
  const loadArray = JSON.parse(localStorage.getItem(TODOS_LS));
  todoArray = loadArray;
  loadArray.forEach(function(todosArr) {
    makeList(todosArr.id, todosArr.text);
  });
}

function init() {
  //localStorage.removeItem(TODOS_LS);
  const userTodos = localStorage.getItem(TODOS_LS);

  console.log(userTodos);

  if (userTodos !== null) {
    loadTodoList();
  }

  todoForm.addEventListener("submit", updateTodos);
}

init();
