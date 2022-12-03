import React from "react";
import styles from "../Styles/TodoItem.module.css";

// Store
import { TodoStore } from "../DevTools";

interface Props {
  title: string;
  info: string;
  importance: number;
  id: string;
}

const TodoItem: React.FC<Props> = ({ title, info, importance, id }) => {
  return (
    <li className={styles.item}>
      <h3 className={styles.heading}>{title}</h3>
      <div className={styles.info}>
        <p>{info}</p>
        <p>
          {importance === 1
            ? "Important"
            : importance === 2
            ? "Can wait"
            : "Unimportant"}
        </p>
        <button onClick={() => TodoStore.removeTodo(id)}>Delete</button>
        <button>Change urgency</button>
      </div>
    </li>
  );
};

export default TodoItem;
