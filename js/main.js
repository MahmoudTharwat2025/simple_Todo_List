const add__task = document.querySelector(".add__task");
const taskContainer = document.querySelector(".taskContainer");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");
const taskInput = document.getElementById("taskName");
const clear = document.querySelector(".clear");
const save = document.querySelector(".save");
const update = document.querySelector(".update");
const date = new Date();
const getDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
let taskCont = [];
const month = [
  "January",
  "Februay",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November ",
  "December ",
];

let getStorage = localStorage.getItem("todoList");
if (getStorage) {
  taskCont = JSON.parse(getStorage);
  displayTaskFromTable();
}
/* ---------------------- Main ADD REMOVE Function ---------------------- */
const addRemove = (top, remove) => {
  taskContainer.style.top = top;
  overlay.classList.toggle(remove);
};
/* ------------------------------ Show Tap ------------------------------ */
const showTask = () => {
  addRemove("10%", "d-none");
  taskInput.focus();
};
add__task.addEventListener("click", showTask);
/* -------------------------------- close Tap ------------------------------- */
const closeTask = () => {
  addRemove("-100%", "d-none");
  taskInput.value = "";
  save.classList.remove("d-none");
  update.classList.add("d-none");
};
close.addEventListener("click", closeTask);
overlay.addEventListener("click", closeTask);
/* ----------------------------- Create Task ---------------------------- */
const createTask = () => {
  if (checkProductName()) {
    const taskValue = {
      TInput: taskInput.value,
    };
    taskCont.push(taskValue);
    localStorage.setItem("todoList", JSON.stringify(taskCont));
    displayTaskFromTable();
    clearInput();
    addRemove("-100%", "d-none");
    taskInput.style.border = "2px solid transparent";
    taskInput.placeholder = "";
  } else {
    taskInput.style.border = "2px solid red";
    taskInput.placeholder = "please Type The Data";
  }
};

save.addEventListener("click", createTask);
/* ---------------------- Display Value From The Table ---------------------- */
function displayTaskFromTable() {
  let task = "";
  for (let i = 0; i < taskCont.length; i++) {
    task += `
    <tr>
        <td>${i + 1}</td>
        <td class="spacialTd" data-id=${i}>${taskCont[i].TInput}</td>
        <td class="d-none inBtn"></td>
        <td>${getDate}/${month[date.getMonth()].slice(
      0,
      3
    )}/${date.getFullYear()}</td>
        <td>
          <button onclick='updateSet(${i})' class="btn btn-outline-info edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td>
          <button onclick='removeItem(${i})' class="btn btn-outline-secondary remove">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
    </tr>
    `;
  }
  document.querySelector(".tBody").innerHTML = task;
}
// /* -------------------------------- DELETE ------------------------------- */
function removeItem(index) {
  taskCont.splice(index, 1);
  displayTaskFromTable();
  localStorage.setItem("todoList", JSON.stringify(taskCont));
}
/* -------------------------------- UPDATE ------------------------------- */
let currentIndexUpdate = 0;

function updateSet(setUpdate) {
  currentIndexUpdate = setUpdate;
  showTask();
  taskInput.value = taskCont[setUpdate].TInput;
  save.classList.add("d-none");
  update.classList.remove("d-none");
}

function updateTask() {
  taskCont[currentIndexUpdate].TInput = taskInput.value;
  localStorage.setItem("todoList", JSON.stringify(taskCont));
  displayTaskFromTable();
  closeTask();
  save.classList.remove("d-none");
  update.classList.add("d-none");
  taskInput.value = "";
}
update.addEventListener("click", updateTask);

/* ----------------------------- clear Value ---------------------------- */
function clearInput() {
  taskInput.value = "";
  taskInput.focus();
}
clear.addEventListener("click", clearInput);

function checkProductName() {
  if (taskInput.value) {
    return true;
  } else {
    return false;
  }
}
