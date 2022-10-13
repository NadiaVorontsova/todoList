const inputTask = document.querySelector(".input_task");
const addButton = document.querySelector(".add__button");
const listOfTasks = document.querySelector(".todo__list");
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
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  let options = { weekday: "long" };
  dayOfTheWeek.innerHTML = new Intl.DateTimeFormat("en-US", options).format(
    now
  );
  fullDate.innerHTML = date;
}
getDayOfTheWeek();

addButton.addEventListener("click", () => {
  let newTask = {
    todo: inputTask.value,
    checked: false,
    important: false,
  };
  todoList.push(newTask);

  displayItemsOfList();
  localStorage.setItem("todo", JSON.stringify(todoList));
});
//localStorage.clear();
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
            <input type="checkbox" id="item_${i}" class="task_check" ${
        item.checked ? "checked" : ""
      }/>
            <img src="assets/image/star.png" width="15" height="15" alt="star" data-important=${
              item.todo
            } />
            <img src="assets/image/bin.png" width="15" height="15" alt="bin" data-delete=${
              item.todo
            } />
          </div>
        </li>`)
  );
  listOfTasks.innerHTML = task;
}

function resetInput() {
  inputTask.value = "";
}

listOfTasks.addEventListener("change", ({ target }) => {
  let forLabel = listOfTasks.querySelector(
    "[for=" + target.getAttribute("id") + "]"
  ).innerHTML;
  todoList.forEach((item) => {
    if (item.todo === forLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

listOfTasks.addEventListener("click", ({ target }) => {
  todoList.forEach((item) => {
    ///////////////////ПАМАГИ//////////////////////
    if (item.todo === target.dataset.delete) {
      let index = todoList.indexOf(target.dataset.delete);
      console.log(item.todo, target.dataset.delete, index);
      //todoList.splice(index, 1);
    }
    //////////////////////////////////////////////////////

    // if (item.todo === target.dataset.important) {
    //   item.important = !item.important;
    //   let data = listOfTasks.querySelector("[data-value=" + item.todo + "]");
    //   data.classList.toggle("important_task");
    //   localStorage.setItem("todo", JSON.stringify(todoList));
    // }
  });
});
