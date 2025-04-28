import {useState, useEffect} from "react";
import {Todo} from "./TodoType.ts";
import {TodoItem} from "./TodoItem.tsx";
import {fetchTodos, deleteTodo, createTodo, editTodo} from "./TodoService.tsx";
import TodoForm from "./TodoForm.tsx";

export const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [updateTodo, setUpdateTodo] = useState<Todo | undefined>(undefined);

    const refreshData = () => {
        fetchTodos().then(setTodos)
    };

    useEffect(() => {
        refreshData()
    }, [])

    const handleAdd = async (text: string) => {
        if(text) {
            const saveTodo = await createTodo(text);
            setTodos((currentItems) => [...currentItems, saveTodo]);
        }
    }

    const handleUpdateTodo = async (todo: Todo) => {
        if (!todo.id) return;

        try {
            const updatedTodo = await editTodo(todo.id, todo.text, todo.status);
            setTodos((currentItems) =>
                currentItems.map((item) =>
                    item.id === todo.id ? updatedTodo : item
                )
            );
            setUpdateTodo(undefined);
        } catch (error) {
            console.error("Failed to update todo:", error);
        }
    };

    const handleDelete = (id: number | null) => {
        deleteTodo(id).then(refreshData);
    }

    const handleStatusChange = async (
        id: number | null,
        status: "active" | "complete"
    ) => {
        if(!id) return;

        try {
            const updatedTodo = await editTodo(id, text, status);
            setTodos((currentItems) =>
                currentItems.map((item) =>
                    item.id === id ? updatedTodo : item
                )
            );
        } catch (error) {
            console.log("Failed to update status.", error);
        }
    };

    const handleFormSubmit = async (todo: Todo) => {
        if (todo.id) {
            await handleUpdateTodo(todo);
        } else {
            await handleAdd(todo.text);
        }
    };

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">To Do List</h2>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto bg-white dark:bg-black text-black dark:text-white">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Task
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {todos.map(todo => (
                                <TodoItem key={todo.id + todo.text} initialToDo={todo} handleDelete={handleDelete} handleEdit={() => setUpdateTodo(todo)} handleStatusChange={handleStatusChange}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <TodoForm onSubmit={handleFormSubmit} initialTodo={updateTodo} />
                </div>
            </main>
        </>
    );
};

export default TodoPage;