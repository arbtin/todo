package com.bridge.example.todo.todo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> fetchToDos(){
        return todoService.fetchTodos();
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo newTodo){
        return new ResponseEntity<>(todoService.createTodo(newTodo), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public Long deleteTodo(@PathVariable Long id) {
        return todoService.deleteTodo(id);
    }
}
