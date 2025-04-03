import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, afterEach } from "vitest";
import { act } from "react";
import { userEvent } from '@testing-library/user-event'
import TodoPage from "../TodoPage.tsx";
import * as todoService from "../TodoService";

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
})