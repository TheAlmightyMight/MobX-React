import { action, makeObservable, observable, computed } from "mobx";
import { v4 } from "uuid";

import { SortOptions, TodoStatuses, Importance } from "../types/TodoTypes";
import { TodoStoreInterface, TodoInterface } from "../types/TodoTypes";

class Todo implements TodoInterface {
  id: string;
  title: string;
  info: string;
  date: Date;
  status: TodoStatuses;
  importance: Importance;

  constructor(title: string, info?: string) {
    this.title = title;
    this.id = v4();
    this.info = info || "";
    this.date = new Date();
    this.status = TodoStatuses.ADDED;
    this.importance = Importance.IMPORTANT;
  }
}

class TodoStoreClass implements TodoStoreInterface {
  todos: Array<Todo>;
  loading: boolean;
  error: boolean;

  constructor() {
    makeObservable(this, {
      todos: observable,
      loading: observable,
      error: observable,
      addTodo: action,
      todoAmount: computed,
    });

    this.todos = [];
    this.loading = false;
    this.error = false;
  }

  addTodo(title: string, info: string): void {
    this.todos.push(new Todo(title, info));
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter((el) => el.id !== id);
  }

  sortByDate(option: SortOptions): void | Array<Todo> {
    switch (option) {
      case SortOptions.ASCENDING: {
        this.todos = this.todos.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );
        break;
      }
      case SortOptions.DESCENDING: {
        this.todos = this.todos.sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );
        break;
      }
      default:
        return this.todos;
    }
  }

  sortByImportance(option: SortOptions): void | Array<Todo> {
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
    return this.todos.filter((el) => new RegExp(`${title}`).test(el.title));
  }

  get todoAmount(): number {
    return this.todos.length;
  }

  get todosAll(): Array<Todo> {
    return this.todos;
  }
}

export default new TodoStoreClass();
