import React from "react";
import styles from "../Styles/Filter.module.css";
import SearchIcon from "./SearchIcon";

const Filter: React.FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label
          className={styles.label}
          htmlFor="search"
        >
          Filter
        </label>
        <input
          id="search"
          className={styles.input}
          type="text"
          placeholder="Filter by name"
        />
      </form>
    </div>
  );
};

export default Filter;
