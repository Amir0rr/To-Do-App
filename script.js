const inputText = document.querySelector(".task-text");
const formEL = document.querySelector("#form");
const taskList = document.querySelector(".list");
const counter = document.querySelector(".counter");
let tasks;
let currentFilter = "all";
let visibleTasks;
const filterBtns = document.querySelectorAll(".filter-btn");

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

const emptyTextFunction = (text) => {
  const emptyText = document.createElement("li");
  emptyText.textContent = text;
  emptyText.classList.add("no-task-text");
  taskList.appendChild(emptyText);
};

loadTasks();

const renderTasks = () => {
  taskList.innerHTML = "";
  if (currentFilter === "all") {
    visibleTasks = tasks;
  } else if (currentFilter === "active") {
    visibleTasks = tasks.filter((active) => active.done === false);
  } else {
    visibleTasks = tasks.filter((completed) => completed.done === true);
  }
  visibleTasks.forEach((task) => {
    const textSpan = document.createElement("span");
    const newList = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const checkboxTask = document.createElement("input");
    const editBtn = document.createElement("button");
    checkboxTask.type = "checkbox";
    checkboxTask.checked = task.done;
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    newList.appendChild(checkboxTask);
    textSpan.textContent = task.text;
    newList.appendChild(textSpan);
    taskList.appendChild(newList);
    newList.appendChild(editBtn);
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

    editBtn.addEventListener("click", () => {
      let isFinished = false;
      const editInput = document.createElement("input");
      editInput.value = task.text;
      editInput.classList.add("edit-input");
      textSpan.replaceWith(editInput);
      editInput.focus();
      editInput.select();

      editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          isFinished = true;
          let newText = editInput.value.trim();
          if (newText === "") {
            renderTasks();
          } else {
            task.text = newText;
            renderTasks();
          }
        }
        if (event.key === "Escape") {
          isFinished = true;
          renderTasks();
        }
      });
      editInput.addEventListener("blur", () => {
        if (isFinished === true) {
          return;
        } else {
          renderTasks();
        }
      });
    });
  });

  if (tasks.length === 0) {
    emptyTextFunction("No tasks yet");
  } else if (visibleTasks.length === 0) {
    if (currentFilter === "active") {
      emptyTextFunction("No active tasks");
    } else if (currentFilter === "completed") {
      emptyTextFunction("No completed tasks");
    }
  }

  const taskLeft = tasks.filter((left) => left.done === false);
  let taskLeftNumber = taskLeft.length;

  if (tasks.length === 0) {
    counter.textContent = "";
  } else if (taskLeftNumber === 1) {
    counter.textContent = "1 Task left";
  } else if (taskLeftNumber > 1) {
    counter.textContent = taskLeftNumber + " Tasks left";
  } else {
    counter.textContent = "All done!";
  }

  saveTasks();
};

renderTasks();

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((A) => {
      A.classList.remove("active");
    });
    btn.classList.add("active");
    renderTasks();
  });
});

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
