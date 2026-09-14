import { useState, useRef } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import {
  isValidTodoTitle,
  MAX_TODO_TITLE_LENGTH,
} from "../../utils/todoValidation.js";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const [validationError, setValidationError] = useState("");

  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!isValidTodoTitle(workingTodoTitle)) {
      setValidationError(
        `Todo must be between 1 and ${MAX_TODO_TITLE_LENGTH} characters.`
      );
      return;
    }

    const trimmedTitle = workingTodoTitle.trim();

    onAddTodo(trimmedTitle);

    setWorkingTodoTitle("");
    setValidationError("");
    inputRef.current?.focus();
  };

  const handleChange = (event) => {
    setWorkingTodoTitle(event.target.value);

    if (validationError) {
      setValidationError("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={inputRef}
        value={workingTodoTitle}
        onChange={handleChange}
        maxLength={MAX_TODO_TITLE_LENGTH}
      />

      {validationError && (
        <p role="alert">{validationError}</p>
      )}

      <button
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;