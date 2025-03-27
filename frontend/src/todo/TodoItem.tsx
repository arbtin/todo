import {useState} from "react";
import { Todo } from "./TodoType.ts";

type TodoProps = { initialToDo: Todo };

export const TodoItem = ({initialToDo}: TodoProps) => {

    const [todos, setTodos] = useState<Todo>(initialToDo);

    const handleChange = () => {
        setTodos((t) => ({
            ...t,
            status: t.status === 'complete' ? 'active' : 'complete'
        }))
    }

    return (
        <li className="flex items-center">
            <span className="flex">{todos.text}</span>
            <input type="checkbox" checked={todos.status === 'completed'} value={todos.status} onChange={handleChange} />

        </li>
    )
};