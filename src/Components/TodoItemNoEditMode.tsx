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

const DeleteButtonComponent: React.FC<{
  handler: (e: React.MouseEvent) => void;
}> = ({ handler }) => {
  return <button onClick={handler}>Delete</button>;
};

const EditButtonComponent: React.FC<{
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ handler }) => {
  return <button onClick={() => handler(true)}>Edit</button>;
};

const DeleteButton = WithTooltip({
  Component: DeleteButtonComponent,
  info: "Delete a todo",
});

const EditButton = WithTooltip({
  Component: EditButtonComponent,
  info: "Enter edit mode",
});

const Tooltip = WithTooltip({
  Component: ShowEditButton,
  info: "See edit history",
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
          <DeleteButton handler={() => TodoStore.removeTodo(id)} />
          <EditButton handler={setEditMode} />
        </TodoToolPanel>

        {historyShown && <ChangeList history={history} />}
      </div>
    </li>
  );
};

export default TodoItemNoEditMode;
