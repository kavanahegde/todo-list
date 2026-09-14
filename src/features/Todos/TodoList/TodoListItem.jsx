import { useEffect, useRef, useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel.jsx";
import {
  isValidTodoTitle,
  MAX_TODO_TITLE_LENGTH,
} from "../../../utils/todoValidation.js";

function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  onDeleteTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [validationError, setValidationError] = useState("");

  const editInputRef = useRef();

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setValidationError("");
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);

    if (validationError) {
      setValidationError("");
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!isEditing) {
      return;
    }

    if (!isValidTodoTitle(workingTitle)) {
      setValidationError(
        `Todo must be between 1 and ${MAX_TODO_TITLE_LENGTH} characters.`
      );
      return;
    }

    const trimmedTitle = workingTitle.trim();

    onUpdateTodo({
      ...todo,
      title: trimmedTitle,
    });

    setWorkingTitle(trimmedTitle);
    setValidationError("");
    setIsEditing(false);
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`editTodo-${todo.id}`}
              labelText="Todo"
              ref={editInputRef}
              value={workingTitle}
              onChange={handleEdit}
              maxLength={MAX_TODO_TITLE_LENGTH}
            />

            {validationError && (
              <p role="alert">{validationError}</p>
            )}

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>

            <span onClick={() => setIsEditing(true)}>
              {todo.title}
            </span>

            <button
              type="button"
              onClick={() => onDeleteTodo(todo.id)}
              aria-label={`Delete ${todo.title}`}
            >
              Delete
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;