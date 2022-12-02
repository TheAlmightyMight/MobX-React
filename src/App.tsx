import React, { useEffect, useState } from "react";

//Components
import TodoForm from "./Components/TodoForm";
import Heading from "./Components/Heading";
import Counter from "../src/Components/Counter";
import CounterStore from "./Store/CounterStore";
//CSS
import styles from "./Styles/App.module.css";

// TODO:
// 1. Make a todo list component sortable, filterable and rearrangeable with drag and drop API;
// 2. Connect with some kind of Backend

function App() {
  return (
    <div className="App">
      <main className={styles.mainContainer}>
        <Heading />
        <TodoForm />
      </main>
    </div>
  );
}

export default App;
