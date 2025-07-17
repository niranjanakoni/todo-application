package com.example.todobackend.service;

import com.example.todobackend.entity.Task;
import com.example.todobackend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Task operations
 * Contains business logic for task management
 */
@Service
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    
    /**
     * Get all tasks ordered by creation date (newest first)
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAllOrderByCreatedAtDesc();
    }
    
    /**
     * Get a task by ID
     */
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    
    /**
     * Create a new task
     */
    public Task createTask(Task task) {
        // Ensure completed is not null
        if (task.getCompleted() == null) {
            task.setCompleted(false);
        }
        return taskRepository.save(task);
    }
    
    /**
     * Update an existing task
     */
    public Optional<Task> updateTask(Long id, Task taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(taskDetails.getTitle());
                    task.setDescription(taskDetails.getDescription());
                    task.setCompleted(taskDetails.getCompleted() != null ? taskDetails.getCompleted() : false);
                    task.setDueDate(taskDetails.getDueDate());
                    return taskRepository.save(task);
                });
    }
    
    /**
     * Toggle task completion status
     */
    public Optional<Task> toggleTaskCompletion(Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setCompleted(!task.getCompleted());
                    return taskRepository.save(task);
                });
    }
    
    /**
     * Delete a task by ID
     */
    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Get completed tasks
     */
    public List<Task> getCompletedTasks() {
        return taskRepository.findByCompleted(true);
    }
    
    /**
     * Get pending tasks
     */
    public List<Task> getPendingTasks() {
        return taskRepository.findByCompleted(false);
    }
    
    /**
     * Get overdue tasks
     */
    public List<Task> getOverdueTasks() {
        return taskRepository.findOverdueTasks();
    }
    
    /**
     * Get task statistics
     */
    public TaskStats getTaskStats() {
        long totalTasks = taskRepository.count();
        long completedTasks = taskRepository.countByCompleted(true);
        long pendingTasks = taskRepository.countByCompleted(false);
        
        return new TaskStats(totalTasks, completedTasks, pendingTasks);
    }
    
    /**
     * Inner class for task statistics
     */
    public static class TaskStats {
        private final long totalTasks;
        private final long completedTasks;
        private final long pendingTasks;
        
        public TaskStats(long totalTasks, long completedTasks, long pendingTasks) {
            this.totalTasks = totalTasks;
            this.completedTasks = completedTasks;
            this.pendingTasks = pendingTasks;
        }
        
        public long getTotalTasks() { return totalTasks; }
        public long getCompletedTasks() { return completedTasks; }
        public long getPendingTasks() { return pendingTasks; }
    }
}
