import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";

const todos = [
  { id: 1, title: "Review resources" },
  { id: 2, title: "Take notes" },
  { id: 3, title: "Code out app" },
];

function App() {
  const [todoList, setTodoList] = useState(todos);

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;