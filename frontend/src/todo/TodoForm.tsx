import {useEffect, useState } from "react";
import { Todo } from "./TodoType";

interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
    initialTodo?: Todo;
}

export default function TodoForm({onSubmit, initialTodo }: TodoFormProps) {

    const [text, setText] = useState(initialTodo?.text || "");

    useEffect(() => {
        if (initialTodo) {
            setText(initialTodo.text);
        }
    }, [initialTodo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        onSubmit({
            id: initialTodo?.id,
            text: text.trim()
        });

        if (!initialTodo) {
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex-box space-y-6 pt-2">
            <label htmlFor="text" className="relative pl-3 mr-2 text-sm/6 font-medium dark:text-white-900">Add Task:</label>
            <input
                type="text"
                name="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Provide a description..."
                required
                className="relative rounded-md outline min-w-10 grow py-1.5 pr-3 pl-1 m-5 dark:text-base dark:text-white-900 placeholder:text-gray-400 focus:outline-1 sm:text-sm/6"
            />
            <input
                type="submit"
                value={initialTodo ? "Update Todo" : "Add Todo"}
                className="relative rounded-md dark:outline-2 bg-blue-950 px-2.5 py-1.5 text-sm font-semibold text-white-900 ring-1 ring-white-300 hover:bg-blue-400"
            />
        </form>
);
}
