import axios, { AxiosResponse } from "axios";
import { Todo } from "./TodoType.tsx";

type FetchTodos = () => Promise<Todo[]>;
type CreateTodo = (text: string) => Promise<Todo>;

export const fetchTodos: FetchTodos = () => (
    axios.get('/api/todo')
        .then((r: AxiosResponse<Todo[]>) => r.data)
)

export const createTodo: CreateTodo = (text) => (
    axios.post('/api/todo', {text, status: 'active'})
        .then((r: AxiosResponse<Todo>) => r.data)
)
