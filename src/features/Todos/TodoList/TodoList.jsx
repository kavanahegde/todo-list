import { useMemo } from "react";
import TodoListItem from "./TodoListItem.jsx";

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter = "all",
}) {
  const filteredTodoList = useMemo(() => {
    const todos = todoList.filter((todo) => {
      if (statusFilter === "active") {
        return !todo.isCompleted;
      }

      if (statusFilter === "completed") {
        return todo.isCompleted;
      }

      return true;
    });

    return {
      version: dataVersion,
      todos,
    };
  }, [todoList, dataVersion, statusFilter]);

  return filteredTodoList.todos.length === 0 ? (
    <p>Add todo above to get started</p>
  ) : (
    <ul>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;