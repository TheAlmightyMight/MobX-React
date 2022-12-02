import React from "react";
import { Importance } from "../types/TodoTypes";
import styles from "../Styles/TodoForm.module.css";
import { v4 } from "uuid";

const optionsArray = (() => {
  const options: Array<React.ReactElement> = [];
  const keys = Object.keys(Importance).filter((el) => !/\d+/.test(el));

  for (let item of keys) {
    options.push(<option key={v4()}>{item}</option>);
  }

  return options;
})();

const TodoForm: React.FC<{}> = () => {
  return (
    <form>
      <fieldset className={styles.fieldSetContainer}>
        <legend>Create a Todo</legend>

        <label htmlFor="todo-title">Title</label>
        <input type="text" name="title" id="todo-title" />

        <label htmlFor="date">Green</label>
        <input type="date" name="completion-date" id="date" />

        <label htmlFor="colour_blue">Importance</label>
        <select>
          <optgroup>{optionsArray}</optgroup>
        </select>
      </fieldset>
    </form>
  );
};

export default TodoForm;
