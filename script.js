const inputText = document.querySelector(".task-text");
const formEL = document.querySelector("#form");
const taskList = document.querySelector(".list");
const tasks = [
  { id: 1, text: "do homework", done: true },
  { id: 2, text: "workout", done: false },
];
const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const newList = document.createElement("li");
    newList.textContent = task.text;
    taskList.appendChild(newList);
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
