import React from "react";

interface Props {
  children: Array<React.ReactElement> | React.ReactElement;
}

const CSS = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  position: "absolute",
  top: "10px",
  right: "10px",
};

const TodoToolPanel: React.FC<Props> = ({ children }) => {
  return <div style={CSS as React.CSSProperties}>{children}</div>;
};

export default TodoToolPanel;
