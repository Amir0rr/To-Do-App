const taskList = document.querySelector(".list");
const tasks = [
  { id: 1, text: "do homework", done: true },
  { id: 2, text: "workout", done: false },
];

const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const newList = document.createElement("li");
    newList.textContent = task.text
    taskList.appendChild(newList)
  });
};

renderTasks();
