import React, { useRef } from "react";
import styles from "../Styles/Filter.module.css";
import SearchIcon from "./SearchIcon";
import { TodoStore } from "../DevTools";

const Filter: React.FC = () => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    TodoStore.setMutableTodos(
      TodoStore.todos.filter(el =>
        new RegExp(`${e.target.value}`, "ig").test(el.title),
      ),
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <SearchIcon />
        <label
          className={styles.label}
          htmlFor="search"
        >
          Filter
        </label>
        <input
          ref={ref}
          onChange={e => searchHandler(e)}
          id="search"
          className={styles.input}
          type="text"
          placeholder="Filter by name"
        />
      </form>
    </div>
  );
};

export default Filter;
