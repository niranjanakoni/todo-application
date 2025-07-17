package com.example.todobackend.controller;

import com.example.todobackend.entity.Task;
import com.example.todobackend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Task operations
 * Provides RESTful API endpoints for task management
 */
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class TaskController {
    
    private final TaskService taskService;
    
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    
    /**
     * GET /api/tasks - Retrieve all tasks
     */
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * GET /api/tasks/{id} - Retrieve a single task by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        // SECURITY: Validate ID parameter
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        
        Optional<Task> task = taskService.getTaskById(id);
        
        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * POST /api/tasks - Create a new task
     */
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        try {
            Task createdTask = taskService.createTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * PUT /api/tasks/{id} - Update an existing task
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task taskDetails) {
        // SECURITY: Validate ID parameter
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        
        Optional<Task> updatedTask = taskService.updateTask(id, taskDetails);
        
        if (updatedTask.isPresent()) {
            return ResponseEntity.ok(updatedTask.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * PATCH /api/tasks/{id}/toggle - Toggle task completion status
     */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggleTaskCompletion(@PathVariable Long id) {
        // SECURITY: Validate ID parameter
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        
        Optional<Task> updatedTask = taskService.toggleTaskCompletion(id);
        
        if (updatedTask.isPresent()) {
            return ResponseEntity.ok(updatedTask.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * DELETE /api/tasks/{id} - Delete a task by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        // SECURITY: Validate ID parameter
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        
        boolean deleted = taskService.deleteTask(id);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/tasks/completed - Get all completed tasks
     */
    @GetMapping("/completed")
    public ResponseEntity<List<Task>> getCompletedTasks() {
        List<Task> completedTasks = taskService.getCompletedTasks();
        return ResponseEntity.ok(completedTasks);
    }
    
    /**
     * GET /api/tasks/pending - Get all pending tasks
     */
    @GetMapping("/pending")
    public ResponseEntity<List<Task>> getPendingTasks() {
        List<Task> pendingTasks = taskService.getPendingTasks();
        return ResponseEntity.ok(pendingTasks);
    }
    
    /**
     * GET /api/tasks/overdue - Get all overdue tasks
     */
    @GetMapping("/overdue")
    public ResponseEntity<List<Task>> getOverdueTasks() {
        List<Task> overdueTasks = taskService.getOverdueTasks();
        return ResponseEntity.ok(overdueTasks);
    }
    
    /**
     * GET /api/tasks/stats - Get task statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<TaskService.TaskStats> getTaskStats() {
        TaskService.TaskStats stats = taskService.getTaskStats();
        return ResponseEntity.ok(stats);
    }
}
