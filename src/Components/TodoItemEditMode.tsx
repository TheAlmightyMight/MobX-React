import React, { useState, useEffect } from "react";
import styles from "../Styles/TodoItem.module.css";

//Components
import WithTooltip from "../Components/WithTooltip";
import TodoToolPanel from "./TodoToolPanel";
import StatusSelect from "./StatusSelect";
import ImportanceSelect from "./ImportanceSelect";

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
  importance,
  status,
  history,
  showEditModeHandler,
}) => {
  const [buffer, setBuffer] = useState({
    importance: "",
    status: "",
    title: "",
    info: "",
  });
  const [titleValue, setTitleValue] = useState<string>(title);
  const [infoValue, setInfoValue] = useState<string>(info);
  const [importanceValue, setImportanceValue] = useState<
    TodoImportance | string
  >(importance);
  const [statusValue, setStatusValue] = useState<string>(status);

  const importanceValueHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImportanceValue(e.target.value);
    setBuffer(prev => {
      return { ...prev, importance: e.target.value };
    });
  };

  const statusValueHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(e.target.value);
    setBuffer(prev => {
      return { ...prev, status: e.target.value };
    });
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    setBuffer(prev => {
      return { ...prev, title: e.target.value };
    });
  };

  const infoHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoValue(e.target.value);
    setBuffer(prev => {
      return { ...prev, info: e.target.value };
    });
  };

  const saveHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (buffer.importance) {
      TodoStore.changeTodoImportance(
        id,
        buffer.importance as any as TodoImportance,
      );
    }

    if (buffer.status) {
      TodoStore.changeTodoStatus(id, buffer.status as TodoStatuses);
    }

    if (buffer.title) {
      TodoStore.changeTodoTitle(id, buffer.title);
    }

    if (buffer.info) {
      TodoStore.changeTodoInfo(id, buffer.info);
    }

    TodoStore.addToItemHistory(id, new TodoHistoryItem([buffer]));
  };

  const exitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    showEditModeHandler(false);
  };

  return (
    <li className={styles.item}>
      <h3 className={styles.heading}>{title}</h3>
      <form className={styles.info}>
        <fieldset style={{ border: "none" }}>
          <label>
            Current progress:{" "}
            <select
              name="status"
              value={statusValue}
              onChange={e => statusValueHandler(e)}
            >
              <StatusSelect />
            </select>
          </label>
          <br />
          <label>
            Current importance:{" "}
            <select
              name="importance"
              onChange={e => importanceValueHandler(e)}
              value={importanceValue}
            >
              <ImportanceSelect />
            </select>
          </label>
          <div>
            <label>
              Title:{" "}
              <input
                type="text"
                value={titleValue}
                onChange={e => titleHandler(e)}
              />
            </label>
          </div>
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
              value={infoValue}
              onChange={e => infoHandler(e)}
            />
          </div>
          <TodoToolPanel>
            <button
              type="button"
              onClick={e => exitHandler(e)}
            >
              Exit
            </button>
            <button
              type="button"
              onClick={e => saveHandler(e)}
            >
              Save
            </button>
          </TodoToolPanel>
        </fieldset>
      </form>
    </li>
  );
};

export default TodoItemEditMode;
