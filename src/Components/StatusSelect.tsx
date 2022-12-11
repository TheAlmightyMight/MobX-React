import React from "react";
import { TodoStatuses } from "../types/TodoTypes";

const StatusSelect: React.FC = () => {
  return (
    <optgroup>
      <option value={TodoStatuses.ADDED}>Added</option>
      <option value={TodoStatuses.STARTED}>Started</option>
      <option value={TodoStatuses.POSTPONED}>Postponed</option>
      <option value={TodoStatuses.FINISHED}>Finished</option>
    </optgroup>
  );
};

export default StatusSelect;
