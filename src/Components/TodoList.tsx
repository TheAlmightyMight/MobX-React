import React, { useState } from "react";
import styles from "../Styles/TodoList.module.css";
import { TodoImportance, TodoStatuses } from "../types/TodoTypes";

// Store
import { observer } from "mobx-react";
import { TodoStore } from "../DevTools";
// Components
import TodoItem from "./TodoItem";

const TodoList = observer<React.FunctionComponent>(() => {
  return (
    <div className={styles.container}>
      <ul>
        {TodoStore.todosAll.map(el => {
          return (
            <TodoItem
              {...el}
              key={el.id}
            />
          );
        })}
      </ul>
    </div>
  );
});

export default TodoList;
