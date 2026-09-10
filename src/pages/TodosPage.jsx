import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router";
import TodoForm from "../features/Todos/TodoForm.jsx";
import TodoList from "../features/Todos/TodoList/TodoList.jsx";
import SortBy from "../shared/SortBy.jsx";
import FilterInput from "../shared/FilterInput.jsx";
import StatusFilter from "../shared/StatusFilter.jsx";
import useDebounce from "../utils/useDebounce.js";

import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from "../reducers/todoReducer.js";

import { useAuth } from "../contexts/AuthContext.jsx";

function TodosPage() {
  const { token } = useAuth();

  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

  const [state, dispatch] = useReducer(
    todoReducer,
    initialTodoState
  );

  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({
        type: TODO_ACTIONS.FETCH_START,
      });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: {
            todos: data.tasks,
          },
        });
      } catch (error) {
        const isFilterError =
          Boolean(debouncedFilterTerm) ||
          sortBy !== "createdAt" ||
          sortDirection !== "asc";

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? `Error filtering/sorting todos: ${error.message}`
              : `Error fetching todos: ${error.message}`,
            isFilterError,
          },
        });
      }
    };

    if (token) {
      fetchTodos();
    }
  }, [
    token,
    sortBy,
    sortDirection,
    debouncedFilterTerm,
    dataVersion,
  ]);

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: {
        filterTerm: newTerm,
      },
    });
  };

  const addTodo = async (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: {
        todo: newTodo,
      },
    });

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const data = await response.json();
      const savedTodo = data.task ?? data;

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: newTodo.id,
          savedTodo,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: newTodo.id,
          message: error.message,
        },
      });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find(
      (todo) => todo.id === id
    );

    if (!originalTodo) {
      return;
    }

    const updatedCompletionStatus =
      !originalTodo.isCompleted;

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: {
        id,
        isCompleted: updatedCompletionStatus,
      },
    });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          isCompleted: updatedCompletionStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo status");
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          originalTodo,
          message: error.message,
        },
      });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    if (!originalTodo) {
      return;
    }

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: {
        editedTodo,
      },
    });

    try {
      const response = await fetch(
        `/api/tasks/${editedTodo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
          body: JSON.stringify({
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          originalTodo,
          message: error.message,
        },
      });
    }
  };

  const deleteTodo = async (id) => {
    const originalTodo = todoList.find(
      (todo) => todo.id === id
    );

    if (!originalTodo) {
      return;
    }

    dispatch({
      type: TODO_ACTIONS.DELETE_TODO_START,
      payload: {
        id,
      },
    });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_ERROR,
        payload: {
          originalTodo,
          message: error.message,
        },
      });
    }
  };

  return (
    <main className="page-container todos-page">
      <section className="page-hero">
        <p className="eyebrow">Task manager</p>
        <h2>My Todos</h2>
        <p className="page-description">
          Organize your tasks, track progress, and stay focused.
        </p>
      </section>

      {error && (
        <div className="message-card error-card" role="alert">
          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              dispatch({
                type: TODO_ACTIONS.CLEAR_ERROR,
              })
            }
          >
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div className="message-card error-card" role="alert">
          <p>{filterError}</p>

          <div className="message-actions">
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: TODO_ACTIONS.CLEAR_FILTER_ERROR,
                })
              }
            >
              Clear Error
            </button>

            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: TODO_ACTIONS.RESET_FILTERS,
                })
              }
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <section className="todo-panel">
        <div className="section-heading">
          <h3>Find and organize</h3>
          <p>Search, sort, and filter your todo list.</p>
        </div>

        <div className="todo-controls">
          <div className="search-control">
            <FilterInput
              filterTerm={filterTerm}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="filter-grid">
            <SortBy
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortByChange={(newSortBy) =>
                dispatch({
                  type: TODO_ACTIONS.SET_SORT,
                  payload: {
                    sortBy: newSortBy,
                    sortDirection,
                  },
                })
              }
              onSortDirectionChange={(newSortDirection) =>
                dispatch({
                  type: TODO_ACTIONS.SET_SORT,
                  payload: {
                    sortBy,
                    sortDirection: newSortDirection,
                  },
                })
              }
            />

            <StatusFilter />
          </div>
        </div>
      </section>

      <section className="todo-panel">
        <div className="section-heading">
          <h3>Add a new todo</h3>
          <p>Create a task and add it to your list.</p>
        </div>

        <TodoForm onAddTodo={addTodo} />
      </section>

      <section className="todo-list-section">
        <div className="section-heading">
          <h3>Your tasks</h3>
          <p>
            Click a task title to edit it, use the checkbox to update
            its status, or delete it when you no longer need it.
          </p>
        </div>

        {isTodoListLoading ? (
          <div className="message-card">
            <p>Loading todos...</p>
          </div>
        ) : (
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
            dataVersion={dataVersion}
            statusFilter={statusFilter}
          />
        )}
      </section>
    </main>
  );
}

export default TodosPage;