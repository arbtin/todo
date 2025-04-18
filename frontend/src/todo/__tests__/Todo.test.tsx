import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, afterEach } from "vitest";
import { userEvent } from '@testing-library/user-event'
import TodoPage from "../TodoPage.tsx";
import * as todoService from "../TodoService";
import {Todo} from "../TodoType";

describe('Todo Page', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should display todo title', async () => {
        const expected = [
            {id: 1, text: 'new task', status: 'active'},
        ]
        const mockFetchTodos = vi.spyOn(todoService, 'fetchTodos')
            .mockResolvedValue(expected);
//        await act( async () => render(<TodoPage/>));
        render(<TodoPage/>);
        expect(mockFetchTodos).toHaveBeenCalledOnce();
        expect( screen.getByRole("heading", { name: /to do list/i })).toBeVisible()
        expect(await screen.findAllByRole("row")).toHaveLength(1);
    })

    it('should display existing tasks with checkboxes checked if complete', async () => {
        const expected = [
            {id: 10, text: 'incomplete task', status: 'active'},
            {id: 11, text: 'complete task', status: 'complete'},
        ]
        const mockFetchTodos = vi.spyOn(todoService, 'fetchTodos')
            .mockResolvedValue(expected);

        render(<TodoPage/>)
        expect(mockFetchTodos).toHaveBeenCalledOnce();
        expect(await screen.findByText('incomplete task')).toBeVisible();
        expect(await screen.findByText('complete task')).toBeVisible();
        const checkboxes = await screen.findAllByRole('checkbox');
        expect(checkboxes[0]).not.toBeChecked();
        expect(checkboxes[1]).toBeChecked();
    });

    it('should send new to do when add button clicked', async () => {
        const newTodo = 'new Task';
        vi.spyOn(todoService, 'fetchTodos').mockResolvedValue([]);
        const mockCreateTodo = vi.spyOn(todoService, 'createTodo').mockResolvedValueOnce({id: 10, text: newTodo, status: 'active'});
        render(<TodoPage/>)
        const taskInput = screen.getByLabelText('Add Task');
        await userEvent.type(taskInput, newTodo);
        const addButton = screen.getByRole('button', {name: 'Add'});
        await userEvent.click(addButton);

        expect(mockCreateTodo).toHaveBeenCalledWith(newTodo);
        expect(mockCreateTodo).toHaveBeenCalledOnce();
        expect(screen.getByLabelText('Add Task')).toHaveValue('');
        expect(await screen.findByText(newTodo)).toBeVisible();
    });

    it('should not call createTodo if no text has been entered', async () => {
        vi.spyOn(todoService, 'fetchTodos').mockResolvedValue([])
        const mockCreateTodo = vi.spyOn(todoService, 'createTodo').mockRejectedValue('createTodo was called, but should not have been');
        render(<TodoPage/>)
        const addButton = screen.getByRole('button', { name: /add/i });
        await userEvent.click(addButton);
        expect(mockCreateTodo).not.toHaveBeenCalled();
    })

    it('should delete existing to do item', async () => {
        const someTodos = [
        {id: 5, text: 'dont delete me', status: 'active'},
        {id: 6, text: 'I\'m done with this task', status: 'complete'},
        ]
        const mockDeleteTodo = vi.spyOn(todoService, 'deleteTodo').mockReturnValue(Promise.resolve())
        const mockFetchTodos = vi.spyOn(todoService, 'fetchTodos').mockResolvedValue(someTodos)
        render((<TodoPage/>))
        const deleteButton = await screen.findAllByRole("img", { name: /delete button/i});
        await userEvent.click(deleteButton[1]);

        expect(mockDeleteTodo).toHaveBeenCalledWith(6)
        expect(mockFetchTodos).toHaveBeenCalledTimes(2)
    })

    it('should edit existing to do item', async () => {
        const someTodos = [
            {id: 5, text: 'update me', status: 'active'},
            {id: 6, text: 'I\'m done with this task', status: 'complete'},
        ];
        const updatedTodo: Todo = {
            id: 5, text: "edited task", status: "active",
        };
        const mockEditTodo = vi.spyOn(todoService, 'editTodo').mockResolvedValue(updatedTodo)
        const mockFetchTodos = vi.spyOn(todoService, 'fetchTodos').mockResolvedValue(someTodos)
        render((<TodoPage/>))

        await waitFor(() => {
            expect(screen.getByText("update me")).toBeInTheDocument();
        });

        const editButton = await screen.findAllByRole("img", { name: /edit button/i});
        await userEvent.click(editButton[0]);

        const taskInput = screen.getByLabelText('Update Task');
        await userEvent.type(taskInput, "edited task");

        const updateButton = screen.getByRole('button', {name: /update/i});
        await userEvent.click(updateButton);

        expect(mockEditTodo).toHaveBeenCalledWith(5, "edited task", "active");

        await waitFor(() => {
            expect(screen.getByText("edited task")).toBeInTheDocument();
            expect(screen.queryByText("update me")).not.toBeInTheDocument();
        });
        expect(mockFetchTodos).toHaveBeenCalledTimes(1)
    })

})