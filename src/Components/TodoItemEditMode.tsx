import React, { useState, useEffect } from "react";
import styles from "../Styles/TodoItem.module.css";

//Components
import WithTooltip from "../Components/WithTooltip";
import TodoToolPanel from "./TodoToolPanel";

// Store
import { TodoStore } from "../DevTools";
import { TodoHistoryItem } from "../Store/TodoStore";

// Types
import {
  TodoStatuses,
  TodoInterface,
  TodoImportance,
} from "../types/TodoTypes";

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
  showEditModeHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoItemEditMode: React.FC<Props> = ({
  title,
  info,
  id,
  creationDate,
  importance,
  status,
  history,
  showEditModeHandler,
}) => {
  const [historyShown, setHistoryShown] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [infoValue, setInfoValue] = useState<string>(info);

  const infoValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoValue(e.target.value);
  };

  useEffect(() => {
    console.log("history");
    TodoStore.addToItemHistory(id, new TodoHistoryItem([]));
  }, [status, info, title, status]);

  return (
    <li className={styles.item}>
      <h3 className={styles.heading}>{title}</h3>
      <form className={styles.info}>
        <fieldset>
          <label>
            Current status:{" "}
            <select
              onChange={() =>
                TodoStore.changeTodoStatus(id, TodoStatuses.STARTED)
              }
            >
              <optgroup>
                <option>Important</option>
                <option>Can wait</option>
                <option>Unimportant</option>
              </optgroup>
            </select>
          </label>
          <br />
          <label>
            Current importance:{" "}
            <select
              onChange={() =>
                TodoStore.changeTodoImportance(id, TodoImportance.CAN_WAIT)
              }
              // value={}
            >
              <optgroup>
                <option>Important</option>
                <option>Can wait</option>
                <option>Unimportant</option>
              </optgroup>
            </select>
          </label>
          <div style={{ position: "relative" }}>
            <label
              htmlFor="description"
              className={styles.editModeInfoLabel}
            >
              Todo description:
            </label>
            <textarea
              id="description"
              className={styles.editModeInfo}
              onChange={infoValueHandler}
              value={infoValue}
            />
          </div>
          <TodoToolPanel>
            <button onClick={() => showEditModeHandler(false)}>Exit</button>
            <button onClick={() => TodoStore}>Save</button>
          </TodoToolPanel>
        </fieldset>
      </form>
    </li>
  );
};

export default TodoItemEditMode;
