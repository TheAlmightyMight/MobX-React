import React from "react";
import styles from "../Styles/TodoItem.module.css";
import WithTooltip from "../Components/WithTooltip";

// Store
import { TodoStore } from "../DevTools";

interface Props {
  title: string;
  info: string;
  importance: number;
  id: string;
  creationDate: Date;
  history: Array<any>;
}

const ShowEditButton: React.FC<{}> = () => {
  return <button>Edit history</button>;
};

const Tooltip = WithTooltip({
  Component: ShowEditButton,
  info: "See all edit history",
});

const TodoItem: React.FC<Props> = ({
  title,
  info,
  importance,
  id,
  creationDate,
  history,
}) => {
  console.log(creationDate);
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

        <Tooltip />
        <span>Created: {creationDate.toLocaleDateString()}</span>
        <span>LastEdited: </span>

        <button onClick={() => TodoStore.removeTodo(id)}>Delete</button>
        <button>Change urgency</button>
      </div>
    </li>
  );
};

export default TodoItem;
