# Technical Architecture Documentation

## System Architecture Overview

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Tier"
        A[React Frontend<br/>Port 3000]
    end
    
    subgraph "Application Tier"
        B[Spring Boot Backend<br/>Port 8080]
        C[Spring Security]
        D[Bean Validation]
    end
    
    subgraph "Data Tier"
        E[H2 Database<br/>In-Memory]
        F[JPA/Hibernate]
    end
    
    A -->|HTTP/REST<br/>CORS Enabled| B
    B --> C
    B --> D
    B --> F
    F --> E
    
    style A fill:#61dafb
    style B fill:#6db33f
    style E fill:#f4a261
```

### Component Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant React as React Frontend
    participant Spring as Spring Boot API
    participant DB as H2 Database
    
    User->>React: Loads application
    React->>Spring: GET /api/tasks
    Spring->>DB: SELECT * FROM tasks
    DB->>Spring: Task data
    Spring->>React: JSON response
    React->>User: Renders task list
    
    User->>React: Creates new task
    React->>Spring: POST /api/tasks
    Spring->>Spring: Validates input
    Spring->>DB: INSERT task
    DB->>Spring: Confirmation
    Spring->>React: Created task JSON
    React->>User: Updates UI
```

## Backend Architecture

### Layered Architecture Pattern

```mermaid
graph TD
    A[Presentation Layer<br/>@RestController] --> B[Business Layer<br/>@Service]
    B --> C[Persistence Layer<br/>@Repository]
    C --> D[Data Layer<br/>@Entity]
    
    E[Cross-cutting Concerns<br/>Security, Validation, CORS] --> A
    E --> B
    E --> C
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fce4ec
```

### Spring Boot Component Diagram

```mermaid
classDiagram
    class TodoBackendApplication {
        +main(String[] args)
    }
    
    class TaskController {
        -TaskService taskService
        +getAllTasks() ResponseEntity
        +getTaskById(Long id) ResponseEntity
        +createTask(Task task) ResponseEntity
        +updateTask(Long id, Task task) ResponseEntity
        +deleteTask(Long id) ResponseEntity
        +getTaskStats() ResponseEntity
    }
    
    class TaskService {
        -TaskRepository taskRepository
        +findAll() List~Task~
        +findById(Long id) Optional~Task~
        +save(Task task) Task
        +deleteById(Long id) void
        +getTaskStats() TaskStats
        +initializeSampleData() void
    }
    
    class TaskRepository {
        <<interface>>
        +findAll() List~Task~
        +findById(Long id) Optional~Task~
        +save(Task task) Task
        +deleteById(Long id) void
        +countByCompleted(Boolean completed) long
    }
    
    class Task {
        -Long id
        -String title
        -String description
        -Boolean completed
        -LocalDate dueDate
        -LocalDateTime createdAt
        -LocalDateTime updatedAt
    }
    
    class SecurityConfig {
        +filterChain(HttpSecurity http) SecurityFilterChain
    }
    
    class CorsConfig {
        +corsConfigurationSource() CorsConfigurationSource
    }
    
    TodoBackendApplication --> TaskController
    TaskController --> TaskService
    TaskService --> TaskRepository
    TaskRepository --> Task
    TaskController --> SecurityConfig
    TaskController --> CorsConfig
```

## Frontend Architecture

### React Component Hierarchy

```mermaid
graph TD
    A[App.js<br/>Root Component] --> B[TaskStats.js<br/>Statistics Display]
    A --> C[TaskForm.js<br/>Add New Task]
    A --> D[TaskList.js<br/>Task Container]
    
    D --> E[TaskItem.js<br/>Individual Task]
    
    A --> F[taskService.js<br/>API Service Layer]
    
    style A fill:#61dafb
    style B fill:#4fc3f7
    style C fill:#42a5f5
    style D fill:#2196f3
    style E fill:#1976d2
    style F fill:#0d47a1
```

### State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> DataLoaded: API Success
    Loading --> Error: API Failure
    
    DataLoaded --> Creating: User adds task
    Creating --> DataLoaded: Task created
    Creating --> Error: Creation failed
    
    DataLoaded --> Updating: User edits task
    Updating --> DataLoaded: Task updated
    Updating --> Error: Update failed
    
    DataLoaded --> Deleting: User deletes task
    Deleting --> DataLoaded: Task deleted
    Deleting --> Error: Deletion failed
    
    Error --> Loading: Retry
```

## Data Flow Architecture

### Request/Response Flow

```mermaid
flowchart TD
    A[User Action] --> B{Action Type}
    
    B -->|Create| C[TaskForm]
    B -->|Read| D[TaskList]
    B -->|Update| E[TaskItem]
    B -->|Delete| F[TaskItem]
    
    C --> G[POST /api/tasks]
    D --> H[GET /api/tasks]
    E --> I[PUT /api/tasks/:id]
    F --> J[DELETE /api/tasks/:id]
    
    G --> K[TaskController]
    H --> K
    I --> K
    J --> K
    
    K --> L[TaskService]
    L --> M[TaskRepository]
    M --> N[H2 Database]
    
    N --> O[Response Data]
    O --> P[Update React State]
    P --> Q[Re-render UI]
    Q --> R[User sees changes]
```

### API Data Transformation

```mermaid
graph LR
    A[Frontend Task Object] -->|JSON Serialization| B[HTTP Request Body]
    B -->|Network| C[Backend Controller]
    C -->|Validation| D[Task Entity]
    D -->|JPA| E[Database Row]
    
    E -->|JPA Mapping| F[Task Entity]
    F -->|JSON Serialization| G[HTTP Response]
    G -->|Network| H[Frontend Response]
    H -->|State Update| I[React Component State]
