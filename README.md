# ToDo-List-Project
A modern, responsive todo list application built with Spring Boot and vanilla JavaScript.

## Features

- Create, read, update, and delete tasks
- Task prioritization (Important/Unimportant)
- Task status tracking (Todo/Ongoing/Completed)
- Responsive design that works on all devices
- Automatic cleanup of completed tasks after 30 days
- Beautiful and intuitive user interface

## Prerequisites

- Java 11 or higher
- Maven
- MySQL 8.0 or higher
- Node.js (for development)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Configure the database:
- Create a MySQL database named `todo_db`
- Update the database credentials in `src/main/resources/application.properties`

3. Build and run the application:
```bash
mvn spring-boot:run
```

4. Access the application:
- Open your browser and navigate to `http://localhost:8080`

## Usage

1. Adding a Task:
   - Enter the task title and description
   - Select the priority (Important/Unimportant)
   - Click "Add Task"

2. Managing Tasks:
   - Move tasks between columns by clicking the appropriate action buttons
   - Change task priority using the "Mark Important/Unimportant" button
   - Delete completed tasks using the "Delete" button

3. Task Status:
   - Todo: Tasks that need to be done
   - Ongoing: Tasks currently in progress
   - Completed: Finished tasks (automatically deleted after 30 days)

## Technologies Used

- Backend:
  - Spring Boot
  - Spring Data JPA
  - MySQL
  - Maven

- Frontend:
  - HTML5
  - CSS3 (with Flexbox and Grid)
  - Vanilla JavaScript
  - Responsive Design

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
