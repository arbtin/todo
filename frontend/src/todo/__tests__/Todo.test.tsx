import { render, screen } from "@testing-library/react"
import { describe } from "vitest";
import TodoPage from "../TodoPage.tsx";

describe('Todo', () => {

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
})