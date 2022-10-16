const inputTask = document.querySelector(".input_task");
const addButton = document.querySelector(".add__button");
const listOfTasks = document.querySelector(".todo__list");
const todo = document.querySelector(".wrapper");
const dayOfTheWeek = document.querySelector(".day");
const fullDate = document.querySelector(".date");

let todoList = [];

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayItemsOfList();
}

function getDayOfTheWeek() {
  let now = new Date();
  let date =
    now.getDate() + " / " + (now.getMonth() + 1) + " / " + now.getFullYear();
  let options = { weekday: "long" };
  dayOfTheWeek.innerHTML = new Intl.DateTimeFormat("en-US", options).format(
    now
  );
  fullDate.innerHTML = date;
}
getDayOfTheWeek();

function displayItemsOfList() {
  resetInput();
  let task = "";
  todoList.forEach(
    (item, i) =>
      (task += `
        <li class="todo__list__item" data-value=${item.todo}>
          <div>
            <span> ${i + 1}. </span>
            <label class="item" for="item_${i}">${item.todo}</label>
          </div>
          <div class="menu_for_item">
            <input type="checkbox" id="item_${i}" data-check="checkbox" class="task_check" ${
        item.checked ? "checked" : ""
      }/>
            <img src="${
              item.imageStar
            }" width="15" height="15" alt="" data-important="${item.todo}"/>
            <img src="${
              item.imageBin
            }" width="15" height="15" alt="" data-delete="${item.todo}"/>
          </div>
        </li>`)
  );
  listOfTasks.innerHTML = task;
}

function resetInput() {
  inputTask.value = "";
}

todo.addEventListener("click", ({ target }) => {
  if (target.dataset.button === "addTask") {
    let newTask = {
      todo: inputTask.value,
      checked: false,
      important: false,
      imageStar: "assets/image/star.png",
      imageBin: "assets/image/bin.png",
    };
    todoList.push(newTask);
    displayItemsOfList();
  }

  if (target.dataset.check === "checkbox") {
    let forLabel = listOfTasks.querySelector(
      "[for=" + target.getAttribute("id") + "]"
    ).innerHTML;
    todoList.forEach((item) => {
      if (item.todo === forLabel) {
        item.checked = !item.checked;
      }
    });
  }

  todoList.forEach((item) => {
    if (item.todo === target.dataset.important) {
      item.important = !item.important;
      let star = listOfTasks.querySelector(
        "[data-important=" + item.todo + "]"
      );
      star.src = "assets/image/starActive.png";
    }

    if (item.todo === target.dataset.delete) {
      let index = todoList.findIndex(
        (item) => item.todo === target.dataset.delete
      );
      todoList.splice(index, 1);
      displayItemsOfList();
    }
  });

  localStorage.setItem("todo", JSON.stringify(todoList));
});
