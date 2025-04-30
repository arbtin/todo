import axios, { AxiosResponse } from "axios";
import { Todo } from "./TodoType.tsx";

type FetchTodos = () => Promise<Todo[]>;
type CreateTodo = (text: string) => Promise<Todo>;
type DeleteTodo = (id: number | null) => Promise<void>;
type EditTodo =  (id: number | null, text?: string) => Promise<Todo>;
type StatusTodo =  (id: number | null, text?: string, status?: "complete" | "active") => Promise<Todo>;

export const fetchTodos: FetchTodos = () => (
    axios.get('/api/todo')
        .then((r: AxiosResponse<Todo[]>) => r.data)
)

export const createTodo: CreateTodo = (text) => (
    axios.post('/api/todo', {text, status: 'active'})
        .then((r: AxiosResponse<Todo>) => r.data)
)

export const deleteTodo: DeleteTodo = async (id: number | null) => (
    axios.delete(`/api/todo/${id}`)
)

export const editTodo: EditTodo = async (id: number | null, text?: string) => (
    axios.put(`/api/todo/${id}`, {text})
        .then((r: AxiosResponse<Todo>) => r.data)
)

export const statusTodo: StatusTodo = async (id: number | null, text?: string, status?: "complete" | "active") => (
    axios.put(`/api/todo/${id}`, {text, status})
        .then((r: AxiosResponse<Todo>) => r.data)
)