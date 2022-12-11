import React from "react";
import styles from "../Styles/Heading.module.css";

interface Props {
  setUserPanelShown: React.Dispatch<React.SetStateAction<boolean>>;
  userPanelShown: boolean;
}

const Heading: React.FC<Props> = ({ setUserPanelShown, userPanelShown }) => {
  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
      <span
        onClick={() => setUserPanelShown(prev => !prev)}
        className={styles.showPanel}
      >
        {userPanelShown ? "Go to main" : "Go to panel"}
      </span>
    </div>
  );
};

export default Heading;
