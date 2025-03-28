import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";
import { fetchTodos } from "../TodoService.tsx";
import { Todo } from "../TodoType.ts";
import axios from "axios";

describe('TodoService', () => {

    axios.defaults.baseURL = "http://localhost:3000"

    const server = setupServer()
    beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers())

    it('should send a get request to fetch existing tasks', async () => {
        const expected: Todo[] = [
            {id: 1, text: 'some task', status: 'active'},
            {id: 2, text: 'another task', status: 'active'},
            {id: 3, text: 'repeat task', status: 'complete'},
        ];

        server.use(http.get('/api/todo', () =>
            HttpResponse.json(expected, {status: 201})
        ))

        expect(await fetchTodos()).toStrictEqual(expected);
    });
});