import axios, { AxiosResponse } from "axios";
import { Todo } from "./TodoType.tsx";

type FetchTodos = () => Promise<Todo[]>;
type CreateTodo = (text: string) => Promise<Todo>;
type DeleteTodo = (id: number | null) => Promise<void>;
type EditTodo =  (id: number | null, text: string) => Promise<Todo>;
type changeStatus =  (id: number | null, status: string) => Promise<Todo>;

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

export const editTodo: EditTodo = async (id: number | null, text: string) => (
    axios.put(`/api/todo/${id}`, {text})
        .then((r: AxiosResponse<Todo>) => r.data)
)

export const statusChange: changeStatus = async (id: number | null, status: string) => (
    axios.put(`/api/todo/${id}`, {status})
        .then((r: AxiosResponse<Todo>) => r.data)
)