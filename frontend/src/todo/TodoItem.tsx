import {Todo} from "./TodoType.ts";
import { Trash2, Edit } from "lucide-react";

type TodoProps = {
    initialToDo: Todo,
    handleDelete: (id: number | null) => void,
    handleEdit: () => void,
    handleStatusChange: (id: number | null, status: "active" | "complete") => void;
};
export const TodoItem = ({initialToDo, handleDelete, handleEdit, handleStatusChange,}: TodoProps) => {
//    const [todos, setTodo] = useState<Todo>(initialToDo);

    const handleChange = () => {
        const newStatus = initialToDo.status === "complete" ? "active" : "complete";
        handleStatusChange(initialToDo.id, newStatus);
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th className="px-6 py-4 font-medium text-white-900 whitespace-nowrap">{initialToDo.id}</th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {initialToDo.text}
            </th>
            <th className="px-6 py-4">{initialToDo.status}</th>
            <th className="px-6 py-4">
                <input type="checkbox" checked={initialToDo.status === 'complete'} value={initialToDo.status}
                       onChange={handleChange}/>
            </th>
            <th className="px-6 py-4"><Edit role="img" aria-label="edit button" onClick={() => handleEdit}/></th>
            <th className="px-6 py-4"><Trash2 role="img" aria-label="delete button" onClick={() => handleDelete(initialToDo.id)}/></th>
        </tr>
    )
};