import React from "react";
import { TodoHistoryInterface } from "../types/TodoTypes";
import styles from "../Styles/ChangeList.module.css";

interface Props {
  history: Array<TodoHistoryInterface>;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeList: React.FC<Props> = ({ history, handler }) => {
  return (
    <div className={styles.container}>
      <ul>
        {history.map(el => {
          return (
            <li key={el.id}>
              <h4>Made {String(el.date)}</h4>

              <p>{el.changes.title || "Title unchanged"}</p>
              <p>
                {(() => {
                  if (Number(el.changes.importance) === 1) {
                    return "Important";
                  } else if (Number(el.changes.importance) === 2) {
                    return "Can wait";
                  } else if (Number(el.changes.importance) === 3) {
                    return "Unimportant";
                  }
                })() || "Importance unchanged"}
              </p>
              <p>{el.changes.status || "Status unchanged"}</p>
              <p>{el.changes.info || "Description unchanged"}</p>
            </li>
          );
        })}
      </ul>
      <button
        className={styles.btn}
        onClick={() => handler(false)}
      >
        X
      </button>
    </div>
  );
};

export default ChangeList;
