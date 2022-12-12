import React, { useState } from "react";
import styles from "../Styles/Hint.module.css";

interface Props {
  info: string;
  style: { bottom: string; left: string; width: string };
}

const Hint: React.FC<Props> = ({ info, style }) => {
  return (
    <div
      style={style}
      className={styles.container}
    >
      <p>{info}</p>
    </div>
  );
};

export default Hint;
