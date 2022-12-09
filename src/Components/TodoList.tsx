import React, { useState } from "react";
import { observer } from "mobx-react";
import { TodoStoreType } from "../types/TodoTypes";
import styles from "../Styles/TodoList.module.css";

// Components
import TodoItem from "./TodoItem";

interface Props {
  store: TodoStoreType;
}

const TodoList = observer((props: Props) => {
  const [filter, setFilter] = useState<string>("none");

  // if (filter === "all") {
  //   return (
  //     <div className={styles.container}>
  //       <ul>
  //         {props.store.todosAll.map(el => {
  //           return (
  //             <TodoItem
  //               {...el}
  //               key={el.id}
  //             />
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
  // } else if (filter === "status") {
  //   return <div></div>;
  // } else if (filter === "name") {
  //   return <div></div>;
  // }

  return (
    <div className={styles.container}>
      <ul>
        {props.store.todosAll.map(el => {
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
