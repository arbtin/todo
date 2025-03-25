package com.bridge.example.todo.todo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> fetchTodos(){
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo newTodo) {
        return todoRepository.save(newTodo);
    }
}
