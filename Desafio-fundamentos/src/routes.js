import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { parse } from 'csv-parse';
import { buildRoutePath } from "./utils/build-route-path.js";
import fs from 'fs';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            } : null)
            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('pt-BR');
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: formattedDate,
                updated_at: null
            };
            database.insert('tasks', task);

            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('pt-BR');
            const updatedData = {
                ...(title && { title }),
                ...(description && { description }),
                updated_at: formattedDate
            };
            const updateSuccess = database.update('tasks', id, updatedData);
            if(updateSuccess){
                return res.writeHead(204).end();
            }else {
                return res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Task not found' }));
            }

        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const deleteSuccess = database.delete('tasks', id)
            if(deleteSuccess){
                return res.writeHead(204).end();
            } else {
                return res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Task not found' }));
            }
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const {id} = req.params
            const taskComplete = database.patch('tasks', id)
            if(taskComplete){
                return res.writeHead(204).end();
            } else {
                return res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Task not found' }));
            }
        }
    }
]