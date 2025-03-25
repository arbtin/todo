package com.bridge.example.todo.todo;

import jakarta.persistence.*;

@Entity
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private String status;

    public Todo() {
    }

    public Todo(String text, String status) {
        this.text = text;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Todo setId(Long id) {
        this.id = id;
        return this;
    }

    public String getText() {
        return text;
    }

    public Todo setText(String text) {
        this.text = text;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public Todo setStatus(String status) {
        this.status = status;
        return this;
    }
}