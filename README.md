# My Todos

My Todos is a responsive Todo List application built with React and Vite. It allows authenticated users to create, edit, complete, reopen, delete, search, sort, and filter todos.

## Features

- User authentication
- Create new todos
- Edit existing todos
- Complete and reopen todos
- Delete todos
- Search todos by title
- Sort todos by title or creation date
- Sort in ascending or descending order
- Filter todos by All, Active, or Completed status
- Todo input validation
- Profile page with todo statistics
- Protected routes
- Custom 404 page
- Responsive design
- Error handling

## Technologies Used

- React
- React Router
- Vite
- JavaScript
- CSS
- Context API
- `useReducer`
- REST API

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Run the Development Server

Start the application:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3001/
```

## Available Pages

- `/about` — Information about the application
- `/login` — User login
- `/todos` — Todo management
- `/profile` — Account information and todo statistics
- Any unknown route displays the custom 404 page

## Todo Functionality

Authenticated users can:

1. Add a todo.
2. Edit a todo by clicking its title.
3. Mark a todo as completed.
4. Reopen a completed todo.
5. Delete a todo.
6. Search todos by title.
7. Sort todos by title or creation date.
8. Filter todos by active or completed status.

## Validation and Error Handling

Todo titles are validated before they are submitted. Invalid or empty todo titles cannot be added or updated.

The application also displays error messages when API operations fail.

## Quality Checks

Run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

The final project passes the lint check with 0 warnings and 0 errors and builds successfully with Vite.

## Author

Kavana Hegde
