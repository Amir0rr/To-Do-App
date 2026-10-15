const inputText = document.querySelector(".task-text");
const formEL = document.querySelector("#form");
const taskList = document.querySelector(".list");
let tasks = [
  { id: 1, text: "do homework", done: true },
  { id: 2, text: "workout", done: false },
];
const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const newList = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    newList.textContent = task.text;
    taskList.appendChild(newList);
    newList.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });
  });
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
