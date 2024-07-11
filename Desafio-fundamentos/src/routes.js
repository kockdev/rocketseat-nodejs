import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('pt-BR');

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            const tasks = database.select('users', search ? {
                name: search,
                email: search,
            } : null)
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: formattedDate,
                updated_at: null
            }
            database.insert('tasks', task)

            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const {name, email} = req.body
            database.update('users', id, {
                name,
                email,
            })

            return res.writeHead(204).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params
            database.delete('users', id)

            return res.writeHead(204).end();
        }
    }
]