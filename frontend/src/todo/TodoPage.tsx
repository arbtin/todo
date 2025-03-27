import {useState, useEffect } from "react";
import { Todo } from "./TodoType.ts";
import {TodoItem} from "./TodoItem.tsx";

export const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // This runs when the component loads
    useEffect(() => {
        // Replace this with your task fetching logic
        const tasks: Todo[] = [
            { id: 1, text: "Set up project structure", status: "active" },
            { id: 2, text: "Add component tests", status: "active" },
            { id: 3, text: "Add component", status: "active" }
        ];
        setTodos(tasks);
    }, []);

    return (
        <div className="flex-box space-x-2">
            <h3 className="mb-2 text-lg font-semibold">Your To Do List</h3>
            <ul className="max-w-md space-y-1 list-disc list-inside">
                {todos.map(todo => (
                    <TodoItem  key={todo.id + todo.text} initialToDo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;