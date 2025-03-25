package com.bridge.example.todo.todo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TodoServiceTest {
    @Mock
    TodoRepository todoRepository;

    @InjectMocks
    TodoService todoService;

    Todo newTodo;
    Todo savedTodo;
    List<Todo> todos;

    @BeforeEach
    void setUp() {
        newTodo = new Todo("new task", "active");
        savedTodo = new Todo("new task", "active");
        todos = new ArrayList<>(List.of(newTodo, savedTodo));

        MockitoAnnotations.openMocks(this);
    }

    @Test
    void fetchTodos() {
        when(todoRepository.findAll()).thenReturn(todos);
        List<Todo> listOfTodoRequest = todoService.fetchTodos();
        verify(todoRepository, times(1)).findAll();
        assertThat(listOfTodoRequest).isEqualTo(todos);
    }

    @Test
    void createTodo() {
       when(todoRepository.save(newTodo)).thenReturn(savedTodo);
        Todo actualRequest = todoService.createTodo(newTodo);
        verify (todoRepository, times (1)).save(any(Todo.class));
        assertThat(actualRequest).isEqualTo(savedTodo);
    }
}
