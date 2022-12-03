import React, { useState } from "react";
import styles from "../Styles/TodoForm.module.css";
import { v4 } from "uuid";
import { Importance, TodoStoreType } from "../types/TodoTypes";

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

const TodoForm: React.FC<Props> = ({ store }) => {
  const [title, setTitle] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [importance, setImportance] = useState<number>(Importance.IMPORTANT);

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const infoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
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

  return (
    <form>
      <fieldset className={styles.container}>
        <legend className={styles.label}>Create a Todo</legend>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="todo-title">
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
          <label className={styles.label} htmlFor="info">
            Description
          </label>
          <input
            onChange={infoHandler}
            className={styles.input}
            type="text"
            name="completion-date"
            id="info"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Importance
          </label>
          <select className={styles.input} onChange={importanceHandler}>
            <optgroup>{optionsArray}</optgroup>
          </select>
        </div>

        <input
          onClick={() => store.addTodo(title, info, importance)}
          className={styles.btn}
          type="button"
          value="Create a new todo"
        />
      </fieldset>
    </form>
  );
};

export default TodoForm;
