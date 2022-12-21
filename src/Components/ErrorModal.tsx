import React from "react";

interface Props {
  open: boolean;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}

const CSS = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "25px",
  width: "300px",
  textAlign: "center",
  position: "fixed",
  margin: "auto",
  inset: "0",
  zIndex: "10",
};

const ErrorModal: React.FC<Props> = ({ open, handler }) => {
  return (
    <dialog
      style={CSS as React.CSSProperties}
      open={open}
    >
      <p>Please, correct your error before you create a new todo item.</p>
      <button
        style={{ margin: "1.5rem 0 0 0" }}
        onClick={() => handler(false)}
      >
        Хорошо
      </button>
    </dialog>
  );
};

export default ErrorModal;
