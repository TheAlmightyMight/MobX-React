import React from "react";
import styles from "../Styles/Representation.module.css";
import { TodoStore } from "../DevTools";

//Components
import StatusIcon from "./StatusIcon";
import ImportanceIcon from "./ImportanceIcon";
import DateIcon from "./DateIcon";
import StatusSelect from "./StatusSelect";
import ImportanceSelect from "./ImportanceSelect";

const Representation: React.FC = e => {
  const importanceFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    TodoStore.setFilter({
      ...TodoStore.filtersAll,
      importance: Number(e.target.value),
    });
  };

  const statusFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    TodoStore.setFilter({
      ...TodoStore.filtersAll,
      status: e.target.value,
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <section>
        <form>
          <fieldset className={styles.fieldSet}>
            {/* <label>Filter</label> */}

            <div className={styles.container}>
              <label
                className={styles.label}
                htmlFor="importance"
              >
                Importance
              </label>
              <select
                className={styles.select}
                id="importance"
                onChange={e => importanceFilterHandler(e)}
              >
                <ImportanceSelect />
              </select>
            </div>

            <div className={styles.container}>
              <label
                className={styles.label}
                htmlFor="progress"
              >
                Progress
              </label>
              <select
                className={styles.select}
                id="progress"
                onChange={e => statusFilterHandler(e)}
              >
                <StatusSelect />
              </select>
            </div>

            <div></div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Representation;
