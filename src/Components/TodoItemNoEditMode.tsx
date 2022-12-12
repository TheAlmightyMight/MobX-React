import React, { useState, Dispatch } from "react";
import styles from "../Styles/TodoItem.module.css";

//Components
import WithTooltip from "../Components/WithTooltip";
import ChangeList from "./ChangeList";
import TodoToolPanel from "./TodoToolPanel";

// Store
import { TodoStore } from "../DevTools";

// Types
import { TodoInterface } from "../types/TodoTypes";

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
  return (
    <li className={styles.item}>
      <h3 className={styles.heading}>{title}</h3>
      <div className={styles.info}>
        <h4>
          Created:{" "}
          {creationDate.toLocaleDateString() +
            "  at  " +
            creationDate.toLocaleTimeString()}
        </h4>
        <p>{info}</p>
        <p>
          Current progress:{" "}
          {status === "ADDED"
            ? "added"
            : status === "POSTPONED"
            ? "postponed"
            : status === "FINISHED"
            ? "finished"
            : "started"}
        </p>
        <p>
          Current importance:{" "}
          {(() => {
            if (Number(importance) === 1) {
              return "Important";
            } else if (Number(importance) === 2) {
              return "Can wait";
            } else if (Number(importance) === 3) {
              return "Unimportant";
            }
          })()}
        </p>
        <span>
          LastEdited: {history[history.length - 1]?.date.toLocaleString()}
        </span>
        <TodoToolPanel>
          <Tooltip handler={setHistoryShown} />
          <DeleteButton handler={() => TodoStore.removeTodo(id)} />
          <EditButton handler={showEditModeHandler} />
        </TodoToolPanel>

        {historyShown && <ChangeList history={history} />}
      </div>
    </li>
  );
};

export default TodoItemNoEditMode;
