import { TodoCollection } from "./todoCollection.js";
import { TodoItem } from "./todoItem.js";
import inquirer from "inquirer";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "get shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new TodoCollection("Adam", todos);
let showCompleted = true;

function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo List 
      (${collection.getItemCounts().incomplete} items to do)`
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

enum Commands {
  Add = "Add New To do",
  Complete = "Mark complete task",
  Purge = "Delete done task",
  Toggle = "Show/Hide completed",
  Quit = "Quit",
}

function promptAdd(): void {
  console.clear;
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Enter new task:",
    })
    .then((answers) => {
      if (answers["add"] !== "") {
        collection.addTodo(answers["add"]);
      }
      promptUser();
    });
}

function prompComplete(): void {
  console.clear();
  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Mark done the tasks",
      choices: collection.getTodoItems(showCompleted).map((item) => ({
        name: item.task,
        value: item.task,
        checked: item.complete,
      })),
    })
    .then((answers) => {
      let completedTasks = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined
          )
        );
      promptUser();
    });
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;

        case Commands.Complete:
          if (collection.getItemCounts().incomplete > 0) {
            prompComplete();
          } else {
            promptUser();
          }
          break;

        case Commands.Purge:
          collection.removeComplete();
          promptUser();
          break;
      }
    });
}
promptUser();
