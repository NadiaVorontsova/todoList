const inputTask = document.querySelector(".input_task");
const addButton = document.querySelector(".add__button");
const listOfTasks = document.querySelector(".todo__list");

let todoList = [];

addButton.addEventListener("click", () => {
  let newTask = {
    todo: inputTask.value,
    checked: false,
    important: false,
  };

  todoList.push(newTask);

  displayItemsOfList();
});

const displayItemsOfList = () => {
  let task = "";
  todoList.forEach(
    (item, i) =>
      (task += `
        <li class="todo__list__item">
            <label class="item" for="item_${i}">&#9998; ${item.todo}</label>
            <div class="menu_for_item">
                <input type="checkbox" id="item_${i}" class="task_check" />
                <img src="assets/image/star.png" width="15" height="15" alt="star" />
                <img src="assets/image/bin.png" width="15" height="15" alt="bin"/>
            </div>
        </li>`)
  );
  listOfTasks.innerHTML = task;
};

// listOfTasks.addEventListener("click", ({ target }) => {
//   let index = -1;
//   if (target.alt === "bin") {
//     todoList.forEach((item) => {
//       console.log(item);
//       index = todoList.indexOf(item);
//       console.log(index);
//     });
//     //todoList.splice(index, 1);
//   }
//   displayItemsOfList();
// });
