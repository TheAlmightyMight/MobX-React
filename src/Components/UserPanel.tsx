import React from "react";

//Components
import StatusIcon from "./StatusIcon";
import SearchIcon from "./SearchIcon";
import ImportanceIcon from "./ImportanceIcon";
import DateIcon from "./DateIcon";

import Filter from "./Filter";

const UserPanel: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <Filter />
      <section></section>
      {/* <StatusIcon />
      <ImportanceIcon />
      <DateIcon /> */}
    </div>
  );
};

export default UserPanel;
