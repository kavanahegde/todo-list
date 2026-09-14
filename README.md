# My Todos

My Todos is a responsive Todo List application built with React and Vite. It allows authenticated users to create, edit, complete, reopen, delete, search, sort, and filter todos.

## Live Demo Link

A live demo will be added after the application is deployed.

## Screenshots

Screenshots of the application will be added here to demonstrate the main user interface, including the login page, todo list, filtering and sorting controls, and profile page.

## Features

* User authentication
* Create new todos
* Edit existing todos
* Complete and reopen todos
* Delete todos
* Search todos by title
* Sort todos by title or creation date
* Sort in ascending or descending order
* Filter todos by All, Active, or Completed status
* Todo input validation
* Profile page with todo statistics
* Protected routes
* Custom 404 page
* Responsive design
* Loading and error states
* API error handling

## Technologies Used

* React
* React Router
* Vite
* JavaScript
* CSS
* Context API
* `useReducer`
* REST API
* DOMPurify

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

* `/about` — Information about the application
* `/login` — User login
* `/todos` — Todo management
* `/profile` — Account information and todo statistics
* Any unknown route displays the custom 404 page

## Todo Functionality

Authenticated users can:

1. Add a todo.
2. Edit a todo by clicking its title.
3. Mark a todo as completed.
4. Reopen a completed todo.
5. Delete a todo.
6. Search todos by title.
7. Sort todos by title or creation date.
8. Filter todos by All, Active, or Completed status.

## Validation and Security

Todo titles are validated before they are submitted. Empty or invalid todo titles cannot be added or updated.

Todo titles are also sanitized with DOMPurify before being rendered to help prevent unsafe HTML from being inserted into the application.

The application uses protected routes and authentication state to restrict access to authenticated todo functionality.

## Loading and Error Handling

The application provides loading indicators while data is being retrieved or operations are being processed.

User-friendly error messages are displayed when API requests or other operations fail.

## Design Decisions

The application uses a clean, responsive layout with consistent spacing, typography, buttons, forms, and status indicators.

React Router was used to organize navigation and protected routes. Context API and `useReducer` were used to manage authentication and todo-related state in a structured way.

The interface was designed to keep common todo actions easy to find while providing clear feedback for loading, empty, and error states.

Responsive CSS allows the application to adapt to different screen sizes and devices.

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

## Future Improvements

Possible future improvements include:

* Adding due dates and reminders for todos
* Adding todo categories or tags
* Adding drag-and-drop task organization
* Improving accessibility features
* Adding additional user profile settings
* Deploying the application with a live production API configuration

## License Information

This project was created as part of a coding course and educational portfolio. It is intended for educational and demonstration purposes.

## Contact Information

**Kavana Hegde**

GitHub: https://github.com/kavanahegde
