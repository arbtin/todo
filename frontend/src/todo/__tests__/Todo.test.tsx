import { render, screen } from "@testing-library/react"
import { describe } from "vitest";
import TodoPage from "../TodoPage.tsx";

describe('Todo', () => {

    it('should display todo title', async () => {
        render(<TodoPage/>)
        expect( screen.getByRole("heading", { name: "Your To Do List" })).toBeVisible()
    })
})