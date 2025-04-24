package com.bridge.example.todo.todo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
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

    @Test
    void deleteTodo() {
        when(todoRepository.save(new Todo(null, "delete todo", "complete"))).thenReturn(new Todo(1L, "delete todo", "complete"));
        todoService.deleteTodo(1L);
        Optional<Todo> isDeletedTodo = todoRepository.findById(1L);
        assertThat(isDeletedTodo.isEmpty());
    }

    @Test
    void shouldUpdateTodoSuccessfully() {
        Long testId = 1L;
        Todo existingTodo = newTodo;
        existingTodo.setId(testId);
        Todo updatedTodo = new Todo("updated task", "active");
        updatedTodo.setId(testId);
        Todo userInputTodo = new Todo("updated task", "active");
        userInputTodo.setId(testId);

        when(todoRepository.findById(testId)).thenReturn(Optional.of(existingTodo));
        when(todoRepository.save(any(Todo.class))).thenReturn(updatedTodo);

        Todo updatedRequest = todoService.editTodo(testId, userInputTodo);

        assertNotNull(updatedRequest);
        assertEquals(testId, updatedRequest.getId());
        assertEquals("updated task", updatedRequest.getText());
        assertEquals(updatedTodo.getStatus(), updatedRequest.getStatus());

        verify(todoRepository).findById(testId);
        verify(todoRepository).save(existingTodo);
    }

    @Test
    void shouldNotSaveOnUpdateTodoFail() {
        Long testId = 1L;
        Todo userInputTodo = new Todo("updated task", "active");
        userInputTodo.setId(testId);

        when(todoRepository.findById(testId)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            todoService.editTodo(testId, userInputTodo);
                });

        assertEquals("Todo of id 1 not found.", exception.getMessage());
        verify(todoRepository).findById(testId);
        verify(todoRepository, never()).save(Mockito.any(Todo.class));

    }

}
