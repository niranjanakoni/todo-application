import React from 'react';

/**
 * TaskItem component - renders a single task
 * @param {Object} task - Task object
 * @param {Function} onToggle - Function to toggle task completion
 * @param {Function} onEdit - Function to edit the task
 * @param {Function} onDelete - Function to delete the task
 */
const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;

  return (
    <div className={`task-item p-6 hover:bg-gray-50 transition-colors duration-200 ${
      task.completed ? 'bg-green-50' : isOverdue ? 'bg-red-50' : ''
    }`}>
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className="mt-1 flex-shrink-0"
          aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {}} // Controlled by button click
            className="custom-checkbox"
            tabIndex={-1}
          />
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Title */}
              <h3 className={`text-lg font-medium ${
                task.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-900'
              }`}>
                {task.title}
              </h3>

              {/* Description */}
              {task.description && (
                <p className={`mt-1 text-sm ${
                  task.completed 
                    ? 'text-gray-400 line-through' 
                    : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}

              {/* Due Date and Status */}
              <div className="mt-2 flex items-center space-x-4">
                {task.dueDate && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.completed
                      ? 'bg-gray-100 text-gray-600'
                      : isOverdue
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    📅 Due: {dueDateFormatted}
                    {isOverdue && ' (Overdue)'}
                  </span>
                )}

                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  task.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.completed ? '✅ Completed' : '⏳ Pending'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors duration-200"
                aria-label="Edit task"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200"
                aria-label="Delete task"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
