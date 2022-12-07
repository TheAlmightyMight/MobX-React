import { action, makeObservable, observable, computed, autorun } from "mobx";
import { v4 } from "uuid";

import { SortOptions, TodoStatuses, TodoImportance } from "../types/TodoTypes";
import { TodoInterface } from "../types/TodoTypes";

class Todo implements TodoInterface {
  id: string = v4();
  title: string;
  info: string;
  creationDate: Date = new Date();
  edited: boolean = false;
  editDate: string = "";
  history: Array<any> = [];
  status: TodoStatuses = TodoStatuses.ADDED;
  importance: TodoImportance;

  constructor(title: string, info?: string, importance?: TodoImportance) {
    this.title = title;
    this.info = info || "";
    this.importance = importance || TodoImportance.IMPORTANT;
  }
}

class TodoStoreClass {
  todos: Array<Todo> = [];
  loading: boolean = false;
  error: boolean = false;
  static instance: InstanceType<typeof TodoStoreClass>;

  constructor() {
    if (TodoStoreClass.instance) {
      return TodoStoreClass.instance;
    }

    makeObservable(this, {
      todos: observable,
      loading: observable,
      error: observable,
      addTodo: action,
      todoAmount: computed,
    });

    TodoStoreClass.instance = this;

    const arr = JSON.parse(localStorage.getItem("todos")!);

    if (arr) {
      TodoStoreClass.instance.todos =
        arr.length === 0
          ? []
          : arr.map((el: Todo) => {
              return {
                ...el,
                creationDate: new Date(el.creationDate),
              };
            });
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
      TodoStoreClass.instance.todos = [];
    }
  }

  static {
    console.log("Store has been initialized");
  }

  addTodo(title: string, info: string, importance: number): void {
    const todo = new Todo(title, info, importance);
    this.todos.push(todo);
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter(el => el.id !== id);
  }

  changeTodoStatus(id: string, status: TodoStatuses): boolean {
    this.todos = this.todos.map(el => {
      if (el.id === id) {
        return { ...el, status: status };
      }
      return el;
    });

    return false;
  }

  changeTodoImportance(id: string, importance: TodoImportance): boolean {
    this.todos = this.todos.map(el => {
      if (el.id === id) {
        return { ...el, importance: importance };
      }
      return el;
    });

    return false;
  }

  sortByDate(option: SortOptions): void | Array<Todo> {
    switch (option) {
      case SortOptions.ASCENDING: {
        this.todos = this.todos.sort(
          (a, b) => a.creationDate.getTime() - b.creationDate.getTime(),
        );
        break;
      }
      case SortOptions.DESCENDING: {
        this.todos = this.todos.sort(
          (a, b) => b.creationDate.getTime() - a.creationDate.getTime(),
        );
        break;
      }
      default:
        return this.todos;
    }
  }

  sortByTodoImportance(option: SortOptions): void | Array<Todo> {
    switch (option) {
      case SortOptions.ASCENDING: {
        this.todos = this.todos.sort((a, b) => a.importance - b.importance);
        break;
      }
      case SortOptions.DESCENDING: {
        this.todos = this.todos.sort((a, b) => b.importance - a.importance);
        break;
      }
      default:
        return this.todos;
    }
  }

  filterByStatus(status: TodoStatuses): Array<Todo> {
    if (status === TodoStatuses.ADDED) {
      return this.todos.filter((el, i) => {
        return el.status === TodoStatuses.ADDED;
      });
    } else if (status === TodoStatuses.STARTED) {
      return this.todos.filter((el, i) => {
        return el.status === TodoStatuses.STARTED;
      });
    } else if (status === TodoStatuses.FINISHED) {
      return this.todos.filter((el, i) => {
        return el.status === TodoStatuses.FINISHED;
      });
    } else if (status === TodoStatuses.POSTPONED) {
      return this.todos.filter((el, i) => {
        return el.status === TodoStatuses.POSTPONED;
      });
    } else {
      throw new Error("Could not filter: incorrect status: " + status);
    }
  }

  filterByName(title: string): Array<Todo> {
    return this.todos.filter(el => new RegExp(`${title}`).test(el.title));
  }

  get todoAmount(): number {
    return this.todos.length;
  }

  get todosAll(): Array<Todo> {
    return this.todos;
  }
}

const TodoStore = new TodoStoreClass();

const disposer = autorun(() => {
  localStorage.setItem("todos", JSON.stringify(TodoStore.todos));
});

export default TodoStore;
