import {useState} from "react";
import {Todo} from "./TodoType.ts";
import { Trash2 } from "lucide-react";

type TodoProps = { initialToDo: Todo, handleDelete: (id: number | null) => void };

export const TodoItem = ({initialToDo, handleDelete}: TodoProps) => {

    const [todos, setTodo] = useState<Todo>(initialToDo);

    const handleChange = () => {
        setTodo((t) => ({
            ...t,
            status: t.status === 'complete' ? 'active' : 'complete'
        }))
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th className="px-6 py-4 font-medium text-white-900 whitespace-nowrap">{todos.id}</th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {todos.text}
            </th>
            <th className="px-6 py-4">{todos.status}</th>
            <th className="px-6 py-4">
                <input type="checkbox" checked={todos.status === 'complete'} value={todos.status}
                       onChange={handleChange}/>
            </th>
            <th className="px-6 py-4"><Trash2 role="img" aria-label="delete button" onClick={() => handleDelete(initialToDo.id)}/></th>
        </tr>
    )
};