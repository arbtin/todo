package com.bridge.example.todo.todo;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Long deleteTodo(Long id) {
        todoRepository.deleteById(id);
        return id;
    }

    public Todo editTodo(Long id, Todo updatedTodo) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isEmpty()) {
            throw new IllegalArgumentException("Todo of id " + id + " not found.");
        }

        Todo todo = optionalTodo.get();
        todo.setText(updatedTodo.getText());
        todo.setStatus(updatedTodo.getStatus());
        return todoRepository.save(todo);
    }
}
