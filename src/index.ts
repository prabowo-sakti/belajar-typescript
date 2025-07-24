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

function displayTodoList(): void {}

console.log(
  `${collection.userName}'s Todo List` +
    `(${collection.getItemCounts().incomplete} items to do)`
);

collection.removeComplete();
collection.getTodoItems(true).forEach((item) => item.printDetails());
