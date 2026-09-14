# Todo List App

## Description

A responsive Todo List application built with React. Users can log in, manage their todos, and interact with the application through a clean and user-friendly interface.

The project demonstrates concepts learned throughout the course, including React state management, reducers, context, authentication, routing, API integration, form validation, and responsive styling.

## Features

* User login and authentication
* Protected routes
* Create new todos
* View existing todos
* Edit todos
* Mark todos as completed or active
* Delete todos
* Search todos
* Filter todos by status
* Sort todos
* About page
* Profile page
* 404 Not Found page
* Form validation
* User-friendly error messages
* Responsive design for desktop, tablet, and mobile
* Accessible form controls and interactive elements
* Input sanitization using DOMPurify

## Technologies

* React
* JavaScript
* Vite
* React Router
* Context API
* useReducer
* DOMPurify
* CSS
* REST API

## Getting Started

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/kavanahegde/todo-list.git
```

Navigate to the project directory:

```bash
cd todo-list
```

Install dependencies:

```bash
npm install
```

### Run the Application

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run lint
```

Runs the project's linting checks.

```bash
npm run build
```

Creates a production build of the application.

## Design Decisions

The application uses a clean and simple layout to make managing todos easy.

React Context and `useReducer` are used to organize application state and make state updates predictable. React Router is used for navigation and protected routes.

The interface uses consistent spacing, typography, buttons, forms, and visual states to provide a professional user experience.

The layout is responsive so that the application can be used on desktop, tablet, and mobile screen sizes.

## Security and Validation

* User input is validated on the client side.
* Todo input has length restrictions.
* DOMPurify is used to sanitize user-provided content.
* Error messages are designed to avoid exposing unnecessary system information.
* Protected routes prevent unauthorized access to authenticated pages.

## Screenshots

### Desktop

*Add a screenshot of your application here.*

### Mobile

*Add a screenshot of your responsive mobile layout here.*

## Future Improvements

* Add additional todo categories
* Add due dates and reminders
* Improve accessibility testing
* Add automated tests
* Add additional user customization options

## Live Demo

If deployed, add your Vercel URL here.

If the application is not deployed, you can remove this section or write:

> The application is currently run locally for demonstration.

## Repository

GitHub: https://github.com/kavanahegde/todo-list

## License

This project was created as part of the Lesson 11 final project.

## Contact

Kavana Hegde
