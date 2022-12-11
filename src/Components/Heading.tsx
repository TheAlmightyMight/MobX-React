import React from "react";
import styles from "../Styles/Heading.module.css";

interface Props {
  setUserPanelShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Heading: React.FC<Props> = ({ setUserPanelShown }) => {
  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
      <span
        onClick={() => setUserPanelShown(true)}
        className={styles.showPanel}
      >
        Go to panel
      </span>
    </div>
  );
};

export default Heading;
