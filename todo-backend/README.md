# Todo Backend Application

A Spring Boot REST API for managing todo tasks.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed/incomplete
- Set due dates for tasks
- Get task statistics
- Filter tasks by status (completed, pending, overdue)
- Full CORS support for frontend integration

## Requirements

- Java 17
- Maven 3.6+

## Running the Application

1. Navigate to the todo-backend directory:
   ```bash
   cd todo-backend
   ```

2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

   Or build and run the JAR:
   ```bash
   mvn clean package
   java -jar target/todo-backend-0.0.1-SNAPSHOT.jar
   ```

3. The API will be available at: `http://localhost:8080`

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `PATCH /api/tasks/{id}/toggle` - Toggle task completion
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/completed` - Get completed tasks
- `GET /api/tasks/pending` - Get pending tasks
- `GET /api/tasks/overdue` - Get overdue tasks
- `GET /api/tasks/stats` - Get task statistics

## H2 Database Console

Access the H2 database console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: `password`

## Task Entity Structure

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "dueDate": "2025-07-20",
  "createdAt": "2025-07-16T10:00:00",
  "updatedAt": "2025-07-16T10:00:00"
}
```
