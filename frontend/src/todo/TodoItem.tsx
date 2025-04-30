import {Todo} from "./TodoType.ts";
import { Trash2, Edit } from "lucide-react";
import {useState} from "react";

type TodoProps = {
    initialToDo: Todo,
    handleDelete: (id: number | null) => void,
    handleEdit: (id: number | null) => void,
    handleStatus: (id: number | null, text: string, status: "complete" | "active") => void;
};
export const TodoItem = ({initialToDo, handleDelete, handleEdit, handleStatus}: TodoProps) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsChecked(e.target.checked);
        const newStatus = e.target.checked ? "complete" : "active";
        handleStatus(initialToDo.id, initialToDo.text, newStatus);
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th className="px-6 py-4 font-medium text-white-900 whitespace-nowrap">{initialToDo.id}</th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {initialToDo.text}
            </th>
            <th className="px-6 py-4">{initialToDo.status}</th>
            <th className="px-6 py-4">
                <input type="checkbox" checked={initialToDo.status! == "complete"} value={initialToDo.status}
                       onChange={handleStatusChange} className={"size-6"}/>
            </th>
            <th className="px-6 py-4"><Edit role="img" aria-label="edit button" onClick={() => handleEdit(initialToDo.id)}/></th>
            <th className="px-6 py-4"><Trash2 role="img" aria-label="delete button" onClick={() => handleDelete(initialToDo.id)}/></th>
        </tr>
    )
};