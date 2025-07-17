import React from 'react';
import TaskItem from './TaskItem';

/**
 * TaskList component - displays a list of tasks
 * @param {Array} tasks - Array of task objects
 * @param {Function} onToggle - Function to toggle task completion
 * @param {Function} onEdit - Function to edit a task
 * @param {Function} onDelete - Function to delete a task
 * @param {String} emptyMessage - Message to show when no tasks
 */
const TaskList = ({ tasks, onToggle, onEdit, onDelete, emptyMessage }) => {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
