# Task Manager Application

## Overview
A modern, feature-rich task management application built with React and Material UI. This application allows users to create, edit, delete, and organize tasks with various filtering and sorting options.

## Features
- **Task Management**: Create, edit, and delete tasks
- **Task Status**: Toggle tasks between active and completed states
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **Filtering**: Filter tasks by status (all, active, completed)
- **Sorting**: Sort tasks by date or priority in ascending or descending order
- **Drag and Drop**: Reorder tasks using intuitive drag and drop functionality
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Tasks persist between browser sessions

## Technologies Used
- **React 19**: Modern UI library for building user interfaces
- **Redux Toolkit**: State management with Redux
- **Material UI 7**: Component library for consistent and attractive UI
- **@hello-pangea/dnd**: Drag and drop functionality
- **Vite**: Fast build tool and development server

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Usage

### Adding a Task
1. Enter a task title in the input field
2. Optionally add a description
3. Select a priority level (low, medium, high)
4. Click "Add Task"

### Managing Tasks
- **Complete a Task**: Click the checkbox next to a task
- **Edit a Task**: Click the edit (pencil) icon to modify title, description, or priority
- **Delete a Task**: Click the delete (trash) icon
- **Reorder Tasks**: Drag and drop tasks using the handle on the left side

### Filtering and Sorting
- Use the status dropdown to filter tasks (All, Active, Completed)
- Use the sort dropdown to sort by date or priority
- Select ascending or descending order

### Theme
- Toggle between light and dark mode using the theme button

## Build for Production

To build the application for production:

```
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

MIT
