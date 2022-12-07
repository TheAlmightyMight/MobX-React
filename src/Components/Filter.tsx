import React from "react";
import styles from "../Styles/Filter.module.css";
import SearchIcon from "./SearchIcon";

const Filter: React.FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <legend>Filter</legend>
          <input type="text" placeholder="Filter by name" />
        </div>
        <SearchIcon />
      </form>
    </div>
  );
};

export default Filter;
