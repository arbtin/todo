import {describe, it, vi, expect, afterEach} from "vitest";
import TodoPage from "../TodoPage.tsx";
import * as todoService from "../TodoService";
import "@vitest/browser/matchers";
import {render, screen, waitFor} from "@testing-library/react"

describe('Todo List Item Status', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should give the class found on the submit button', async () => {
        const expected = [
            {id: 1, text: 'new task', status: 'active'},
        ]
        const mockFetchTodos = vi.spyOn(todoService, 'fetchTodos').mockResolvedValue(expected);
        render((<TodoPage/>))
        expect(mockFetchTodos).toHaveBeenCalledOnce();

        await waitFor(() => {
            const updateButton = screen.getByRole("button", { name: /add todo$/i});
            screen.logTestingPlaygroundURL();
            expect.element(updateButton).toHaveClass('/relative rounded-md$/i');
        });
    })

})