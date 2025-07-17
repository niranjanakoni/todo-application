import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { taskService } from './services/taskService';

/**
 * Main App component
 * Manages the overall state and orchestrates the todo application
 */
function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0 });

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  /**
   * Load all tasks from the backend
   */
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend server is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load task statistics
   */
  const loadStats = async () => {
    try {
      const fetchedStats = await taskService.getTaskStats();
      setStats(fetchedStats);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  /**
   * Create a new task
   */
  const handleCreateTask = async (taskData) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
      await loadStats();
      return true;
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
      return false;
    }
  };

  /**
   * Update an existing task
   */
  const handleUpdateTask = async (taskId, taskData) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === taskId ? updatedTask : task)
      );
      setEditingTask(null);
      await loadStats();
      return true;
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
      return false;
    }
  };

  /**
   * Toggle task completion status
   */
  const handleToggleTask = async (taskId) => {
    try {
      setError(null);
      const updatedTask = await taskService.toggleTaskCompletion(taskId);
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === taskId ? updatedTask : task)
      );
      await loadStats();
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error toggling task:', err);
    }
  };

  /**
   * Delete a task
   */
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError(null);
      await taskService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      await loadStats();
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  /**
   * Start editing a task
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  /**
   * Cancel editing
   */
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  /**
   * Filter tasks based on current filter
   */
  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Todo App
          </h1>
          <p className="text-gray-600">
            Stay organized and get things done!
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <TaskStats stats={stats} />

          {/* Task Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? 
                (taskData) => handleUpdateTask(editingTask.id, taskData) : 
                handleCreateTask
              }
              onCancel={editingTask ? handleCancelEdit : null}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg shadow-md p-1 flex">
              {['all', 'pending', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    filter === filterType
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  {filterType === 'all' && ` (${tasks.length})`}
                  {filterType === 'pending' && ` (${stats.pendingTasks})`}
                  {filterType === 'completed' && ` (${stats.completedTasks})`}
                </button>
              ))}
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-lg shadow-md">
            {loading ? (
              <div className="p-8">
                <LoadingSpinner message="Loading tasks..." />
              </div>
            ) : (
              <TaskList
                tasks={getFilteredTasks()}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                emptyMessage={
                  filter === 'all' 
                    ? "No tasks yet. Create your first task above!" 
                    : `No ${filter} tasks found.`
                }
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with React & Spring Boot | © 2025 Todo App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
