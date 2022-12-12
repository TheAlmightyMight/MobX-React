import React from "react";

//Components
import Representation from "./Representation";
import Filter from "./Filter";

const UserPanel: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <Filter />
      <Representation />
    </div>
  );
};

export default UserPanel;
