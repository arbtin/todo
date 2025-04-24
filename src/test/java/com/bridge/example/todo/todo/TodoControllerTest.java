package com.bridge.example.todo.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;
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

    @Captor
    ArgumentCaptor<Todo> captor = ArgumentCaptor.forClass(Todo.class);

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
        String postTodoJson = objectMapper.writeValueAsString(postTodo);
        String savedTodoJson = objectMapper.writeValueAsString(savedTodo);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
                        .contentType(APPLICATION_JSON)
                        .content(postTodoJson))
                .andExpect(status().isCreated())
                .andExpect(content().json(savedTodoJson));

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

    @Test
    void shouldAcceptPutRequestEditTodo() throws Exception {
        Long testId = 3L;
        Todo putTodo = new Todo("wrong task", "active");
        putTodo.setId(testId);

        Todo updatedTodo = new Todo("correct task", "active");
        updatedTodo.setId(testId);

        Mockito.when(todoService.editTodo(anyLong(), Mockito.any(Todo.class))).thenReturn(updatedTodo);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/todo/{id}", testId)
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(putTodo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testId))
                .andExpect(jsonPath("$.text").value("correct task"));

        ArgumentCaptor<Long> idCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<Todo> todoCaptor = ArgumentCaptor.forClass(Todo.class);

        Mockito.verify(todoService).editTodo(idCaptor.capture(), todoCaptor.capture());

        assertEquals(idCaptor.getValue(), todoCaptor.getValue().getId());
        assertEquals("correct task", todoCaptor.getValue().getText());
        assertEquals(putTodo.getStatus(), todoCaptor.getValue().getStatus());
    }
}
