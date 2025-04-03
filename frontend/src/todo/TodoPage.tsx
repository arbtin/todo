import {useState, useEffect} from "react";
import {Todo} from "./TodoType.ts";
import {TodoItem} from "./TodoItem.tsx";
import {createTodo, fetchTodos, deleteTodo } from "./TodoService.tsx";

export const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoText, setNewTodoText] = useState<string>('');

    const refreshData = () => {
        fetchTodos().then(setTodos)
    };

    const handleAdd = () => {
        createTodo(newTodoText).then(saveTodo => {
            setTodos((currentItems) => [...currentItems, saveTodo]);
            setNewTodoText('');
        })
    }
    useEffect(() => {
        refreshData()
    }, [])

    const handleDelete = (id: number | null) => {
        deleteTodo(id).then(refreshData);
    }

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
                            </tr>
                            </thead>
                            <tbody>
                            {todos.map(todo => (
                                <TodoItem key={todo.id + todo.text} initialToDo={todo} handleDelete={handleDelete}/>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex-box space-y-6 pt-2">
                            <label htmlFor="text" className="relative pl-3 text-sm/6 font-medium dark:text-white-900">Add Task</label>
                            <input
                                type="text"
                                name="text"
                                id="text"
                                value={newTodoText}
                                onChange={(e) => setNewTodoText(e.target.value)}
                                className="relative min-w-0 grow py-1.5 pr-3 pl-1 dark:text-base text-white-900 placeholder:text-gray-400 focus:outline sm:text-sm/6"
                            />
                            <input
                                type="submit"
                                onClick={handleAdd}
                                value="Add"
                                className="relative rounded-md dark:outline-1 bg-white px-2.5 py-1.5 text-sm font-semibold text-white-900 ring-1 ring-white-300 hover:bg-gray-50"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
        ;
};

export default TodoPage;