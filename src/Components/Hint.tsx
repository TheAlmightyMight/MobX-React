import React, { useState } from "react";
import styles from "../Styles/Hint.module.css";

interface Props {
  info: string;
}

const Hint: React.FC<Props> = ({ info }) => {
  return (
    <div className={styles.container}>
      <p>{info}</p>
    </div>
  );
};

export default Hint;
