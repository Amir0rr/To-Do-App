const inputText = document.querySelector(".task-text");
const formEL = document.querySelector("#form");
const taskList = document.querySelector(".list");
let tasks;

const saveTasks = () => {
  const savedTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", savedTasks);
};

const loadTasks = () => {
  const saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  } else {
    tasks = [];
  }
};

loadTasks();

const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const textSpan = document.createElement("span");
    const newList = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const checkboxTask = document.createElement("input");
    checkboxTask.type = "checkbox";
    checkboxTask.checked = task.done;
    deleteBtn.textContent = "Delete";
    newList.appendChild(checkboxTask);
    textSpan.textContent = task.text;
    newList.appendChild(textSpan);
    taskList.appendChild(newList);
    newList.appendChild(deleteBtn);

    if (checkboxTask.checked === true) {
      newList.classList.add("done");
    }

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });

    checkboxTask.addEventListener("change", () => {
      task.done = !task.done;
      renderTasks();
    });
  });
  saveTasks();
};

renderTasks();

const submitHandler = (event) => {
  event.preventDefault();
  const taskText = inputText.value.trim();
  if (taskText === "") {
    return;
  }
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  tasks.push(newTask);
  inputText.value = "";
  renderTasks();
};

formEL.addEventListener("submit", submitHandler);
