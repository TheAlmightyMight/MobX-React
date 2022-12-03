import React from "react";
import styles from "../Styles/Heading.module.css";

const Heading: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
    </div>
  );
};

export default Heading;
