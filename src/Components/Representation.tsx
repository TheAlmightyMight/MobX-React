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

  const importanceSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    TodoStore.setFilter({
      ...TodoStore.filtersAll,
      sortByImportance: e.target.value.toUpperCase(),
    });
    console.log(TodoStore.filtersAll);
  };

  const dateSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    TodoStore.setFilter({
      ...TodoStore.filtersAll,
      sortByDate: e.target.value.toUpperCase(),
    });
  };

  const resetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    TodoStore.setFilter({
      importance: 0,
      status: "",
      sortByImportance: "",
      sortByDate: "",
    });

    TodoStore.setMutableTodos(TodoStore.todos);
  };

  return (
    <div style={{ width: "100%" }}>
      <section>
        <form>
          <fieldset className={styles.fieldSet}>
            {/* <label>Filter</label> */}

            <div className={styles.wrapper}>
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
            </div>

            <div className={styles.wrapper}>
              <div className={styles.container}>
                <label
                  htmlFor="importance"
                  className={styles.label}
                >
                  Sort by importance
                </label>
                <select
                  onChange={importanceSortHandler}
                  id="importance"
                  className={styles.select}
                >
                  <optgroup>
                    <option>Ascending</option>
                    <option>Descending</option>
                  </optgroup>
                </select>
              </div>

              <div className={styles.container}>
                <label
                  htmlFor="sort by date"
                  className={styles.label}
                >
                  Sort by date
                </label>
                <select
                  onChange={dateSortHandler}
                  id="sort by date"
                  className={styles.select}
                >
                  <optgroup>
                    <option>Ascending</option>
                    <option>Descending</option>
                  </optgroup>
                </select>
              </div>

              <button
                className={styles.btn}
                type="button"
                onClick={e => resetHandler(e)}
              >
                Reset
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Representation;
