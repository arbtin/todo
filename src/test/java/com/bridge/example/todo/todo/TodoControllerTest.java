package com.bridge.example.todo.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TodoController.class)
public class TodoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TodoService todoService;

    Todo newTodo;
    Todo savedTodo;
    List<Todo> todos = new ArrayList<>();

    @BeforeEach
    void setUp() {
        newTodo = new Todo( "new task", "active");
        savedTodo = new Todo("saved task", "active");
        savedTodo.setId(2L);

        todos.add(newTodo);

        Mockito.when(todoService.fetchTodos()).thenReturn(todos);
        Mockito.when(todoService.createTodo(Mockito.any(Todo.class))).thenReturn(savedTodo);
    }


    @Test
    void shouldAcceptGetRequestToFetchTodos() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
        Mockito.verify(todoService).fetchTodos();
    }

    @Test
    void shouldAcceptPostRequestToCreateTodo() throws Exception {
        String savedTodoJson = objectMapper.writeValueAsString(savedTodo);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(savedTodoJson))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.text").value("saved task"))
                .andExpect(jsonPath("$.status").value("active"));
        Mockito.verify(todoService).createTodo(any(Todo.class));
    }

}
