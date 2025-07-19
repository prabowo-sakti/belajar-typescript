import { TodoCollection } from "./todoCollection";
import { TodoItem } from "./todoItem";

let todos = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "get shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new TodoCollection("Adam", todos);

console.clear();
console.log(`${collection.userName}'s Todo List`);

let newId = collection.addTodo("Go for run");
let todoItem = collection.getTodoById(newId);
todoItem.printDetails();
// collection.addTodo(todoItem)
