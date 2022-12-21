import React from "react";

interface Props {
  text: string;
}

const CSS = {
  position: "absolute",
  right: "0",
  top: "-15px",
};

const ErrorMessage: React.FC<Props> = ({ text }) => {
  return (
    <div style={CSS as React.CSSProperties}>
      <span>{"Error: " + text}</span>
    </div>
  );
};

export default ErrorMessage;
