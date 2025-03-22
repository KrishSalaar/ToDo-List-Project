package com.todo.repository;

import com.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(Task.TaskStatus status);
    
    @Query("SELECT t FROM Task t WHERE t.deletedAt < ?1")
    List<Task> findTasksToDelete(LocalDateTime thirtyDaysAgo);
    
    List<Task> findByPriority(Task.TaskPriority priority);
} 