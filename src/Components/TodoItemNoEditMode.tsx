import React, { useState, useEffect, Dispatch } from "react";
import styles from "../Styles/TodoItem.module.css";

//Components
import WithTooltip from "../Components/WithTooltip";
import ChangeList from "./ChangeList";
import TodoToolPanel from "./TodoToolPanel";

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

interface Props extends TodoInterface {
  showEditModeHandler: Dispatch<React.SetStateAction<boolean>>;
}

const TodoItemNoEditMode: React.FC<Props> = ({
  title,
  info,
  importance,
  id,
  creationDate,
  status,
  history,
  showEditModeHandler,
}) => {
  const [historyShown, setHistoryShown] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <li className={styles.item}>
      <h3 className={styles.heading}>{title}</h3>
      <div className={styles.info}>
        <h4>Created: {creationDate.toLocaleDateString()}</h4>
        <span>
          LastEdited: {history[history.length - 1]?.date.toLocaleString()}
        </span>
        <p>{info}</p>
        <p>
          Status:{" "}
          {status === "ADDED"
            ? "started"
            : status === "POSTPONED"
            ? "postponed"
            : status === "FINISHED"
            ? "finished"
            : "started"}
        </p>
        <p>
          Current importance:
          {importance === 1
            ? " Important"
            : importance === 2
            ? " Can wait"
            : " Unimportant"}
        </p>
        <TodoToolPanel>
          <Tooltip handler={setHistoryShown} />
          <button onClick={() => TodoStore.removeTodo(id)}>Delete</button>
          <button onClick={() => showEditModeHandler(true)}>Edit</button>
        </TodoToolPanel>

        {historyShown && <ChangeList history={history} />}
      </div>
    </li>
  );
};

export default TodoItemNoEditMode;
