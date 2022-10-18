const inputTask = document.querySelector(".input_task");
const input = document.querySelector(".input_task");
const listOfTasks = document.querySelector(".todo__list");
const todo = document.querySelector(".wrapper");
const dayOfTheWeek = document.querySelector(".day");
const fullDate = document.querySelector(".date");
const errorMessage = document.querySelector(".error_message");

const starSrc = "assets/image/star.png";
const newStarSrc = "assets/image/starActive.png";

let todoList = [];

const modalMenu = document.querySelector(".modal_menu");
const modalButton = document.querySelector(".modal_button");

modalButton.addEventListener("click", hideMenu);

function hideMenu() {
  modalMenu.classList.add("modal_menu_invisible");
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

let cookies = () => {
  var cookie = getCookie("hide-cookie");

  if (cookie == "" || cookie == null) {
    setCookie("hide-cookie", "true", 30);
  } else {
    hideMenu();
  }
};

cookies();

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
  fullDate.innerHTML = "&#128198; " + date;
}
getDayOfTheWeek();

function displayItemsOfList() {
  inputTask.value = "";
  let task = "";
  todoList.forEach(
    (item, i) =>
      (task += `
        <li class="todo__list__item">
          <div>
            <span> ${i + 1}. </span>
            <label class="item" for="item_${i}">${item.todo}</label>
          </div>
          <div class="menu_for_item">
            <input type="checkbox" id="item_${i}" data-check="checkbox" class="task_check" ${
        item.checked ? "checked" : ""
      }/>
            <button class="star_bin_button">
              <img src="${
                item.imageStar
              }" width="15" height="15" alt="" data-important="${item.todo}"/>
            </button>
            <button class="star_bin_button">
              <img src="${
                item.imageBin
              }" width="15" height="15" alt="" data-delete="${item.todo}"/>
            </button>
          </div>
        </li>`)
  );
  listOfTasks.innerHTML = task;
}

function addTask() {
  let newTask = {
    todo: inputTask.value,
    checked: false,
    important: false,
    imageStar: "assets/image/star.png",
    imageBin: "assets/image/bin.png",
  };
  if (inputTask.value != "") {
    todoList.push(newTask);
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "You need to input task for the day!";
  }
  displayItemsOfList();
}

input.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    addTask();
  }
});

todo.addEventListener("click", ({ target }) => {
  if (target.dataset.button === "addTask") {
    addTask();
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
      todoList.forEach((item) => {
        if (item.important) {
          item.imageStar = newStarSrc;
        } else {
          item.imageStar = starSrc;
        }
      });

      displayItemsOfList();
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
