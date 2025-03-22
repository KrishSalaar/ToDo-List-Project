package com.todo.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;
    
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private LocalDateTime deletedAt;
    
    public enum TaskStatus {
        TODO, ONGOING, COMPLETED
    }
    
    public enum TaskPriority {
        IMPORTANT, UNIMPORTANT
    }
} 