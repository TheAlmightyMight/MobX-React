import React from "react";
import { TodoHistoryInterface } from "../types/TodoTypes";
import styles from "../Styles/ChangeList.module.css";

interface Props {
  history: Array<TodoHistoryInterface>;
}

const ChangeList: React.FC<Props> = ({ history }) => {
  return (
    <div className={styles.container}>
      <ul>
        {history.map(el => {
          return <li>{String(el.date)}</li>;
        })}
      </ul>
    </div>
  );
};

export default ChangeList;
