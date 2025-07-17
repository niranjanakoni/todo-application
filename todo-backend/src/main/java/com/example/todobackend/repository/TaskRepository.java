package com.example.todobackend.repository;

import com.example.todobackend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for Task entity
 * Provides CRUD operations and custom query methods
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    /**
     * Find all tasks ordered by creation date (newest first)
     */
    @Query("SELECT t FROM Task t ORDER BY t.createdAt DESC")
    List<Task> findAllOrderByCreatedAtDesc();
    
    /**
     * Find all completed tasks
     */
    List<Task> findByCompleted(Boolean completed);
    
    /**
     * Find tasks by due date
     */
    List<Task> findByDueDate(LocalDate dueDate);
    
    /**
     * Find tasks that are overdue (due date is before today and not completed)
     */
    @Query("SELECT t FROM Task t WHERE t.dueDate < CURRENT_DATE AND t.completed = false")
    List<Task> findOverdueTasks();
    
    /**
     * Count completed tasks
     */
    long countByCompleted(Boolean completed);
}
