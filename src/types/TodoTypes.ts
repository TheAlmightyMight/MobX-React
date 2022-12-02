interface TodoStoreInterface {
  addTodo(title: string, info: string): void;
  removeTodo(id: string): void;
  get todoAmount(): number;
  sortByDate(option: SortOptions): void;
  sortByImportance(option: SortOptions): void;
  filterByStatus(status: TodoStatuses): void;
  filterByName(name: string): void;
}

interface TodoInterface {
  id: string;
  title: string;
  info: string;
  date: Date;
  status: TodoStatuses;
  importance: Importance;
}

enum SortOptions {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
}

enum TodoStatuses {
  ADDED = "ADDED",
  STARTED = "STARTED",
  POSTPONED = "POSTPONED",
  FINISHED = "FINISHED",
}

enum Importance {
  IMPORTANT = 1,
  CAN_WAIT = 2,
  UNIMPORTANT = 3,
}

export { SortOptions, TodoStatuses, Importance };
export type { TodoStoreInterface, TodoInterface };
