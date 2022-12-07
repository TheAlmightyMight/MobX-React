import React, { useEffect, useState } from "react";

//Components
import TodoForm from "./Components/TodoForm";
import Heading from "./Components/Heading";
import TodoList from "./Components/TodoList";
import UserPanel from "./Components/UserPanel";

//CSS
import styles from "./Styles/App.module.css";

//Store
import { TodoStore } from "../src/DevTools";

// TODO:
// 1. Make a todo list component sortable, filterable and rearrangeable with drag and drop API;
// 2. Connect with some kind of Backend

function App() {
  return (
    <main className={styles.mainContainer}>
      <Heading />
      {/* <UserPanel /> */}
      <TodoForm store={TodoStore} />
      <TodoList store={TodoStore} />
    </main>
  );
}

export default App;
