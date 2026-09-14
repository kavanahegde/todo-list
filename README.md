# My Todos

My Todos is a responsive Todo List application built with React and Vite. It allows authenticated users to create, edit, complete, reopen, delete, search, sort, and filter todos.

## Screenshots

### Login Page

![Login Page](login.png)

### Todo Page

![Todo Page](Todopage2.png)

### About Page

![About Page](Aboutpage.png)

### Profile Page

![Profile Page](profile.png)

### Mobile View

![Mobile View](mobileview.png)

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
* Loading and error handling

## Technologies Used

* React
* React Router
* Vite
* JavaScript
* CSS
* Context API
* `useReducer`
* REST API

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Available Scripts

### `npm run dev`

Starts the development server.

### `npm run build`

Creates a production build of the application.

### `npm run preview`

Previews the production build locally.

### `npm run lint`

Runs the linter and checks the project for code-quality issues.

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

## Validation and Error Handling

Todo titles are validated before they are submitted. Empty or invalid todo titles cannot be added or updated.

The application also displays user-friendly error messages when API operations fail.

Loading states and disabled states provide feedback while operations are being processed.

## Design Decisions

The application uses React Router to organize navigation and protected routes.

Context API and `useReducer` are used to manage authentication and todo-related state in a structured way.

The interface uses reusable components, consistent spacing, typography, buttons, forms, and status indicators to create a clear and responsive user experience.

The layout is designed to work across desktop and mobile screen sizes.

## Loading and Empty States

The application provides loading indicators while data is being retrieved or operations are being processed.

Empty todo lists provide feedback to users when there are no todos to display.

Error messages are displayed when API requests or other operations fail.

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
