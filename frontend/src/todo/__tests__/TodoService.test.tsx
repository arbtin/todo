import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";
import {createTodo, fetchTodos, editTodo, statusTodo} from "../TodoService.tsx";
import { Todo } from "../TodoType.ts";
import axios from "axios";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";

describe('TodoService', () => {

    axios.defaults.baseURL = "http://localhost:3000"

    const server = setupServer()
    beforeAll(() => server.listen()) //{onUnhandledRequest: 'error'}
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

    it('should send a post request with new Todo', async () => {
        const expected: Todo = {
            id: 1,
            text: 'new Task',
            status: 'active'
        }
        server.use(http.post('/api/todo', () =>
            HttpResponse.json(expected, {status: 201})
        ))

        expect(await createTodo('new task')).toStrictEqual(expected);
    });

    it('should send a update request with existing Todo', async () => {
        const expected: Todo = {
            id: 1,
            text: 'edit Task',
            status: 'active'
        }
        server.use(http.put('/api/todo/1', () =>
            HttpResponse.json(expected, {status: 201})
        ))

        expect(await editTodo(1,'edit Task')).toStrictEqual(expected);
    })

    it('should send a status change request with existing id', async () => {
        const expected: Todo = {
            id: 1,
            text: 'status change',
            status: 'complete'
        }
        server.use(http.put('/api/todo/1', () =>
            HttpResponse.json(expected, {status: 201})
        ))

        expect(await statusTodo(1,'complete')).toStrictEqual(expected);
    })

});