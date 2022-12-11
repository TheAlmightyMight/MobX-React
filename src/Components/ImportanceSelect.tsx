import React from "react";
import { TodoImportance } from "../types/TodoTypes";

const ImportanceSelect: React.FC = () => {
  return (
    <optgroup>
      <option value={TodoImportance.IMPORTANT}>Important</option>
      <option value={TodoImportance.CAN_WAIT}>Can wait</option>
      <option value={TodoImportance.UNIMPORTANT}>Unimportant</option>
    </optgroup>
  );
};

export default ImportanceSelect;
