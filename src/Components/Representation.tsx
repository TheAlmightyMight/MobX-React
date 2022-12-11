import React from "react";
import styles from "../Styles/Representation.module.css";
import { TodoStore } from "../DevTools";

//Components
import StatusIcon from "./StatusIcon";
import SearchIcon from "./SearchIcon";
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

            <label>
              Importance
              <select onChange={e => importanceFilterHandler(e)}>
                <ImportanceSelect />
              </select>
            </label>

            <label>
              Progress
              <select onChange={e => statusFilterHandler(e)}>
                <StatusSelect />
              </select>
            </label>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Representation;
