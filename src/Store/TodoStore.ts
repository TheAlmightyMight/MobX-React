import { makeAutoObservable, autorun, reaction } from "mobx";
import { v4 } from "uuid";

import { SortOptions, TodoStatuses, TodoImportance } from "../types/TodoTypes";
import {
  TodoInterface,
  TodoHistoryInterface,
  TodoChange,
} from "../types/TodoTypes";

class Todo implements TodoInterface {
  id: string = v4();
  title: string;
  info: string;
  creationDate: Date = new Date();
  edited: boolean = false;
  editDate: string = "";
  history: Array<TodoHistoryInterface> = [];
  status: TodoStatuses = TodoStatuses.ADDED;
  importance: TodoImportance;

  constructor(title: string, info?: string, importance?: TodoImportance) {
    this.title = title;
    this.info = info || "";
    this.importance = importance || TodoImportance.IMPORTANT;
  }
}

export class TodoHistoryItem implements TodoHistoryInterface {
  id: string = v4();
  date: string = new Date().toLocaleString();
  changes: Array<TodoChange>;

  constructor(changes: Array<TodoChange>) {
    this.changes = changes;
  }
}

class TodoStoreClass {
  todos: Array<Todo> = [];

  loading: boolean = false;
  error: boolean = false;

  mutableTodos: Array<Todo> = [];
  filters: {} = {};
  // sorts: string[] = [];

  static instance: InstanceType<typeof TodoStoreClass>;

  constructor() {
    if (TodoStoreClass.instance) {
      return TodoStoreClass.instance;
    }

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

    this.mutableTodos = [...TodoStoreClass.instance.todos];
    makeAutoObservable(this);
  }

  static {
    console.log("Store has been initialized");
  }

  addTodo(title: string, info: string, importance: number): void {
    const todo = new Todo(title, info, importance);
    this.todos = [...this.todos, todo];
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter(el => el.id !== id);
  }

  changeTodoStatus(id: string, status: TodoStatuses): void {
    this.todos = this.todos.map(el => {
      if (el.id === id) {
        return { ...el, status: status };
      }
      return el;
    });
  }

  changeTodoImportance(id: string, importance: TodoImportance): void {
    this.todos = this.todos.map(el => {
      if (el.id === id) {
        return { ...el, importance: importance };
      }
      return el;
    });
  }

  changeTodoTitle(id: string, title: string): void {
    this.todos = this.todos.map(el => {
      if (el.id === id) {
        return { ...el, title: title };
      }
      return el;
    });
  }

  changeTodoInfo(id: string, info: string): void {
    this.todos = this.todos.map(el => {
      if (el.id === id) {
        return { ...el, info: info };
      }
      return el;
    });
  }

  sortByDate(option: SortOptions): void | Array<Todo> {
    switch (option) {
      case SortOptions.ASCENDING: {
        this.mutableTodos.sort(
          (a, b) => a.creationDate.getTime() - b.creationDate.getTime(),
        );
        break;
      }
      case SortOptions.DESCENDING: {
        this.mutableTodos.sort(
          (a, b) => b.creationDate.getTime() - a.creationDate.getTime(),
        );
        break;
      }
      default:
        return this.mutableTodos;
    }
  }

  sortByTodoImportance(option: SortOptions): void | Array<Todo> {
    switch (option) {
      case SortOptions.ASCENDING: {
        this.mutableTodos.sort((a, b) => a.importance - b.importance);
        break;
      }
      case SortOptions.DESCENDING: {
        this.mutableTodos.sort((a, b) => b.importance - a.importance);
        break;
      }
      default:
        return this.mutableTodos;
    }
  }

  undoSort(): void {
    this.mutableTodos = this.todos;
  }

  addToItemHistory(id: string, change: TodoHistoryInterface): void {
    const item = this.todos.find(el => el.id === id) as TodoInterface;
    item.history.push(change);
  }

  get todoAmount(): number {
    return this.todos.length;
  }

  get todosAll(): Array<Todo> {
    return this.mutableTodos;
  }
}

const TodoStore = new TodoStoreClass();

autorun(() => {
  localStorage.setItem("todos", JSON.stringify(TodoStore.todos));
});

reaction(
  () => TodoStore.todos,
  () => {
    TodoStore.mutableTodos = TodoStore.todos;
  },
);

reaction(
  () => TodoStore.filters,
  () => {
    TodoStore.mutableTodos = TodoStore.todos;
    // const sorts = Object.keys(obj); maybe not
    for (let key in TodoStore.filters) {
      TodoStore.mutableTodos = TodoStore.mutableTodos.filter(
        //@ts-ignore
        el => el[key] === TodoStore.filters[key],
      );
    }
  },
);

export default TodoStore;
