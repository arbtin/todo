import {useState, useEffect } from "react";
import { Todo } from "./TodoType.ts";
import {TodoItem} from "./TodoItem.tsx";
import { fetchTodos } from "./TodoService.tsx";

export const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const refreshData = () => {
        fetchTodos().then(setTodos)
    };

    useEffect(() => {
        refreshData()
    }, [])

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