```

## Security Architecture

### Security Implementation Layers

```mermaid
graph TD
    A[Client Request] --> B[CORS Filter]
    B --> C[Security Headers Filter]
    C --> D[Content Validation]
    D --> E[Controller Layer]
    E --> F[Bean Validation]
    F --> G[Service Layer]
    G --> H[Repository Layer]
    H --> I[Database]
    
    style B fill:#ffcdd2
    style C fill:#f8bbd9
    style D fill:#e1bee7
    style F fill:#d1c4e9
```

### CORS Configuration Flow

```mermaid
sequenceDiagram
    participant Browser
    participant CorsFilter as CORS Filter
    participant Backend as Spring Boot
    
    Browser->>CorsFilter: Preflight OPTIONS request
    CorsFilter->>CorsFilter: Check allowed origins
    CorsFilter->>Browser: CORS headers
    Browser->>Backend: Actual request
    Backend->>Browser: Response with data
```

## Database Architecture

### Entity Relationship Model

```mermaid
erDiagram
    TASKS {
        bigint id PK "Auto-generated primary key"
        varchar title "Task title - required"
        varchar description "Optional task description"
        boolean completed "Completion status - default false"
        date due_date "Optional due date"
        timestamp created_at "Creation timestamp"
        timestamp updated_at "Last update timestamp"
    }
    
    TASKS ||--o{ TASK_AUDIT : "Future extension"
    
    TASK_AUDIT {
        bigint id PK "Audit log ID"
        bigint task_id FK "Reference to task"
        varchar action "CREATE/UPDATE/DELETE"
        timestamp action_time "When action occurred"
        text old_values "Previous values"
        text new_values "New values"
    }
```

### Database Schema Evolution

```mermaid
graph LR
    A[Initial Schema<br/>Basic Task Fields] --> B[Version 1.1<br/>Add Timestamps]
    B --> C[Version 1.2<br/>Add Due Dates]
    C --> D[Future: Version 2.0<br/>Add User Authentication]
    D --> E[Future: Version 2.1<br/>Add Categories/Tags]
```

## Performance Architecture

### Caching Strategy

```mermaid
graph TD
    A[Client Request] --> B{Cache Check}
    B -->|Hit| C[Return Cached Data]
    B -->|Miss| D[Query Database]
    D --> E[Update Cache]
    E --> F[Return Data]
    C --> G[Client Response]
    F --> G
    
    style B fill:#4caf50
    style C fill:#81c784
    style D fill:#ff9800
    style E fill:#ffa726
```

### Scaling Considerations

```mermaid
graph TB
    subgraph "Current Architecture"
        A[Single React App] --> B[Single Spring Boot Instance]
        B --> C[Single H2 Database]
    end
    
    subgraph "Scaled Architecture"
        D[Load Balancer] --> E[React App 1]
        D --> F[React App 2]
        
        G[API Gateway] --> H[Spring Boot Instance 1]
        G --> I[Spring Boot Instance 2]
        
        H --> J[PostgreSQL Primary]
        I --> J
        J --> K[PostgreSQL Replica]
    end
    
    A -.->|Upgrade Path| E
    B -.->|Upgrade Path| H
    C -.->|Upgrade Path| J
```

## Deployment Architecture

### Development Environment

```mermaid
graph TD
    A[Developer Machine] --> B[Local React Dev Server<br/>Port 3000]
    A --> C[Local Spring Boot<br/>Port 8080]
    C --> D[H2 In-Memory Database]
    
    B -->|CORS Enabled| C
    
    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#90caf9
    style D fill:#64b5f6
```

### Production Environment

```mermaid
graph TD
    A[Load Balancer] --> B[React Build<br/>Nginx/Apache]
    A --> C[Spring Boot JAR<br/>Docker Container]
    
    C --> D[PostgreSQL Database<br/>Docker Container]
    C --> E[Redis Cache<br/>Docker Container]
    
    F[CI/CD Pipeline] --> G[Docker Registry]
    G --> C
    
    style A fill:#c8e6c9
    style B fill:#a5d6a7
    style C fill:#81c784
    style D fill:#66bb6a
    style E fill:#4caf50
```

## Error Handling Architecture

### Exception Flow

```mermaid
flowchart TD
    A[Exception Occurs] --> B{Exception Type}
    
    B -->|Validation Error| C[ValidationException]
    B -->|Not Found| D[EntityNotFoundException]
    B -->|Database Error| E[DataAccessException]
    B -->|Unknown Error| F[RuntimeException]
    
    C --> G[GlobalExceptionHandler]
    D --> G
    E --> G
    F --> G
    
    G --> H[HTTP Error Response]
    H --> I[Frontend Error Handling]
    I --> J[User-friendly Error Message]
```

### Error Response Structure

```json
{
  "timestamp": "2025-07-16T17:00:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/tasks",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Future Architecture Enhancements

### Microservices Evolution

```mermaid
graph TB
    subgraph "Current Monolith"
        A[Todo Application<br/>Single JAR]
    end
    
    subgraph "Future Microservices"
        B[User Service]
        C[Task Service]
        D[Notification Service]
        E[Analytics Service]
        
        F[API Gateway]
        
        F --> B
        F --> C
        F --> D
        F --> E
    end
    
    A -.->|Decompose| C
```

This architecture documentation provides a comprehensive view of the system design, component interactions, and future scalability considerations for the Todo application.
