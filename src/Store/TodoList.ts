import { action, makeObservable, observable } from "mobx";
//@ts-ignore
import { v4 } from "uuid";

enum TodoStatuses {
  ADDED = "ADDED",
  STARTED = "STARTED",
  POSTPONED = "POSTPONED",
  FINISHED = "FINISHED",
}

interface Todo {
  id: string;
  title: string;
  info: string;
  date: string | number;
  status: TodoStatuses;
}

class Todo implements Todo {
  constructor(title: string, info?: string) {
    this.title = title;
    this.id = v4();
    this.info = info || "";
    this.date = new Date().toISOString();
    this.status = TodoStatuses.ADDED;
  }
}

class TodoStoreClass {
  todos: Array<Todo> = [];
  loading: boolean = false;
  error: boolean = false;

  constructor() {
    makeObservable(this, {
      todos: observable,
      loading: observable,
      error: observable,
      addTodo: action,
    });
  }

  public addTodo(title: string, info: string): void {
    const todo = new Todo(title, info);
    this.todos.push(todo);
  }
}

const TodoStore = new TodoStoreClass();
export default TodoStore;
