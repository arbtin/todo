import {describe, it, vi, expect, afterEach} from "vitest";
import TodoPage from "../TodoPage.tsx";
import * as todoService from "../TodoService";
import {render, waitFor} from "@testing-library/react"
import {page} from "@vitest/browser/context";

describe('Todo List Item Status', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('properly handles form inputs', async () => {
        render((<TodoPage/>))
        await expect.element(page.getByText('To Do List')).toBeInTheDocument()

        // Get the input DOM node by querying the associated label.
        //const usernameInput = page.getByLabelText(/row/i)

        // Type the name into the input. This already validates that the input
        // is filled correctly, no need to check the value manually.
        //await usernameInput.fill('Bob')

    })

    it('should give the class found on the submit button', async () => {
        const expected = [
            {id: 1, text: 'new task', status: 'active'},
        ]
        const mockFetchTodos = vi.spyOn(todoService, 'fetchTodos').mockResolvedValue(expected);
        render((<TodoPage/>))
        expect(mockFetchTodos).toHaveBeenCalledOnce();
        await waitFor(() => {
            const updateButton = page.getByRole("button", { name: /add todo$/i});
            expect.element(updateButton).toHaveClass('/relative rounded-md$/i');
        });
    })

})