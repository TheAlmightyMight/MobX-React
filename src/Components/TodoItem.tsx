import React, { useEffect, useState } from "react";
import styles from "../Styles/TodoItem.module.css";

//Components
import WithTooltip from "../Components/WithTooltip";
import TodoItemEditMode from "./TodoItemEditMode";
import TodoItemNoEditMode from "./TodoItemNoEditMode";

// Store
import { TodoStore } from "../DevTools";
import { TodoHistoryItem } from "../Store/TodoStore";

// Types
import { TodoImportance, TodoInterface } from "../types/TodoTypes";

const ShowEditButton: React.FC<{
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ handler }) => {
  return <button onClick={() => handler}>History</button>;
};

const Tooltip = WithTooltip({
  Component: ShowEditButton,
  info: "See all edit history",
});

const TodoItem: React.FC<TodoInterface> = props => {
  const [editMode, setEditMode] = useState<boolean>(false);

  if (editMode) {
    return (
      <TodoItemEditMode
        {...props}
        showEditModeHandler={setEditMode}
      />
    );
  } else {
    return (
      <TodoItemNoEditMode
        {...props}
        showEditModeHandler={setEditMode}
      />
    );
  }
};

export default TodoItem;
