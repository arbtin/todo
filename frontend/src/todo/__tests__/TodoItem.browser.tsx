import {describe, it, vi, expect, afterEach} from "vitest";
import TodoPage from "../TodoPage.tsx";
import * as todoService from "../TodoService";
import "@vitest/browser/matchers";
import {render, waitFor} from "@testing-library/react"
import {page} from "@vitest/browser/context";

describe('Todo List Item Status', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should get the heading on page', async () => {
        render((<TodoPage/>))
        await waitFor(() => {
            const updateButton = page.getByRole("button", { name: /add todo$/i});
            expect.element(updateButton).toHaveClass('/relative rounded-md$/i');
        });
    })

    it.skip('should give the class found on the submit button', async () => {
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