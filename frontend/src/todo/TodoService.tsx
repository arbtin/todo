import axios, { AxiosResponse } from "axios";
import { Todo } from "./TodoType.tsx";

type FetchTodos = () => Promise<Todo[]>;

export const fetchTodos: FetchTodos = () => (
    axios.get('/api/todo')
        .then((r: AxiosResponse<Todo[]>) => r.data)
)
