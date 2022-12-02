import React, { useState } from "react";
import styles from "../Styles/TodoForm.module.css";
import { v4 } from "uuid";
import { TodoStoreType } from "../types/TodoTypes";

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

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("yay");
    setTitle(e.target.value);
  };

  const infoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };

  return (
    <form>
      <fieldset className={styles.fieldSetContainer}>
        <legend>Create a Todo</legend>

        <label htmlFor="todo-title">Title</label>
        <input
          onChange={titleHandler}
          type="text"
          name="title"
          id="todo-title"
        />

        <label htmlFor="date">Description</label>
        <input
          onChange={infoHandler}
          type="text"
          name="completion-date"
          id="date"
        />

        <label htmlFor="">Importance</label>
        <select>
          <optgroup>{optionsArray}</optgroup>
        </select>

        <input
          onClick={() => store.addTodo(title, info)}
          type="button"
          value="Create a new todo"
        />
      </fieldset>
    </form>
  );
};

export default TodoForm;
