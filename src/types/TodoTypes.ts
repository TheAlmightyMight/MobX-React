import TodoStore from "../Store/TodoStore";

type TodoStoreType = typeof TodoStore;

interface TodoInterface {
  id: string;
  title: string;
  info: string;
  edited: boolean;
  creationDate: Date;
  editDate: string;
  history: Array<TodoHistoryInterface>;
  status: TodoStatuses;
  importance: TodoImportance;
}

interface TodoHistoryInterface {
  id: string;
  date: Date | string;
  changes: Array<string>;
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

enum TodoImportance {
  IMPORTANT = 1,
  CAN_WAIT = 2,
  UNIMPORTANT = 3,
}

export { SortOptions, TodoStatuses, TodoImportance };
export type { TodoInterface, TodoStoreType, TodoHistoryInterface };
