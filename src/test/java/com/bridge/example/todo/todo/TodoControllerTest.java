package com.bridge.example.todo.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;

import static org.mockito.Mockito.verify;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
        Mockito.when(todoService.deleteTodo(1L)).thenReturn(1L);
    }

    @Test
    void shouldAcceptGetRequestToFetchTodos() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
        Mockito.verify(todoService).fetchTodos();
    }

    @Test
    void shouldPostRequestToCreateTodo() throws Exception {
        String savedTodoJson = objectMapper.writeValueAsString(savedTodo);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
                        .contentType(APPLICATION_JSON)
                        .content(savedTodoJson))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.text").value("saved task"))
                .andExpect(jsonPath("$.status").value("active"));
        Mockito.verify(todoService).createTodo(any(Todo.class));
    }

    @Test
    void shouldAcceptPostRequestCreateTodo() throws Exception {
        // We need to use the same values because of the Mockito verify above
        Todo postTodo = new Todo("save task", "active");
        postTodo.setId(2L);
        String postTodoJson = new ObjectMapper().writeValueAsString(postTodo);
        String savedTodoJson = new ObjectMapper().writeValueAsString(savedTodo);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
                        .contentType(APPLICATION_JSON)
                        .content(postTodoJson))
                .andExpect(status().isCreated())
                .andExpect(content().json(savedTodoJson));
        ArgumentCaptor<Todo> captor = ArgumentCaptor.forClass(Todo.class);
        Mockito.verify(todoService, times(1)).createTodo(captor.capture());
        assertThat(captor.getValue()).usingRecursiveComparison().isEqualTo(postTodo);
    }

    @Test
    void shouldAcceptDeleteRequestToDeleteTodo() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/todo/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("1"));

        Mockito.verify(todoService).deleteTodo(1L);
    }
}
