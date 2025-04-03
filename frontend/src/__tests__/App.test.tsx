import { describe, it, expect } from "vitest";
import {setupServer} from "msw/node";
import {render, screen } from "@testing-library/react";
import App from "../App";
import HomePage from "../HomePage";
import {userEvent} from "@testing-library/user-event";

describe(App, () => {
    const server = setupServer()
    beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers())

    describe('HomePage', () => {
        it('should run a simple test', () => {
            render(<HomePage/>)
            expect(screen.getByText("Vite + React")).toBeInTheDocument()
        });

        it('should increment counter button', async () => {
            render(<HomePage/>)
            screen.logTestingPlaygroundURL();
            await userEvent.click(screen.getByRole("button", { name: /count is /i }));
            expect(screen.queryByRole("button", { name: /count is /i})).toBeInTheDocument();
            await userEvent.click(screen.getByRole("button", { name: /count is 1/i}));
            expect(screen.queryByRole("button", { name: /count is 2/i})).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /count is 2/i})).toBeInTheDocument();
        })
    })

    describe('Router', () => {
        it('should navigate between react router routes', async () => {
            render(<App/>)
            expect(screen.getByText("Vite + React")).toBeInTheDocument();
            await userEvent.click(screen.getByRole("link", { name: /what's in this app/i}));
            expect(screen.getByText("What's in this App")).toBeInTheDocument();

            await userEvent.click(screen.getByRole("link", { name: /home/i}));
            expect(screen.getByText("Vite + React")).toBeInTheDocument();
        })
    })

})