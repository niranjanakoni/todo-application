# Todo Frontend Application

A modern React-based frontend for the Todo application, built with Tailwind CSS for beautiful and responsive design.

## Features

- ✨ Modern and clean UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Beautiful Tailwind CSS styling
- ⚡ Real-time task management
- 📊 Task statistics and progress tracking
- 🔄 Loading states and error handling
- ✅ Form validation
- 🎯 Filter tasks by status (all, pending, completed)

## Technology Stack

- **React** (v18.2.0) - Frontend framework
- **Tailwind CSS** (v3.4.0) - Utility-first CSS framework
- **Fetch API** - HTTP client for API calls
- **React Hooks** - State management and side effects

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup and Installation

1. Navigate to the frontend directory:
   ```bash
   cd todo-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit: `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── TaskList.js      # List of tasks component
│   ├── TaskItem.js      # Individual task component
│   ├── TaskForm.js      # Form for creating/editing tasks
│   ├── TaskStats.js     # Statistics dashboard
│   ├── LoadingSpinner.js # Loading indicator
│   └── ErrorMessage.js  # Error display component
├── services/
│   └── taskService.js   # API service for backend communication
├── App.js               # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Component Overview

### App.js
- Main application component
- Manages global state (tasks, loading, error states)
- Orchestrates communication between components
- Handles API calls and error management

### TaskList.js
- Displays list of tasks
- Handles empty states
- Renders TaskItem components

### TaskItem.js
- Renders individual task with all details
- Handles task actions (edit, delete, toggle completion)
- Shows task status, due dates, and overdue indicators
- Responsive design with hover effects

### TaskForm.js
- Form for creating new tasks and editing existing ones
- Real-time validation and error handling
- Supports title, description, due date, and completion status
- Loading states during submission

### TaskStats.js
- Beautiful statistics dashboard
- Shows total, completed, pending tasks, and completion rate
- Animated progress bar
- Responsive grid layout

## API Integration

The frontend communicates with the Spring Boot backend through the `taskService`:

- **Base URL**: `http://localhost:8080/api/tasks`
- **CORS**: Configured to work with React development server
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Loading indicators during API calls

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional design
- **Animations**: Smooth transitions and hover effects
- **Color Scheme**: Blue primary with semantic colors for different states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- The app expects the backend to be running on `http://localhost:8080`
- CORS is handled by the backend configuration
- All API calls include proper error handling
- Form validation is implemented on both client and server sides
