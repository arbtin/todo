import axios, { AxiosResponse } from "axios";
import { Todo } from "./TodoType.tsx";

type FetchTodos = () => Promise<Todo[]>;
type CreateTodo = (text: string) => Promise<Todo>;
type DeleteTodo = (id: number | null) => Promise<void>;

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