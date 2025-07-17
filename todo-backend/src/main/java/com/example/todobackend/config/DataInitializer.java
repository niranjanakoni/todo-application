package com.example.todobackend.config;

import com.example.todobackend.entity.Task;
import com.example.todobackend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Data initialization component
 * Populates the database with sample data on application startup
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    private final TaskRepository taskRepository;
    
    @Autowired
    public DataInitializer(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Only initialize data if the database is empty
        if (taskRepository.count() == 0) {
            initializeSampleData();
        }
    }
    
    private void initializeSampleData() {
        System.out.println("Initializing sample data...");
        
        // Create sample tasks
        Task task1 = new Task(
            "Complete project documentation",
            "Write comprehensive documentation for the Todo application including setup instructions and API documentation.",
            false,
            LocalDate.now().plusDays(7)
        );
        
        Task task2 = new Task(
            "Review code and fix bugs",
            "Perform code review and fix any identified bugs or performance issues.",
            false,
            LocalDate.now().plusDays(3)
        );
        
        Task task3 = new Task(
            "Setup CI/CD pipeline",
            "Configure automated testing and deployment pipeline for the application.",
            false,
            LocalDate.now().plusDays(10)
        );
        
        Task task4 = new Task(
            "Design user interface mockups",
            "Create mockups for the new features and improvements to the user interface.",
            true,
            LocalDate.now().minusDays(2)
        );
        
        Task task5 = new Task(
            "Write unit tests",
            "Implement comprehensive unit tests for all service and controller methods.",
            false,
            LocalDate.now().plusDays(5)
        );
        
        Task task6 = new Task(
            "Database migration script",
            "Create migration scripts for production database deployment.",
            true,
            LocalDate.now().minusDays(1)
        );
        
        Task task7 = new Task(
            "Performance optimization",
            "Analyze and optimize application performance, especially database queries.",
            false,
            LocalDate.now().plusDays(14)
        );
        
        Task task8 = new Task(
            "Security audit",
            "Conduct security audit and implement necessary security improvements.",
            false,
            LocalDate.now().minusDays(1) // This will be overdue
        );
        
        // Save all tasks
        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);
        taskRepository.save(task4);
        taskRepository.save(task5);
        taskRepository.save(task6);
        taskRepository.save(task7);
        taskRepository.save(task8);
        
        System.out.println("Sample data initialized successfully!");
        System.out.println("Created " + taskRepository.count() + " sample tasks.");
    }
}
