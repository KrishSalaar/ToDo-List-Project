package com.todo.service;

import com.todo.model.Task;
import com.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    
    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setStatus(Task.TaskStatus.TODO);
        return taskRepository.save(task);
    }
    
    public Task updateTaskStatus(Long id, Task.TaskStatus status) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        if (status == Task.TaskStatus.COMPLETED) {
            task.setCompletedAt(LocalDateTime.now());
        }
        return taskRepository.save(task);
    }
    
    public Task updateTaskPriority(Long id, Task.TaskPriority priority) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setPriority(priority);
        return taskRepository.save(task);
    }
    
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setDeletedAt(LocalDateTime.now());
        taskRepository.save(task);
    }
    
    public List<Task> getTasksByStatus(Task.TaskStatus status) {
        return taskRepository.findByStatus(status);
    }
    
    public List<Task> getTasksByPriority(Task.TaskPriority priority) {
        return taskRepository.findByPriority(priority);
    }
    
    @Scheduled(cron = "0 0 0 * * *") // Run at midnight every day
    public void cleanupDeletedTasks() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        List<Task> tasksToDelete = taskRepository.findTasksToDelete(thirtyDaysAgo);
        taskRepository.deleteAll(tasksToDelete);
    }
} 