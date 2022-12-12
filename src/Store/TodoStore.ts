import { makeAutoObservable, autorun, reaction } from "mobx";
import { v4 } from "uuid";

import { SortOptions, TodoStatuses, TodoImportance } from "../types/TodoTypes";
import {
  TodoInterface,
  TodoHistoryInterface,
  TodoChange,
  Filters,
} from "../types/TodoTypes";

class Todo implements TodoInterface {
  id: string = v4();
  title: string;
  info: string;
  creationDate: Date = new Date();
  editDate: string = "";
  expired: boolean = false;
  finishTime: string = "";
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
  filters: Filters = {
    importance: 0,
    status: "",
    sortByImportance: "",
    sortByDate: "",
  };

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
    this.todos = [todo, ...this.todos];
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
    console.log(option);
    switch (option) {
      case SortOptions.ASCENDING: {
        console.log(
          this.mutableTodos.sort(
            (a, b) => b.creationDate.getTime() - a.creationDate.getTime(),
          ),
        );
        this.mutableTodos.sort(
          (a, b) => a.creationDate.getTime() - b.creationDate.getTime(),
        );
        break;
      }
      case SortOptions.DESCENDING: {
        console.log(
          this.mutableTodos.sort(
            (a, b) => b.creationDate.getTime() - a.creationDate.getTime(),
          ),
        );
        this.mutableTodos.sort(
          (a, b) => b.creationDate.getTime() - a.creationDate.getTime(),
        );
        break;
      }
      default:
        return this.mutableTodos;
    }
  }

  sortByImportance(option: SortOptions): void | Array<Todo> {
    console.log(option);
    switch (option) {
      case SortOptions.DESCENDING: {
        this.mutableTodos.sort((a, b) => a.importance - b.importance);
        break;
      }
      case SortOptions.ASCENDING: {
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

  setFilter(newFilters: typeof this.filters): void {
    this.filters = newFilters;
  }

  setMutableTodos(arr: Array<Todo>): void {
    this.mutableTodos = arr;
  }

  get todosImmutable(): Array<Todo> {
    return this.todos;
  }

  get filtersAll(): typeof this.filters {
    return this.filters;
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
  () => TodoStore.filters.sortByDate,
  () => {
    TodoStore.sortByDate(TodoStore.filters.sortByDate as SortOptions);
  },
);

reaction(
  () => TodoStore.filters.sortByImportance,
  () => {
    TodoStore.sortByImportance(
      TodoStore.filters.sortByImportance as SortOptions,
    );
  },
);

reaction(
  () => TodoStore.filters.status,
  () => {
    TodoStore.setMutableTodos(TodoStore.todosImmutable);

    // ----------------------------------------------------
  },
);

reaction(
  () => TodoStore.filters.importance,
  () => {
    TodoStore.setMutableTodos(
      TodoStore.mutableTodos.filter(
        el => el["importance"] === TodoStore.filtersAll["importance"],
      ),
    );
  },
);

reaction(
  () => TodoStore.filters.status,
  () => {
    TodoStore.setMutableTodos(
      TodoStore.mutableTodos.filter(
        el => el["status"] === TodoStore.filtersAll["status"],
      ),
    );
  },
);

// for (let key of keys) {
//   if (
//     //@ts-ignore
//     TodoStore.filtersAll[key] === 0 ||
//     //@ts-ignore
//     TodoStore.filtersAll[key] === ""
//   ) {
//     continue;
//   }
// TodoStore.setMutableTodos(
//   TodoStore.mutableTodos.filter(
//     //@ts-ignore
//     el => el[key] === TodoStore.filtersAll[key],
//   ),
// );
// }

export default TodoStore;
