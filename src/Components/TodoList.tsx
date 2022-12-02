import React from "react";
import { observer } from "mobx-react";
import { TodoStoreType } from "../types/TodoTypes";

interface Props {
  store: TodoStoreType;
}

const TodoList = observer((props: Props) => {
  return (
    <div>
      <ul>
        {props.store.todosAll.map((el) => {
          return <li>{el.title}</li>;
        })}
      </ul>
    </div>
  );
});

export default TodoList;
