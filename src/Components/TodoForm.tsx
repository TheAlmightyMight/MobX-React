import React, { useState, useEffect } from "react";
import styles from "../Styles/TodoForm.module.css";
import { v4 } from "uuid";

// Components
import ErrorMessage from "./ErrorMessage";
import ErrorModal from "./ErrorModal";

// Store
import { TodoImportance, TodoStoreType } from "../types/TodoTypes";

// Hooks
import useError from "../hooks/UseError";

// Helper
const optionsArray = (() => {
  const options: Array<React.ReactElement> = [];
  const names = ["Important", "Can wait", "Unimportant"];

  for (let i = 0; i < names.length; i++) {
    options.push(<option key={v4()}>{names[i]}</option>);
  }

  return options;
})();

interface Props {
  store: TodoStoreType;
}

// ----------------------------------------------------

const TodoForm: React.FC<Props> = ({ store }) => {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useError(10);
  const [info, setInfo] = useState<string>("");
  const [infoError, setInfoError] = useError(304);
  const [modalShown, setModalShown] = useState<boolean>(false);

  const [importance, setImportance] = useState<number>(
    TodoImportance.IMPORTANT,
  );

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(e);
  };

  const infoHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfo(e.target.value);
    setInfoError(e);
  };

  const importanceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "Important": {
        setImportance(1);
        break;
      }
      case "Can wait": {
        setImportance(2);
        break;
      }
      case "Unimportant": {
        setImportance(3);
        break;
      }
      default: {
        console.log("yay");
        break;
      }
    }
  };

  const addTodoHandler = () => {
    if (titleError || infoError) {
      setModalShown(true);
      return;
    }
    store.addTodo(title, info, importance);
  };

  return (
    <>
      {modalShown && (
        <ErrorModal
          open={modalShown}
          handler={setModalShown}
        />
      )}

      <form>
        <fieldset className={styles.container}>
          <legend>
            <h2>Create a Todo</h2>
          </legend>

          <div className={styles.inputContainer}>
            {titleError ? (
              <ErrorMessage text={"Too many characters for a title!"} />
            ) : (
              ""
            )}

            <label
              className={styles.label}
              htmlFor="todo-title"
            >
              Title
            </label>
            <input
              onChange={titleHandler}
              className={styles.input}
              type="text"
              name="title"
              id="todo-title"
            />
          </div>

          <div className={styles.inputContainer}>
            {infoError ? (
              <ErrorMessage text={"Too many characters for description!"} />
            ) : (
              ""
            )}

            <label
              className={styles.label}
              htmlFor="info"
            >
              Description
            </label>
            <textarea
              onChange={infoHandler}
              className={styles.textarea}
              name="completion-date"
              id="info"
            />
          </div>

          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              htmlFor=""
            >
              Importance
            </label>
            <select
              className={styles.input}
              onChange={importanceHandler}
            >
              <optgroup>{optionsArray}</optgroup>
            </select>
          </div>

          <input
            onClick={addTodoHandler}
            className={styles.btn}
            type="button"
            value="Create a new todo"
          />
        </fieldset>
      </form>
    </>
  );
};

export default TodoForm;
