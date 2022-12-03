import React from "react";
import { observer } from "mobx-react";
import { TodoStoreType } from "../types/TodoTypes";
import { v4 } from "uuid";
import styles from "../Styles/TodoList.module.css";

// Components
import TodoItem from "./TodoItem";

interface Props {
  store: TodoStoreType;
}

const TodoList = observer((props: Props) => {
  return (
    <div className={styles.container}>
      <ul>
        {props.store.todosAll.map((el) => {
          return <TodoItem {...el} key={el.id} />;
        })}
      </ul>
    </div>
  );
});

export default TodoList;
